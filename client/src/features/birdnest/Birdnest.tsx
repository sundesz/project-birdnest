import { IPilot } from '../../types';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import Pilots from './Pilots';
import PilotInfo from './PilotInfo';
import PilotNotFound from './PilotNotFound';

interface IBirdnestProps {
  snapShotTime: string;
  pilotData: IPilot[];
  closetPilot: IPilot | undefined;
}

const Birdnest = ({ snapShotTime, pilotData, closetPilot }: IBirdnestProps) => {
  return (
    <Container className="pilot-container">
      <h5 className="ndz-header">Pilot too close to No-Drone-Zone perimeter</h5>
      {closetPilot ? (
        <Toast bg="warning">
          <PilotInfo pilot={closetPilot} snapShotTime={snapShotTime} />
        </Toast>
      ) : (
        <PilotNotFound />
      )}
      <br />
      <br />

      <h5 className="ndz-header">
        Pilots violating No-Drone-Zone perimeter (past 10 min data)
      </h5>

      <ToastContainer>
        <Pilots pilotData={pilotData} snapShotTime={snapShotTime} />
      </ToastContainer>
    </Container>
  );
};

export default Birdnest;
