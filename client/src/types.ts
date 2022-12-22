export interface IDrone {
  serialNumber: string
  lastSeen: string
  positionY: number
  positionX: number
  distanceInMeter: number
}

export interface IPilot {
  pilotId: string
  name: string
  phoneNumber: string
  createdDt: string
  email: string
  drone: IDrone
}

export interface ICoordinate {
  x: number
  y: number
}

export interface IPilotResponse {
  snapShotTime: string
  pilots: IPilot[]
}
