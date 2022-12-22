import { ICoordinate, IDrone } from './types/types';

const CENTER_COORDINATE: ICoordinate = { x: 250000, y: 250000 };

export const dronesIn100m_range = (drones: IDrone[]) => {
  return drones.filter((drone) => drone.distanceInMeter <= 100);
};

export const distanceInMeterFromCenter = (x: number, y: number): number => {
  const distance = Math.sqrt(
    Math.pow(x - CENTER_COORDINATE.x, 2) + Math.pow(y - CENTER_COORDINATE.y, 2)
  );
  return distance / 1000;
};
