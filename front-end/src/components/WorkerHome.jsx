import axios from "axios";
import React, { useEffect, useState } from "react";
import WorkerNav from "./WorkerNav";
 // External CSS file for styling

function WorkerHome() {
  const [worker, setWorker] = useState(null); // State to store worker data
  const [error, setError] = useState(null); // State to store any error message

  const workerCommonid = localStorage.getItem("workerId"); // Fetch worker ID from localStorage

  const fetchWorker = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getworker/${workerCommonid}`
      ); // Corrected API URL
      setWorker(response.data); // Store the fetched worker data
      console.log("Worker data:", response.data);
    } catch (err) {
      console.error("Error while fetching worker:", err);
      setError("Failed to fetch worker data");
    }
  };

  useEffect(() => {
    if (workerCommonid) {
      fetchWorker(); // Fetch worker only if ID exists
    } else {
      setError("Worker ID not found in localStorage");
    }
  }, []);

  return (
    <div className="worker-home-container">
        <WorkerNav/>
      <h1>Worker Home</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : worker ? (
        <div className="worker-details">
          <div className="worker-info">
            <img
              src={worker.workerImage || "https://via.placeholder.com/150"}
              alt={worker.workerName}
              className="worker-image"
            />
            <div className="worker-text">
              <h2>{worker.workerName}</h2>
              <p><strong>Job Title:</strong> {worker.jobTitle}</p>
              <p><strong>ID:</strong> {worker.commonKey}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading worker data...</p>
      )}
    </div>
  );
}

export default WorkerHome;
