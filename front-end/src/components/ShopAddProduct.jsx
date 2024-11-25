import React, { useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import uuid from 'react-uuid';
import ShopNav from './ShopNav';

function ShopAddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const productShopId = localStorage.getItem('shopid');
  const [productId ,setId]= useState(uuid().slice(0,4))
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('productId', productId);
    formData.append('productShopId', productShopId);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/addproducts', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result); // Product added successfully!
      alert(result.message)
      if(result.status == 201){
            alert(result.message)
            formRef.current.reset();

      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <>
    <ShopNav/>
    <div className="bg-secondary text-center pb-5">
        
      <h2 className="mb-4">Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}  md="6" controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
        </Form.Group>
          <Form.Group as={Col} md='6' controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </Form.Group>
        </Row>

   

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formImage">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
    </div>
    </>
  );
}

export default ShopAddProduct;
