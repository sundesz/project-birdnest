import { distanceInMeterFromCenter } from './helper';
import { IDroneField, IDrone, IPilotField, IPilot } from './types/types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  // also need to check for NaN
  return typeof text === 'number' || text instanceof Number;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('not a string');
  }

  return text;
};

export const parseNumber = (text: unknown): number => {
  if (!text || !isNumber(text)) {
    throw new Error(`${text} is not a number`);
  }

  return text;
};

// we need only serialNumber and coordinates so ignoring other parameters
export const toDroneNewEntry = (
  { serialNumber, positionY, positionX }: IDroneField,
  snapShotTime: unknown
): IDrone => {
  const posX = parseNumber(positionX);
  const posY = parseNumber(positionY);
  const distanceInMeter = distanceInMeterFromCenter(posX, posY);

  return {
    serialNumber: parseString(serialNumber),
    positionX: posX,
    positionY: posY,
    lastSeen: parseString(snapShotTime),
    distanceInMeter,
  };
};

export const toPilotNewEntry = (
  { pilotId, firstName, lastName, phoneNumber, createdDt, email }: IPilotField,
  drone: IDrone
): IPilot => ({
  pilotId: parseString(pilotId),
  name: `${parseString(firstName)} ${parseString(lastName)}`,
  phoneNumber: parseString(phoneNumber),
  createdDt: parseString(createdDt),
  email: parseString(email),
  drone,
});
