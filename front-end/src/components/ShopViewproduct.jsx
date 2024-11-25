

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShopViewProduct() {
  const [products, setProducts] = useState([]);
  const shop_Loginid = localStorage.getItem('shopid'); // Corrected to use getItem

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/getProduct/${shop_Loginid}`);
      setProducts(response.data); // Save products in state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deleteProduct/${id}`);
      console.log(response.data);
      getProduct(); // After deletion, refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shop Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-12 mb-4 d-flex" key={product._id}>
              <div className="card w-100">
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ height: '200px', objectFit: 'cover' }} // Inline styling for consistent image size
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.productName}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p className="card-text">
                    <strong>status:</strong>{product.status}<br/>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/updateproduct/${product.productId}`}>
                      <Button variant="primary" >Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => deleteProduct(product.productId)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found for this shop.</p>
        )}
      </div>
    </div>
  );
}

export default ShopViewProduct;
