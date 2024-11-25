import axios from 'axios';
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from 'react-router-dom';
import Home from './Home';

function UserRegistration() {
  const [userFullname, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [city, setUserCity] = useState("");
  const [state, setUserState] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: "", lng: "" });
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({}); // State for form validation errors
  const navigate = useNavigate()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
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

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!userFullname) {
        errors.userFullname = "Full name is required.";
        isValid = false;
    }
    if (!userEmail) {
        errors.userEmail = "Email is required.";
        isValid = false;
    }
    if (!city) {
        errors.city = "City is required.";
        isValid = false;
    }
    if (!state) {
        errors.state = "State is required.";
        isValid = false;
    }
    if (!pincode) {
        errors.pincode = "Pincode is required.";
        isValid = false;
    }
    if (!userName) {
        errors.userName = "Username is required.";
        isValid = false;
    }
    if (!userPassword) {
        errors.userPassword = "Password is required.";
        isValid = false;
    }
    if (!userLocation.lat || !userLocation.lng) {
        errors.userLocation = "Location must be obtained.";
        isValid = false;
    }

    return { isValid, errors }; // Return both isValid and errors
};

const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateForm();

    if (!isValid) {
        setFormErrors(errors);
        return; // Prevent form submission
    }

    addUser();
};

  const addUser = async () => {
    const body = {
      userFullname,
      userEmail,
      city,
      state,
      userLocation,
      userPassword,
      userName,
      pincode
    };
    try {
      const response = await axios.post("http://localhost:8000/userregister", body);
      console.log(response);
      alert(response.data.message);
      resetForm();
      navigate('/')
      // Reset form fields on success
      
    } catch (err) {
      console.error("Error registering user:", err);
      // Check if response exists and extract the error message
      if (err.response && err.response.data) {
          alert(err.response.data.message || "Failed to register user. Please try again.");
      } else {
          alert("Failed to register user. Please check your inputs and try again.");
      }
  }
};

  const resetForm = () => {
    setName("");
    setUserEmail("");
    setUserCity("");
    setUserState("");
    setUserLocation({ lat: "", lng: "" });
    setUserPassword("");
    setUsername("");
    setPincode("");
    setFormErrors({});
  };
  return (
    <div>
      <Home/>
      <h2 className='text-center mt-5'>User Registration</h2>
      <div className="container pt-sm-5 shopform mt-5 mb-5 pb-5">
        <Form noValidate onSubmit={handleSubmit} className="w-75 m-auto">
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                value={userFullname}
                onChange={(event) => {
                  setName(event.target.value);
                  setFormErrors((prev) => ({ ...prev, userFullname: "" })); // Clear error on change
                }}
                isInvalid={!!formErrors.userFullname}
              />
              <Form.Control.Feedback type="invalid">{formErrors.userFullname}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={userEmail}
                  onChange={(event) => {
                    setUserEmail(event.target.value);
                    setFormErrors((prev) => ({ ...prev, userEmail: "" })); // Clear error on change
                  }}
                  isInvalid={!!formErrors.userEmail}
                />
                <Form.Control.Feedback type="invalid">{formErrors.userEmail}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(event) => {
                  setUserCity(event.target.value);
                  setFormErrors((prev) => ({ ...prev, city: "" })); // Clear error on change
                }}
                isInvalid={!!formErrors.city}
              />
              <Form.Control.Feedback type="invalid">{formErrors.city}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                required
                value={state}
                onChange={(event) => {
                  setUserState(event.target.value);
                  setFormErrors((prev) => ({ ...prev, state: "" })); // Clear error on change
                }}
                isInvalid={!!formErrors.state}
              />
              <Form.Control.Feedback type="invalid">{formErrors.state}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pincode"
                required
                value={pincode}
                onChange={(event) => {
                  setPincode(event.target.value);
                  setFormErrors((prev) => ({ ...prev, pincode: "" })); // Clear error on change
                }}
                isInvalid={!!formErrors.pincode}
              />
              <Form.Control.Feedback type="invalid">{formErrors.pincode}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                value={userName}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setFormErrors((prev) => ({ ...prev, userName: "" })); // Clear error on change
                }}
                isInvalid={!!formErrors.userName}
              />
              <Form.Control.Feedback type="invalid">{formErrors.userName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={userPassword}
                onChange={(event) => {
                  setUserPassword(event.target.value);
                  setFormErrors((prev) => ({ ...prev, userPassword: "" })); // Clear error on change
                }}
                isInvalid={!!formErrors.userPassword}
              />
              <Form.Control.Feedback type="invalid">{formErrors.userPassword}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          {/* Location Section */}
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                value={userLocation.lat}
                placeholder="Latitude will appear here"
                readOnly // Optional: make it read-only
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                value={userLocation.lng}
                placeholder="Longitude will appear here"
                 // Optional: make it read-only
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
    </div>
  );
}

export default UserRegistration;
