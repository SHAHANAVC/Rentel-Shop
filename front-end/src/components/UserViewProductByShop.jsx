

import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayStarRating from "./DisplayStarRating";
import StarRating from "./StarRating";
import { useParams } from "react-router-dom";
import Complaints from "./Complaints";
import ReviewForm from "./ReviewForm";
import { Button } from "react-bootstrap";
import Usernav from "./Usernav";

function UserViewProductByShop() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState("");
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  // Fetch products and shop details for the selected shop
  const getShopDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getProductsByShop/${shopId}`
      );
      console.log(response.data);
      
      setProducts(response.data.products);
      setShopName(response.data.shopdata[0].shopName);
      
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  // Function to handle booking the product
  const handleBooking = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/bookProduct/${productId}`,
        {
          currentUserId: localStorage.getItem("userId"), // Assuming user ID is stored in localStorage
        }
      );

      setBookingMessage(response.data.message);
      getShopDetails(); // Refresh the product list
    } catch (error) {
      console.error("Error booking product:", error);
    }
  };

  // Function to handle canceling the booking
  const handleCancelBooking = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cancelBooking/${productId}`,
        {
          currentUserId: localStorage.getItem("userId"), // Assuming user ID is stored in localStorage
        }
      );
      console.log(response);
      alert(response.data.message)

      setBookingMessage(response.data.message);
      getShopDetails(); // Refresh the product list
    } catch (error) {
      console.error("Error canceling booking:", error);
      
    }
  };

  useEffect(() => {
    getShopDetails();
  }, [shopId]);
  return (
    <div className="container mt-5">
      <Usernav/>
      <h2 className="text-center mb-4">
        Products in {shopName || "Selected Shop"}
      </h2>

      {bookingMessage && (
        <div className="alert alert-success text-center">{bookingMessage}</div>
      )}

      {/* Buttons for Complaint and Review */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-danger me-2"
          onClick={() => setShowComplaintsModal(true)}
        >
          Submit Complaint for Shop
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowReviewsModal(true)}
        >
          Submit Review for Shop
        </button>
      </div>

      {/* Complaints Modal */}
      <Complaints
        shopId={shopId}
        show={showComplaintsModal}
        handleClose={() => setShowComplaintsModal(false)}
      />

      {/* Reviews Modal */}
      <ReviewForm
        shopId={shopId}
        show={showReviewsModal}
        handleClose={() => setShowReviewsModal(false)}
      />

      <div className="row justify-content-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
              <div className="card h-100 custom-card">
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">
                    {product.productName}
                  </h5>
                  <p className="card-text small">{product.description}</p>
                  <p className="card-text mb-2">
                    <strong>Price:</strong> ${product.price}
                  </p>

                  {/* Display the average rating */}
                  <DisplayStarRating
                    averageRating={product.rating.averageRating || 0}
                  />

                  {/* Handle status logic */}
                  <p className="card-text mb-3">
                    <strong>Status:</strong>{" "}
                    {(product.status === "shiped" &&
                      product.bookedBy !== localStorage.getItem("userId")) ||
                    (product.status === "booked" &&
                      product.bookedBy !== localStorage.getItem("userId"))
                      ? "sold out"
                      : product.status}
                  </p>

                  {/* Show Rating if the product is shipped */}
                  {product.status === "shiped" && (
                    <StarRating
                      productId={product._id}
                      currentRating={product.rating.averageRating || 0}
                      onRatingSubmit={(newRating) =>
                        handleRatingSubmit(product._id, newRating)
                      }
                    />
                  )}

                  {/* Show appropriate button based on status */}
                  <div className="mt-auto">
                    <Button
                      variant={
                        product.status === "booked" ? "secondary" : "success"
                      }
                      className="w-100"
                      onClick={() => handleBooking(product._id)}
                      disabled={
                        product.status === "shiped" ||
                        (product.status === "booked" &&
                          product.bookedBy !== localStorage.getItem("userId"))
                      }
                    >
                      {product.status === "booked"
                        ? "Booked"
                        : product.status === "booking"
                        ? "BOOKING..."
                        : "Book"}
                    </Button>

                    {product.status === "booked" &&
                      product.bookedBy === localStorage.getItem("userId") && (
                        <Button
                          variant="warning"
                          className="w-100 mt-2"
                          onClick={() => handleCancelBooking(product._id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available in this shop.</p>
        )}
      </div>
    </div>
  );
}

export default UserViewProductByShop;
