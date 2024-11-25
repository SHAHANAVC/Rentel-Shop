import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Admin from "./Admin";

function AdminDashboard() {
  const expand = "lg";

  return (
    <div>
      {/* Navbar */}
      <Admin></Admin>

      {/* Dashboard Main Section */}
      <Container className="mt-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        {/* Metrics Section */}
        <Row className="text-center mb-4">
          <Col lg={6} md={6} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Shops</Card.Title>
                <Card.Text>
                  <span className="fs-2 text-primary">120</span>
                </Card.Text>
                <Button variant="primary" as={Link} to="/viewshops">
                  Manage Shops
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text>
                  <span className="fs-2 text-success">450</span>
                </Card.Text>
                <Button variant="success" as={Link} to="/viewuser">
                  Manage Users
                </Button>
              </Card.Body>
            </Card>
          </Col>
</Row>
        {/* Navigation Cards */}
        <Row>
          <Col md={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Manage Shops</Card.Title>
                <Card.Text>
                  Add, edit, or remove shops and manage their details.
                </Card.Text>
                <Button variant="primary" as={Link} to="/viewshops">
                  Go to Shops
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>
                  View, edit, or delete user accounts as needed.
                </Card.Text>
                <Button variant="success" as={Link} to="/viewuser">
                  Go to Users
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default AdminDashboard;
