import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import UserProfile from './UserProfile';

const LttNavbar = (props) => {
  //PROPS
  const token = props.token
  const onLogout = props.onLogout

  return (
    <Navbar
      expand="lg"
      className="d-flex justify-content-between bg-body-tertiary border border-2 border-black"
    >
      <Container className="d-flex row-cols-4 row-cols-lg-1 flex-wrap text-start">
        <Navbar.Brand href="#home">
          <span className="bg-primary px-2 rounded rounded-1 fs-2 fw-semibold">
            Listen to this!
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav>
           {!token ? <Nav.Link href="#login">Login</Nav.Link> : <UserProfile token={token} onLogout={onLogout}/>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LttNavbar;
