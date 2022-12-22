export interface IDroneField {
  serialNumber: unknown;
  positionY: unknown;
  positionX: unknown;
}

export interface IDroneResponse {
  '@_snapshotTimestamp': unknown;
  drone: IDroneField[];
}

export interface IDrone {
  serialNumber: string;
  lastSeen: string;
  positionY: number;
  positionX: number;
  distanceInMeter: number;
}
export interface IPilotField {
  pilotId: unknown;
  firstName: unknown;
  lastName: unknown;
  phoneNumber: unknown;
  createdDt: unknown;
  email: unknown;
}

export interface IPilot {
  pilotId: string;
  name: string;
  phoneNumber: string;
  createdDt: string;
  email: string;
  drone: IDrone;
}

export interface ICoordinate {
  x: number;
  y: number;
}
