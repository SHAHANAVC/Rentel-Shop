// DisplayStarRating.js
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const DisplayStarRating = ({ averageRating }) => {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} color="#ffc107" />
      ))}
      {/* Render half star if applicable */}
      {hasHalfStar && <FaStarHalfAlt color="#ffc107" />}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} color="#e4e5e9" />
      ))}
    </div>
  );
};

export default DisplayStarRating;
