import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import Home from "./Home";


function ShopRegistration() {
  const [validated, setValidated] = useState(false);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [error, setError] = useState("");
  const [shopName, setShopName] = useState();
  const [ownerName, setOwner] = useState();
  const [shopCity, setCity] = useState();
  const [shopEmail, setEmail] = useState();
  const [shopImage, setShopImage] = useState(null);
  const [shopState, setState] = useState();
  const [shopPassword, setPassword] = useState();
  const [shopId] = useState(uuid().slice(0, 4)); // Setting once when initialized
  const navigate= useNavigate()

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    addShop();
  };

  const addShop = async () => {
    const shopFormData = new FormData();
    shopFormData.append("shopId", shopId); // Add shopId to FormData
    shopFormData.append("shopName", shopName);
    shopFormData.append("ownerName", ownerName);
    shopFormData.append("shopCity", shopCity);
    shopFormData.append("shopEmail", shopEmail);
    shopFormData.append("shopPassword", shopPassword);
    shopFormData.append("shopState", shopState);
    shopFormData.append("location[lat]", location.lat);
    shopFormData.append("location[lng]", location.lng);

    if (shopImage) {
      shopFormData.append("shopImage", shopImage); // Correct naming for the image
    } else {
      setError("Please select an image for the shop.");
      return;
    }

    try {
      const reg = await axios.post("http://localhost:8000/shopregistration", shopFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Registration response:", reg);
      alert(reg.data.message)
      navigate('/')
    } catch (error) {
      console.log("error", error);
      setError("Failed to register shop.");
    }
  };

  const handleImageChange = (event) => {
    setShopImage(event.target.files[0]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError("");
        },
        (error) => {
          setError("Error getting location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
    <Home/>
    <div className="container pt-sm-5 shopform mt-5  mb-5 pb-5">

      <h2 className="text-center mb-5 shop">SHOP REGISTRATION</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-75 m-auto"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Shop Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter shop name"
              onChange={(e) => setShopName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Owner Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter owner's name"
              onChange={(e) => setOwner(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              required
              onChange={(e) => setState(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Shop Image</Form.Label>
            <Form.Control type="file" required onChange={handleImageChange} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              value={location.lat}
              placeholder="Latitude"
              onChange={(e) =>
                setLocation({ ...location, lat: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              value={location.lng}
              placeholder="Longitude"
              onChange={(e) =>
                setLocation({ ...location, lng: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={getLocation}>
          Get My Location
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="text-center mt-5">
          <Button type="submit">Submit Form</Button>
        </div>
      </Form>
    </div>
    </>
  );
}

export default ShopRegistration;
