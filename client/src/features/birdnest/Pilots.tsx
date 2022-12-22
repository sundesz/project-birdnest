import { Toast } from 'react-bootstrap';
import { IPilot } from '../../types';
import PilotInfo from './PilotInfo';
import PilotNotFound from './PilotNotFound';

interface IPilotsProps {
  pilotData: IPilot[];
  snapShotTime: string;
}

const Pilots = ({ pilotData, snapShotTime }: IPilotsProps) => {
  if (pilotData.length === 0) {
    return <PilotNotFound />;
  }

  const pilotInfos = pilotData.map((pilot) => {
    return (
      <Toast key={`${pilot.pilotId}`}>
        <PilotInfo pilot={pilot} snapShotTime={snapShotTime} />
      </Toast>
    );
  });

  return <>{pilotInfos}</>;
};

export default Pilots;
