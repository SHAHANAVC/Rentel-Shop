import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      console.log(response);

      if (response.data.user.role === "shop") {
        if (!response.data.user.verify) {
          alert(" not verified. Access denied.");
          navigate("/");
        } else {
          alert(response.data.message);
          localStorage.setItem("shopid", response.data.user._id);
          navigate("/shop-home");
        }
      } else if (response.data.user.role === "user") {
        if (!response.data.user.verify) {
          alert(" not verified. Access denied.");
          navigate("/");
        } else {
          alert(response.data.message);
          localStorage.setItem("userId", response.data.user._id);
          navigate("/user-home");
        }
      } else if (response.data.user.role === "admin") {
        alert(response.data.message);
        navigate("/admin");
      }
      else if(response.data.user.role ==='worker'){
        if (!response.data.user.verify) {
          alert(" not verified. Access denied.");
          navigate("/");
        } else {
          alert(response.data.message);
          localStorage.setItem("workerId", response.data.user._id);
          navigate("/worker-home");
        }

      }
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "An error occurred. Please try again.";
      alert(errorMessage);
    }
  };
  return (
    <div className="login col-md-6  col-12 m-auto mt-5  pb-md-3">
      <div className="text-center pt-5 ">
        <h2>Login</h2>
      </div>
      <Form
        className="col-12 col-md-10 col-lg-8 m-auto  text-start  mt-5 mb-5  p-3  loginform"
        onSubmit={loginForm}
      >
        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="login-input"
                type="text" // Correct type
                required="true"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="login-input"
                required="true"
                type="password" // Correct type
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="m-auto text-center">
          <Button
            className="loginbuttonview w-50 mt-2 btn-danger"
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
