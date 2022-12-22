import _ from 'lodash';
import { formatDistance, sub } from 'date-fns';
import { IPilot, IPilotResponse } from '../../types';

/**
 * Return all pilot data
 */
export const getPilotData = (
  newData: IPilotResponse,
  oldPilotData: IPilot[]
) => {
  // if new pilot is found update the data else push that data
  const allPilots = _.unionBy(newData.pilots, oldPilotData, 'pilotId');

  const lastTenMin = sub(new Date(newData.snapShotTime), {
    minutes: 10,
  });

  // get all pilots from last ten minutes
  const latestPilots = _.filter(
    allPilots,
    ({ drone }) => new Date(drone.lastSeen) > lastTenMin
  );

  // order the pilot data by drone last seen
  return _.orderBy(latestPilots, ['drone.lastSeen'], ['desc']);
};

/**
 * Get the pilot who is closest to NDZ area
 */
export const getClosestPilot = (
  oldPilot: IPilot[],
  newPilots: IPilot[]
): IPilot | undefined => {
  // if both are empty return undefined
  if (!oldPilot.length && !newPilots.length) {
    return undefined;
  }

  // get the min from newPilot it old pilot is empty
  if (!oldPilot.length && newPilots.length) {
    return _.minBy(newPilots, ({ drone }) => drone.distanceInMeter);
  }

  // if newPilot is empty return oldPilot
  if (oldPilot && !newPilots.length) {
    return oldPilot[0];
  }

  // if both oldPilot and newPilot return from both
  return _.minBy(
    [...newPilots, ...oldPilot],
    ({ drone }) => drone.distanceInMeter
  );
};

/**
 * Return the distance between the given date and time in words.
 * @param dateTime
 * @param baseDateTime
 * @returns
 */
export const timeAgo = (dateTime: string, baseDateTime: string) => {
  return formatDistance(new Date(dateTime), new Date(baseDateTime), {
    addSuffix: true,
    includeSeconds: true,
  });
};

/**
 * Get date and time in local
 * @param dateTime
 * @returns
 */
export const getLocalDateTime = (dateTime: string) => {
  return dateTime ? new Date(dateTime).toLocaleString('fi-FI') : '---';
};
