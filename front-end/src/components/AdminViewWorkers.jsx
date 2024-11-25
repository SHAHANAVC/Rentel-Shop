import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

function AdminViewWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all workers on component mount
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getAllWorkers');
      setWorkers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setLoading(false);
    }
  };

  const handleVerification = async (workerId) => {
    try {
      const response = await axios.patch(`http://localhost:8000/verification/${workerId}`);
      alert(response.data.message);
      fetchWorkers(); // Refresh the worker list after status change
    } catch (error) {
      console.error('Error updating verification status:', error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };
  
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Workers List</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row>
          {workers.map((worker) => (
            <Col key={worker._id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`http://localhost:8000/uploads/${worker.workerImage}`}
                />
                <Card.Body>
                  <Card.Title>{worker.workerName}</Card.Title>
                  <Card.Text>
                    <strong>Job Title:</strong> {worker.jobTitle}
                    <br />
                    <strong>Skills:</strong> {worker.skills}
                    <br />
                    <strong>Email:</strong> {worker.email}
                    <br />
                    <strong>Phone:</strong> {worker.phone}
                  </Card.Text>
                  <Button variant="primary">View Details</Button>{' '}
                  <Button
                    variant={worker.commonKey.verify ? 'danger' : 'success'}
                    onClick={() => handleVerification(worker.commonKey._id, worker.verify)}
                  >
                    {worker.commonKey.verify ? 'Block' : 'Verify'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default AdminViewWorkers;
