import { Toast } from 'react-bootstrap';

const PilotNotFound = () => {
  return (
    <Toast>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">No Pilot information yet...</strong>
      </Toast.Header>
    </Toast>
  );
};

export default PilotNotFound;
