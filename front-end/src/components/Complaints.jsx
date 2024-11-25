import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import axios from "axios";

const Complaints = ({ shopId, show, handleClose }) => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState("");
  const userId = localStorage.getItem("userobjectid");

  const fetchUserComplaints = async () => {
    try {
      const body = { userId, shopId };
      console.log(body);

      // Fetch complaints by user and shop from the modified endpoint
      const res = await axios.get(`http://localhost:8000/getUserComplaints`, {
        params: { userId, shopId },
      });
      console.log(res);

      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/submitComplaint", {
        shopId,
        userId,
        complaintText: newComplaint,
      });
      console.log(res);

      // Assuming `res.data.complaint` returns the newly created complaint
      setComplaints((prevComplaints) => [
        ...prevComplaints,
        res.data.complaint,
      ]);
      setNewComplaint("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  useEffect(() => {
    if (shopId && userId && show) {
      fetchUserComplaints();
    }
  }, [shopId, userId, show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>File a Complaint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleComplaintSubmit}>
          <Form.Group controlId="complaintText" className="mb-3">
            <Form.Label>Complaint</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComplaint}
              onChange={(e) => setNewComplaint(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Submit Complaint
          </Button>
        </Form>

        {complaints.length > 0 && (
          <div className="mt-4">
            <h5>Previous Complaints</h5>
            {complaints.map((complaint, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Text>{complaint.complaintText}</Card.Text>

                  <small className="text-muted">
                    Submitted on:{" "}
                    {new Date(complaint.dateSubmitted).toLocaleString()}
                  </small>

                  {/* Safely check for the reply property */}
                  {complaint.reply ? (
                    <Card.Text>
                      <strong>Reply:</strong> {complaint.reply.text}
                    </Card.Text>
                  ) : (
                    <Card.Text>
                      <em>No reply yet</em>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Complaints;
