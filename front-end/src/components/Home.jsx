import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function Home({ onLoginClick }) {
  const expand = "lg"; // Set the desired breakpoint for the offcanvas

  return (
    <Navbar
      expand={expand}
      className="bg-body-tertiary  slide-in "
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <span className="text-danger rs">R</span>ENTEL-<span className="text-danger rs">S</span>HOP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link><Link to={'/shop-registration'}>Signing up</Link></Nav.Link>
              <Nav.Link ><Link to={'/user-registration'}>User</Link></Nav.Link>
            </Nav>
            <Button variant="outline-success" onClick={ onLoginClick }>
              Login
            </Button>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Home;
