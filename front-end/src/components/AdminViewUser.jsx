import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap"; // Add Bootstrap if not already installed
import Admin from "./Admin";

function AdminViewUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch users from API
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle "View" button click - opens the modal with user details
  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle "Block" button click (example function)
  const handleBlock = async (userId) => {
    try {
      let resp=await axios.patch(`http://localhost:8000/verification/${userId}`);
      console.log(resp);
      alert(resp.data.message)
      fetchUser(); // Refresh the user list
    } catch (error) {
      console.error("Error blocking user:", error);
      alert(error.response.data.message)
    }
  };
  console.log(users);

  return (
    <>
    <Admin/>
    <div className="container">
    <h3 className="text-center my-4">Users</h3>
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.userFullname}</td>
              <td>{user.userEmail}</td>
              <td className="d-flex flex-column flex-md-row justify-content-center">
                <Button
                  variant="primary"
                  className="mb-2 mb-md-0 me-md-2"
                  onClick={() => handleView(user)}
                >
                  View
                </Button>
                <Button
                  variant="success" 
                  onClick={() => handleBlock(user.commonKey)}
                >
                  verify
                  {/* {user.verify ? "Verified" : "Blocked"} */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    {/* Modal for displaying user details */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.userFullname}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.userEmail}
            </p>
            <p>
              <strong>State:</strong> {selectedUser.state}
            </p>
            <p>
              <strong>Pincode:</strong> {selectedUser.pincode}
            </p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  </>
);
}


export default AdminViewUser;
