
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ shopId, show, handleClose }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const userId = localStorage.getItem("userobjectid");
  console.log(userId);
  
 const navigate=useNavigate()
  // Fetch existing reviews for the shop
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/getShopReviews/${shopId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Submit a new review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newRating < 1 || newRating > 5) {
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8000/submitShopReview/${shopId}`, {
        comment: newReview,
        rating: newRating,
        user: userId,  // Adjusted to match backend expectations
      });
      setReviews((prevReviews) => [...prevReviews, res.data.review]); // Adjusted to access response data
      setNewReview("");
      setNewRating(0);
      alert(res.data.message)
      navigate('/user-home')
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    if (shopId && show) {
      fetchReviews();
    }
  }, [shopId, show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shop Reviews</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Review Form */}
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group controlId="reviewText" className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
            />
          </Form.Group>

          {/* Rating Input */}
          <Form.Group controlId="reviewRating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              required
            >
              <option value={0}>Select a Rating</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Form>

        {/* Display Existing Reviews */}
        {reviews.length > 0 && (
          <div className="mt-4">
            <h5>Previous Reviews</h5>
            {reviews.map((review, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Text>{review.comment}</Card.Text>
                  <small>
                    Rating:  ⭐{review.rating}
                  </small>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;

