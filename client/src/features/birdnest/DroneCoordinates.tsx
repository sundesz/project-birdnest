import { IDrone } from '../../types';

interface IDroneCoordinateProps {
  drone: IDrone;
}

const DroneCoordinates = ({ drone }: IDroneCoordinateProps) => {
  return (
    <div
      className="drone-coordinates"
      title={`Coordinate (x,y): (${drone.positionX.toFixed(
        4
      )}, ${drone.positionY.toFixed(4)})`}
    >
      Drone coordinates in meter: <b>{drone.distanceInMeter.toFixed(4)}</b>
    </div>
  );
};

export default DroneCoordinates;
