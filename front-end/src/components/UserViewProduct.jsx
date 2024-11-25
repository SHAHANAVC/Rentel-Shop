import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating"; // Import the StarRating component
import DisplayStarRating from "./DisplayStarRating"; // Import DisplayStarRating component
import ReviewForm from "./ReviewForm";

function UserViewProduct({ selectedShopId, currentUserId }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getallproduct");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateProductStatus = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/bookProduct/${productId}`,
        {
          currentUserId,
        }
      );
      console.log(currentUserId, "pid", productId);
      console.log(response);

      setBookingMessage(response.data.message);
      getAllProducts(); // Refresh product list
    } catch (error) {
      console.error("Error booking product:", error);
    }
  };

  const cancelBooking = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cancelBooking/${productId}`,
        {
          currentUserId,
        }
      );
      setBookingMessage(response.data.message);
      getAllProducts(); // Refresh product list
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  // New function to handle rating submission
  const handleRatingSubmit = async (productId, newRating) => {
    try {
      // Send the new rating to the backend
      await axios.patch(`http://localhost:8000/rateProduct/${productId}`, {
        rating: newRating,
      });

      // Update the product's rating locally
      setFilteredProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, averageRating: newRating } // Update averageRating directly
            : product
        )
      );
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedShopId) {
      filtered = filtered.filter(
        (product) => product.productShopId === selectedShopId
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedShopId, searchTerm, products]);
  console.log(products);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Products</h2>
      {/* Display average rating and rating form for the shop */}
      {/* <div className="text-center mb-4">
        <h4>Rate This Shop</h4>
        <DisplayStarRating averageRating={averageShopRating} />
        <ReviewForm shopId={selectedShopId} onRatingUpdate={fetchShopRating} currentUserId={currentUserId} />
      </div> */}
      {bookingMessage && (
        <div className="alert alert-success text-center">{bookingMessage}</div>
      )}

      <Form.Control
        type="text"
        placeholder="Search by product name"
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row justify-content-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
              <div className="card h-100 custom-card">
                <Link to={`/userprodetils/${product._id}`}>
                  <img
                    src={`http://localhost:8000/uploads/${product.image}`}
                    className="card-img-top"
                    alt={product.productName}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">
                    {product.productName}
                  </h5>
                  <p className="card-text small">{product.description}</p>
                  <p className="card-text mb-2">
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Status:</strong>{" "}
                    {product.status === "shipped" ||
                    (product.status === "booked" &&
                      product.bookedBy !== currentUserId)
                      ? "sold out"
                      : product.status}
                  </p>
                  {/* Display Average Rating */}
                  <p className="card-text mb-3">
                    <DisplayStarRating
                      averageRating={product.rating.averageRating || 0}
                    />
                  </p>

                  {product.status === "shipped" ? (
                    <StarRating
                      productId={product._id}
                      currentRating={product.averageRating || 0}
                      onRatingSubmit={(newRating) =>
                        handleRatingSubmit(product._id, newRating)
                      }
                    />
                  ) : (
                    <p className="text-muted"></p>
                  )}

                  <div className="mt-auto">
                    <Button
                      variant={
                        product.status === "booked" ? "secondary" : "success"
                      }
                      className="w-100"
                      onClick={() => updateProductStatus(product._id)}
                      disabled={
                        product.status === "shiped" ||
                        (product.status === "booked" &&
                          product.bookedBy !== currentUserId)
                      }
                    >
                      {product.status === "booked"
                        ? "Booked"
                        : product.status === "booking"
                        ? "BOOKING..."
                        : "Book"}
                    </Button>

                    {product.status === "booked" &&
                      product.bookedBy === currentUserId && (
                        <Button
                          variant="warning"
                          className="w-100 mt-2"
                          onClick={() => cancelBooking(product._id)}
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
          <p className="text-center">No products available for this shop.</p>
        )}
      </div>
    </div>
  );
}

export default UserViewProduct;
