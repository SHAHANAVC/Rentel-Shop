// StarRating.js
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const StarRating = ({ productId, currentRating, onRatingSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(currentRating || 0);

  const handleClick = async (rating) => {
    try {
      // Update the selected rating locally for immediate UI feedback
      setSelectedRating(rating);

      // Send the rating to the backend
     const resp= await axios.patch(`http://localhost:8000/rateProduct/${productId}`, { rating });
console.log(resp);

      // Call the parent component function to update any parent state
      onRatingSubmit(rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={20}
          color={star <= selectedRating ? "#ffc107" : "#e4e5e9"}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
