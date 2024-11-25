import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShopProductStatus() {
  const [products, setProducts] = useState([]);
  const shopId = localStorage.getItem('shopid'); // Assuming shopId is stored in localStorage

  // Fetch products added by this shop with 'pending' status
  const getShopProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/shopproductpending/${shopId}`);
    //   const pendingProducts = response.data.filter(product => product.status === 'pending');
      setProducts(response.data);
    console.log(response.data);
    
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to update product status to 'booked'
  const markAsBooked = async (productId) => {
    try {
      await axios.patch(`http://localhost:8000/updateproductstatus/${productId}`, { status: 'shiped' });
      // Update the local state to remove the product from the list
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  useEffect(() => {
    getShopProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Pending Shop Products</h2>
      <div className="row justify-content-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
              <div className="card h-100">
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.productName}</h5>
                  <p className="card-text small">{product.description}</p>
                  <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                  <p className="card-text"><strong>Category:</strong> {product.category}</p>
                  <p className="card-text">
                    <strong>Status:</strong> 
                    <span className="badge bg-warning">Pending</span>
                  </p>
                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={() => markAsBooked(product._id)}
                  >
                    Mark as Booked
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No pending products found for this shop.</p>
        )}
      </div>
    </div>
  );
}

export default ShopProductStatus;
