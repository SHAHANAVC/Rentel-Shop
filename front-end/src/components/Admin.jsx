import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function Admin() {
    const expand = "lg";
  return (
    <div>
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
              Admin
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action2"><Link to={'/admin'}>Home</Link></Nav.Link>
              <Nav.Link><Link to={'/viewshops'}>Shops</Link></Nav.Link>
              <Nav.Link ><Link to={'/viewuser'}>Users</Link></Nav.Link>
              <Nav.Link><Link to={'/viewworkers'}>Workers</Link></Nav.Link>
              
            </Nav>
            
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    </div>
  )
}

export default Admin