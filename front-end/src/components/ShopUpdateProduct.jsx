import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ShopNav from './ShopNav';
import { useParams } from 'react-router-dom';

function ShopUpdateProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const { id } = useParams();

    // Fetch product details to prefill form fields
    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/getUpdateProduct/${id}`);
            const product = response.data;

            // Set form fields with product data
            setProductName(product.productName);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the updated data
        const updatedProduct = {
            productName,
            description,
            price,
            category
        };

        try {
            const response = await axios.put(`http://localhost:8000/updateProduct/${id}`, updatedProduct);

            if (response.status === 200) {
                alert('Product updated successfully!');
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert('Failed to update product');
        }
    };

    return (
        <>
            <ShopNav />
            <div className="bg-secondary text-center pb-5">
                <h2 className="mb-4">Update Product</h2>
                
                <Form onSubmit={handleSubmit} className='w-50 m-auto'>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
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

                    <Button variant="primary" type="submit" className="mt-3">
                        Update Product
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default ShopUpdateProduct;
