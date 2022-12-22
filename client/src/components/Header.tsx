import { Container, Navbar } from 'react-bootstrap';
import { getLocalDateTime } from '../features/birdnest/helper';

interface IHeaderProps {
  snapShotTime: string;
}

const Header = ({ snapShotTime }: IHeaderProps) => {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand href="#">Project Birdnest</Navbar.Brand>
        <span>
          Data fetch at: <b>{getLocalDateTime(snapShotTime)}</b>
        </span>
      </Container>
    </Navbar>
  );
};
export default Header;
