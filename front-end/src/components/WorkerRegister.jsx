import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function WorkerRegister() {
  const [workerName, setWorkerName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [workerImage, setWorkerImage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('workerName', workerName);
    formData.append('jobTitle', jobTitle);
    formData.append('skills', skills);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    if (workerImage) {
      formData.append('workerImage', workerImage);
    }

    try {
      const response = await axios.post('http://localhost:8000/registerWorker', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering worker:', error);
      alert('Error registering worker');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Register as a Worker</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="workerName">
            <Form.Label>Worker Name</Form.Label>
            <Form.Control
              type="text"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="jobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="skills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="workerImage">
            <Form.Label>Worker Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setWorkerImage(e.target.files[0])}
              accept="image/*"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Register Worker
        </Button>
      </Form>
    </Container>
  );
}

export default WorkerRegister;
