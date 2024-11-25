import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import ShopNav from "./ShopNav";

function ShopViewReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const shopId = localStorage.getItem("shopid");

  useEffect(() => {
    if (!shopId) {
      setError("Invalid Shop ID.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/getShopReviews/${shopId}`
        );
        setReviews(response.data); // Assume response.data contains the reviews array
        setError("");
        console.log(response);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [shopId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <ShopNav/>
      <h2 className="text-center mb-4 pt-3">Shop Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center">No reviews available for this shop.</p>
      ) : (
        <Row className="d-flex justify-content-center">
          {reviews.map((review) => (
            <Col key={review._id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    {review.user?.userFullname || "Anonymous"}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    Rating: {review.rating}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Comment:</strong> {review.comment}
                  </Card.Text>
                  <Card.Footer className="text-muted">
                    {new Date(review.createdAt).toLocaleString()}
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ShopViewReview;
