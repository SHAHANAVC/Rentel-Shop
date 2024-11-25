


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import Admin from "./Admin";

const AdminViewshop = () => {
    const [shops, setShops] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedShopId, setSelectedShopId] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchShops = async () => {
        try {
            const response = await axios.get("http://localhost:8000/getallshops");
            setShops(response.data);
        } catch (err) {
            alert("Failed to fetch shops.");
        }
    };

    const fetchComplaints = async (shopId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8000/getShopComplaints", {
                params: { shopId },
            });
            setComplaints(response.data);
        } catch (err) {
            setError("Failed to fetch complaints.");
        } finally {
            setLoading(false);
        }
    };
    const handleVerification = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/verification/${id}`);
            console.log(response);
            alert(response.data.message);
            // Update the local state to reflect the change
            fetchShops(); // Fetch the updated shop list
        } catch (error) {
            const errorMessage = error.response?.data.message || "An error occurred during verification.";
            alert(errorMessage);
        }
    };
    const handleShowComplaints = (shopId) => {
        setSelectedShopId(shopId);
        fetchComplaints(shopId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setComplaints([]);
        setError(null);
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <div>
            <Admin/>
        <Container>
            
            <h2 className="text-center my-4">Admin View Shops</h2>
            <div className="d-flex flex-wrap justify-content-center">
                {shops.map((shop) => (
                    <Card
                        key={shop._id}
                        className="m-3 shadow"
                        style={{ width: "400px", display: "flex" }}
                    >
                        <Row className="g-0">
                            <Col md={4}>
                                <Card.Img
                                    src={`http://localhost:8000/uploads/${shop.shopImage}`}
                                    alt="Shop Image"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title>{shop.shopName}</Card.Title>
                                    <Card.Text>
                                        {shop.shopEmail}<br />
                                        {shop.ownerName}, {shop.shopCity}
                                    </Card.Text>
                                    <Button 
                                    variant="success"
                                        onClick={() => handleVerification(shop.commonKey)}
                                    >
                                        verify
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowComplaints(shop.commonKey)}
                                    >
                                        View Complaints
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>

            {/* Complaints Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Complaints for Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading complaints...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : complaints.length > 0 ? (
                        <ul>
                            {complaints.map((complaint) => (
                                <li key={complaint._id}>
                                    <p><strong>User:</strong> {complaint.userId.userFullname} ({complaint.userId.userEmail})</p>
                                    <p><strong>Complaint:</strong> {complaint.complaintText}</p>
                                    {complaint.reply ? (
                                        <p>
                                            <strong>Reply:</strong> {complaint.reply.text} on{" "}
                                            {new Date(complaint.reply.dateReplied).toLocaleString()}
                                        </p>
                                    ) : (
                                        <p><em>No reply yet</em></p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No complaints found for this shop.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </div>
    );
};

export default AdminViewshop;
