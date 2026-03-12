import { Navbar, Container, Nav } from 'react-bootstrap';

const LttNavbar = () => {
  return (
    <Navbar
      expand="lg"
      className="d-flex justify-content-between bg-body-tertiary border border-2 border-black"
    >
      <Container className="d-flex row-cols-1 text-start vstack">
        <Navbar.Brand href="#home">
          <span className="bg-primary px-2 rounded rounded-1 fs-2 fw-semibold">Listen to this!</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LttNavbar;
