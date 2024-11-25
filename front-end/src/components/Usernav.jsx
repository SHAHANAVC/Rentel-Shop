import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function Usernav() {
    const expand = "lg";
  
    // Step 1: Create state to track Offcanvas visibility
    const [showOffcanvas, setShowOffcanvas] = useState(false);
  
    // Step 2: Function to handle closing the Offcanvas
    const handleClose = () => setShowOffcanvas(false);
  
    return (
      <div>
        <Navbar
          expand={expand}
          className="bg-body-tertiary slide-in"
          sticky="top"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <span className="text-danger rs">R</span>ENTEL-<span className="text-danger rs">S</span>HOP
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShowOffcanvas(true)} // Open offcanvas when clicked
            />
            
            {/* Step 3: Use state to control visibility of Offcanvas */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={showOffcanvas} // Use state to control visibility
              onHide={handleClose} // Close offcanvas when clicking outside or pressing escape
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Step 4: Close offcanvas when a link is clicked */}
                  <Nav.Link onClick={handleClose}><Link to={'/user-home'}>Home</Link></Nav.Link>
                  {/* <Nav.Link onClick={handleClose}><Link to={'/'}>AddProduct</Link></Nav.Link>
                  <Nav.Link onClick={handleClose}><Link to={'/shopProductpending'}>Booking</Link></Nav.Link> */}
                  <Nav.Link onClick={handleClose}><Link to={'/'}>Logout</Link></Nav.Link>
                </Nav>
                <Button variant="outline-success">
                  Login
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    );
  }

export default Usernav