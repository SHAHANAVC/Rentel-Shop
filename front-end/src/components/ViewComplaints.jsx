// ViewComplaints.js
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [activeComplaintId, setActiveComplaintId] = useState(null);
const shopId = localStorage.getItem('shopid')
// console.log(shopId);

  const fetchShopComplaints = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/getShopComplaints`, {
        params: { shopId },
      });
      console.log(res);
      
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleReplySubmit = async (complaintId) => {
    try {
      await axios.post(`http://localhost:8000/reply`, {
        complaintId,
        replyText,
      });

      // Update the complaint with the new reply in the state
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, reply: { text: replyText, dateReplied: new Date() } }
            : complaint
        )
      );
      setReplyText("");
      setActiveComplaintId(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  useEffect(() => {
    if (shopId) {
      fetchShopComplaints();
    }
  }, [shopId]);

  return (
    <div>
      <h3>Customer Complaints</h3>
      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <Card key={complaint._id} className="mb-3">
            <Card.Body>
              <Card.Title>Complaint from {complaint.userId.userFullname || "Anonymous"}</Card.Title>
              <Card.Text className="text-muted">{complaint.userId.userEmail}</Card.Text>
              <Card.Text>{complaint.complaintText}</Card.Text>
              <small className="text-muted">
                Submitted on: {new Date(complaint.dateSubmitted).toLocaleDateString()}
              </small>

              {complaint.reply ? (
                <div className="mt-2">
                  <strong>Shop Reply:</strong>
                  <Card.Text>{complaint.reply.text}</Card.Text>
                  <small className="text-muted">
                    Replied on: {new Date(complaint.reply.dateReplied).toLocaleDateString()}
                  </small>
                </div>
              ) : (
                <div className="mt-3">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Type your reply here..."
                    value={activeComplaintId === complaint._id ? replyText : ""}
                    onChange={(e) => {
                      setReplyText(e.target.value);
                      setActiveComplaintId(complaint._id);
                    }}
                  />
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={() => handleReplySubmit(complaint._id)}
                  >
                    Send Reply
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No complaints found.</p>
      )}
    </div>
  );
};

export default ViewComplaints;
