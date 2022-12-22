import { useEffect, useState } from 'react';
import Birdnest from './features/birdnest/Birdnest';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { IPilot, IPilotResponse } from './types';
import { getClosestPilot, getPilotData } from './features/birdnest/helper';

function App() {
  const [snapShotTime, setSnapShotTime] = useState<string>('');
  const [pilots, setPilots] = useState<IPilot[]>([]);
  const [closestPilot, setClosetPilot] = useState<IPilot | undefined>(
    undefined
  );

  useEffect(() => {
    const eventSource = new EventSource('/events');
    eventSource.onmessage = (e) => {
      const parsedPilotData = JSON.parse(e.data) as IPilotResponse;

      setSnapShotTime(() => parsedPilotData.snapShotTime);
      setPilots((prevPilots) => getPilotData(parsedPilotData, prevPilots));

      setClosetPilot((prevPilot) => {
        const oldPilot = prevPilot === undefined ? [] : [prevPilot];
        return getClosestPilot(oldPilot, parsedPilotData.pilots);
      });
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Container className="bg-info">
      <Header snapShotTime={snapShotTime} />
      <Birdnest
        snapShotTime={snapShotTime}
        pilotData={pilots}
        closetPilot={closestPilot}
      />
      <Footer />
    </Container>
  );
}

export default App;
