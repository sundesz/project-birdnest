import { Toast } from 'react-bootstrap';
import { IPilot } from '../../types';
import DroneCoordinates from './DroneCoordinates';
import { timeAgo } from './helper';

interface IPilotInfoProps {
  pilot: IPilot;
  snapShotTime: string;
}

const PilotInfo = ({ pilot, snapShotTime }: IPilotInfoProps) => {
  return (
    <>
      <Toast.Header closeButton={false}>
        <strong className="me-auto pilot-name" title="Name">
          {pilot.name}
        </strong>
        <small className="text-muted">
          seen {timeAgo(pilot.drone.lastSeen, snapShotTime)}
        </small>
      </Toast.Header>
      <Toast.Body>
        <div className="pilot-contact">
          <span className="pilot-email" title="Email">
            {pilot.email}
          </span>
          <span className="pilot-phone" title="Phone number">
            {pilot.phoneNumber}
          </span>
        </div>

        <DroneCoordinates drone={pilot.drone} />
      </Toast.Body>
    </>
  );
};

export default PilotInfo;
