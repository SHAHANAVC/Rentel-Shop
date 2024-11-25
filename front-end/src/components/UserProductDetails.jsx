import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import Complaints from "./Complaints";
 // Import Reviews component
import axios from "axios";
import ReviewForm from "./ReviewForm";

const UserProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false); // For reviews modal

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/getproductbyId/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to fetch product details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading product details...</span>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Img
              variant="top"
              src={`http://localhost:8000/uploads/${product.image}` || "https://via.placeholder.com/600x400"}
              alt={product?.name}
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
            <Card.Body>
              <Card.Title className="text-primary">{product?.name || "Product Name"}</Card.Title>
              <Card.Text className="text-muted">{product?.description || "Product Description"}</Card.Text>
              <h4 className="text-success">${product?.price || "Price"}</h4>
              <p><strong>Category:</strong> {product?.category || "Category"}</p>
              <Button variant="danger" onClick={() => setShowComplaintsModal(true)} className="me-2">
                File a Complaint
              </Button>
              <Button variant="info" onClick={() => setShowReviewsModal(true)}>
                View Reviews
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Complaints Modal */}
    {/*  <Complaints
        productId={id}
        show={showComplaintsModal}
        handleClose={() => setShowComplaintsModal(false)}
      />

       Reviews Modal 
      <ReviewForm
        productId={id}
        show={showReviewsModal}
        handleClose={() => setShowReviewsModal(false)}
      />*/}
    </Container>
  );
};

export default UserProductDetails;
