import React from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
function WorkerNav() {
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
                 Offcanvas
               </Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body>
               <Nav className="justify-content-end flex-grow-1 pe-3">
               <Nav.Link ><Link to={'/worker-home'}>Home</Link></Nav.Link>
               {/* <Nav.Link ><Link to={'/productAdd'}></Link></Nav.Link> */}
               <Nav.Link><Link to={'/shopProductpending'}>Booking</Link></Nav.Link>
               <Nav.Link><Link to={'/viewcomplaints'}>Complaints</Link></Nav.Link>
               <Nav.Link><Link to={'/viewreview'}>Review</Link></Nav.Link>
                 <Nav.Link><Link to={'/'}>Logout</Link></Nav.Link>
                 
               </Nav>
               <Button variant="outline-success">
                 Login
               </Button>
             </Offcanvas.Body>
           </Navbar.Offcanvas>
         </Container>
       </Navbar>
       </div>
  )
}

export default WorkerNav