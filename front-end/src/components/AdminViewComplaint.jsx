import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";
 // Assuming you have a CSS file for styling

function AdminViewComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getallcomplaints");
      setComplaints(response.data); // Store complaints data in state
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to fetch complaints. Please try again later.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="admin-complaint-container">
    <Admin/>
      <h1>Admin View Complaints</h1>

      {loading ? (
        <p className="loading">Loading complaints...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : complaints.length > 0 ? (
        <div className="complaint-list">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Complaint</th>
                <th>Shop</th>
                <th>Reply</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>
                    {complaint.userId?.userFullname} <br />
                    <small>({complaint.userId?.userEmail})</small>
                  </td>
                  <td>{complaint.complaintText}</td>
                  <td>
                    {complaint.shopDetails ? (
                      <>
                        <strong>{complaint.shopDetails.shopName}</strong> <br />
                        <small>
                          {complaint.shopDetails.shopCity},{" "}
                          {complaint.shopDetails.shopState}
                        </small>
                      </>
                    ) : (
                      <em>Shop details unavailable</em>
                    )}
                  </td>
                  <td>
                    {complaint.reply ? (
                      <>
                        {complaint.reply.text} <br />
                        <small>
                          Replied on{" "}
                          {new Date(complaint.reply.dateReplied).toLocaleString()}
                        </small>
                      </>
                    ) : (
                      <em>No reply yet</em>
                    )}
                  </td>
                  <td>
                    {new Date(complaint.dateSubmitted).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-complaints">No complaints found</p>
      )}
    </div>
  );
}

export default AdminViewComplaint;

