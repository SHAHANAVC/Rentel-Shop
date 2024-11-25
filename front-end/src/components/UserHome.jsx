// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import UserViewProduct from './UserViewProduct';

// function UserHome() {
//     const userId = localStorage.getItem('userId');
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchUser = async () => {
//         try {
//             const resp = await axios.get(`http://localhost:8000/getuserhome/${userId}`);
//             console.log(resp);
//             setUserData(resp.data); // Assuming the user data is in resp.data
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching user data:', err);
//             setError('Failed to fetch user data. Please try again later.');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (userId) {
//             fetchUser();
//         } else {
//             setError('User ID not found. Please log in again.');
//             setLoading(false);
//         }
//     }, [userId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div style={{ color: 'red' }}>{error}</div>;
//     }

//     return (
//         <div>
//             <h1>User Home</h1>
//             {userData ? (
//                 <div>
//                     <h2>Welcome, {userData.userFullname}</h2>
//                     <p>Email: {userData.userEmail}</p>
//                     <p>City: {userData.city}</p>
//                     <p>State: {userData.state}</p>
//                     {/* Add more user details as needed */}
//                 </div>
//             ) : (
//                 <div>No user data found.</div>
//             )}

//             <UserViewProduct/>
//         </div>
//     );
// }

// export default UserHome;
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import UserViewProduct from './UserViewProduct';

// function UserHome() {
//     const userId = localStorage.getItem('userId');
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [nearestShop, setNearestShop] = useState(null); // State for nearest shop
//     const [shops, setShops] = useState([]); // State for shop locations

//     const fetchUser = async () => {
//         try {
//             const resp = await axios.get(`http://localhost:8000/getuserhome/${userId}`);
//             console.log(resp);
//             setUserData(resp.data); // Assuming the user data is in resp.data
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching user data:', err);
//             setError('Failed to fetch user data. Please try again later.');
//             setLoading(false);
//         }
//     };

//     const fetchShops = async () => {
//         try {
//             const resp = await axios.get('http://localhost:8000/getallshops'); // Fetch all shops
//             setShops(resp.data); // Assuming shops data is in resp.data
//             console.log(resp);
//         } catch (err) {
//             console.error('Error fetching shops:', err);
//         }
//     };

//     const findNearestShop = (userLocation) => {
//         if (!shops.length) return;

//         let nearest = null;
//         let minDistance = Infinity;

//         shops.forEach(shop => {
//             const distance = calculateDistance(
//                 userLocation.lat,
//                 userLocation.lng,
//                 shop.location.lat,
//                 shop.location.lng
//             );
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 nearest = shop;
//             }
//         });

//         setNearestShop(nearest);
//     };

//     // Haversine formula to calculate distance between two lat/lon points
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371; // Radius of the Earth in km
//         const dLat = (lat2 - lat1) * (Math.PI / 180);
//         const dLon = (lon2 - lon1) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         return R * c; // Distance in km
//     };

//     useEffect(() => {
//         if (userId) {
//             fetchUser();
//             fetchShops(); // Fetch shops data
//         } else {
//             setError('User ID not found. Please log in again.');
//             setLoading(false);
//         }
//     }, [userId]);

//     useEffect(() => {
//         if (userData && shops.length) {
//             const userLocation = userData.userLocation; // Use stored user location from API response
//             findNearestShop(userLocation);
//         }
//     }, [userData, shops]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div style={{ color: 'red' }}>{error}</div>;
//     }

//     return (
//         <div>
//             <h1>User Home</h1>
//             {userData ? (
//                 <div>
//                     <h2>Welcome, {userData.userFullname}</h2>
//                     <p>Email: {userData.userEmail}</p>
//                     <p>City: {userData.city}</p>
//                     <p>State: {userData.state}</p>
//                 </div>
//             ) : (
//                 <div>No user data found.</div>
//             )}

//             {nearestShop ? ( // Display nearest shop details
//                 <div className="mt-4">
//                     <h3>Nearest Shop:</h3>
//                     <p>Name: {nearestShop.shopName}</p>
//                     <p>Address: {nearestShop.address}</p>
//                     <p>Distance: {calculateDistance(
//                         userData.userLocation.lat,
//                         userData.userLocation.lng,
//                         nearestShop.location.lat,
//                         nearestShop.location.lng
//                     ).toFixed(2)} km</p>
//                 </div>
//             ) : (
//                 <p>Finding nearest shop...</p>
//             )}

//             <UserViewProduct />
//         </div>
//     );
// }

// export default UserHome;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import UserViewProduct from "./UserViewProduct";

// function UserHome() {
//   const userId = localStorage.getItem("userId");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [nearestShops, setNearestShops] = useState([]); // State for nearest shops
//   const [shops, setShops] = useState([]); // State for shop locations
//   const [searchLocation, setSearchLocation] = useState(""); // State for search input
//   const [selectedShopId, setSelectedShopId] = useState(null);
  

//   const fetchUser = async () => {
//     try {
//       const resp = await axios.get(
//         `http://localhost:8000/getuserhome/${userId}`
//       );
//       setUserData(resp.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setError("Failed to fetch user data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchShops = async () => {
//     try {
//       const resp = await axios.get("http://localhost:8000/getallshops"); // Fetch all shops
//       setShops(resp.data);
//       console.log(resp);
//     } catch (err) {
//       console.error("Error fetching shops:", err);
//     }
//   };

//   // Haversine formula to calculate distance between two lat/lon points
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
//   };

//   // Function to find and filter nearest shops based on location search
//   const findNearestShops = (location) => {
//     if (!shops.length) return;

//     // Simulate location based on search input (for example purposes)
//     let searchLat, searchLon;
//     if (location.toLowerCase() === "calicut") {
//       searchLat = 11.2588; // Example latitude for Calicut
//       searchLon = 75.7804; // Example longitude for Calicut
//     } else {
//       // Default to user's saved location
//       searchLat = userData?.userLocation?.lat;
//       searchLon = userData?.userLocation?.lng;
//     }

//     const nearbyShops = shops
//       .map((shop) => ({
//         ...shop,
//         distance: calculateDistance(
//           searchLat,
//           searchLon,
//           shop.location.lat,
//           shop.location.lng
//         ),
//       }))
//       .filter((shop) => shop.distance <= 10) // Example: filter shops within 10 km
//       .sort((a, b) => a.distance - b.distance); // Sort by closest distance

//     setNearestShops(nearbyShops);
//   };

//   const handleSearchChange = (event) => {
//     setSearchLocation(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     findNearestShops(searchLocation);
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchUser();
//       fetchShops();
//     } else {
//       setError("User ID not found. Please log in again.");
//       setLoading(false);
//     }
//   }, [userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   return (
//     <div>
//       {/* <h1 className='text-center'>User Home</h1> */}
//       {userData ? (
//         <div className="text-center">
//           <h2>Welcome, {userData.userFullname}</h2>
//           <p>Email: {userData.userEmail}</p>
//           <p>City: {userData.city}</p>
//           <p>State: {userData.state}</p>
//         </div>
//       ) : (
//         <div>No user data found.</div>
//       )}

//       {/* Search Form */}
//       <form onSubmit={handleSearchSubmit} className="text-center">
//         <input
//           type="text"
//           placeholder="Enter location"
//           value={searchLocation}
//           onChange={handleSearchChange}
//           style={{ padding: "8px", width: "200px" }}
//         />
//         <button type="submit" style={{ padding: "8px 12px" }}>
//           Search
//         </button>
//       </form>

//       {/* Display Nearest Shops */}
//       {/* {nearestShops.length ? (
//     <div className="mt-4">
//         <h3>Nearest Shops:</h3>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//             {nearestShops.map((shop, index) => (
//                 <div 
//                     key={shop._id} 
//                     style={{
//                         border: '1px solid #ddd',
//                         borderRadius: '8px',
//                         padding: '16px',
//                         width: '200px',
//                         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                         backgroundColor: '#fff',
//                         textAlign: 'center'
//                     }}
//                 >
//                     <h4 style={{ margin: '0 0 8px', fontSize: '1.1em', color: '#333' }}>
//                         {shop.shopName}
//                     </h4>
//                     <p style={{ margin: '4px 0', color: '#777' }}>{shop.address}</p>
//                     <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
//                         {shop.distance.toFixed(2)} km away
//                     </p>
//                 </div>
//                        ))}
//                        </div>
//                    </div>
//             ) : (
//                 <p>No nearby shops found for this location.</p>
//             )} */}

//       {nearestShops.length ? (
//         <div className="mt-4">
//           <h3>Nearest Shops:</h3>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
//             {nearestShops.map((shop, index) => (
//               <div
//                 key={shop._id}
//                 onClick={() => setSelectedShopId(shop.commonKey)} // Set selected shop ID on click
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "8px",
//                   padding: "16px",
//                   width: "200px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   backgroundColor: "#fff",
//                   textAlign: "center",
//                   cursor: "pointer", // Indicate it's clickable
//                 }}
//               >
//                 <h4
//                   style={{
//                     margin: "0 0 8px",
//                     fontSize: "1.1em",
//                     color: "#333",
//                   }}
//                 >
//                   {shop.shopName}
//                 </h4>
//                 <p style={{ margin: "4px 0", color: "#777" }}>{shop.address}</p>
//                 <p style={{ margin: "4px 0", fontWeight: "bold" }}>
//                   {shop.distance.toFixed(2)} km away
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p></p>
//       )}

//       <UserViewProduct selectedShopId={selectedShopId} />
//     </div>
//   );
// }

// export default UserHome;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import UserViewProduct from "./UserViewProduct";
// import Usernav from "./Usernav";

// function UserHome() {
//   const userId = localStorage.getItem("userId");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [nearestShops, setNearestShops] = useState([]); // State for nearest shops
//   const [shops, setShops] = useState([]); // State for shop locations
//   const [selectedShopId, setSelectedShopId] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const resp = await axios.get(`http://localhost:8000/getuserhome/${userId}`);
//       setUserData(resp.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setError("Failed to fetch user data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchShops = async () => {
//     try {
//       const resp = await axios.get("http://localhost:8000/getallshops"); // Fetch all shops
//       setShops(resp.data);
//     } catch (err) {
//       console.error("Error fetching shops:", err);
//     }
//   };

//   // Haversine formula to calculate distance between two lat/lon points
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
//   };

//   // Function to find and filter nearest shops based on location
//   const findNearestShops = (searchLat, searchLon) => {
//     if (!shops.length) return;

//     const nearbyShops = shops
//       .map((shop) => ({
//         ...shop,
//         distance: calculateDistance(searchLat, searchLon, shop.location.lat, shop.location.lng),
//       }))
//       .filter((shop) => shop.distance <= 10) // Example: filter shops within 10 km
//       .sort((a, b) => a.distance - b.distance); // Sort by closest distance

//     setNearestShops(nearbyShops);
//   };

//   // Function to handle button click to find nearest shops
//   const handleFindNearestShops = () => {
//     let searchLat, searchLon;

//     // Use user location or default to Calicut
//     if (userData && userData.userLocation) {
//       searchLat = userData.userLocation.lat;
//       searchLon = userData.userLocation.lng;
//     } else {
//       searchLat = 11.2588; // Default latitude for Calicut
//       searchLon = 75.7804; // Default longitude for Calicut
//     }

//     findNearestShops(searchLat, searchLon);
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchUser();
//       fetchShops();
//     } else {
//       setError("User ID not found. Please log in again.");
//       setLoading(false);
//     }
//   }, [userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   return (
//     <div>
//       <Usernav/>
//       {userData ? (
//         <div className="text-center">
//           <h2>Welcome, {userData.userFullname}</h2>
//           <p>Email: {userData.userEmail}</p>
//           <p>City: {userData.city}</p>
//           <p>State: {userData.state}</p>
//         </div>
//       ) : (
//         <div>No user data found.</div>
//       )}

//       {/* Button to find nearest shops */}
//       <div className="text-center">
//         <button onClick={handleFindNearestShops} style={{ padding: "8px 12px", marginTop: "16px" ,borderRadius:'10px' , border:'none'}}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
//   <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
// </svg> View Nearest Shops
//         </button>
//       </div>

//       {/* Display Nearest Shops */}
//       {nearestShops.length ? (
//         <div className="mt-4">
//           <h3>Nearest Shops:</h3>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
//             {nearestShops.map((shop) => (
//               <div
//                 key={shop._id}
//                 onClick={() => setSelectedShopId(shop.commonKey)} // Set selected shop ID on click
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "8px",
//                   padding: "16px",
//                   width: "200px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   backgroundColor: "#fff",
//                   textAlign: "center",
//                   cursor: "pointer", // Indicate it's clickable
//                 }}
//               >
//                 <h4 style={{ margin: "0 0 8px", fontSize: "1.1em", color: "#333" }}>
//                   {shop.shopName}
//                 </h4>
//                 <p style={{ margin: "4px 0", color: "#777" }}>{shop.address}</p>
//                 <p style={{ margin: "4px 0", fontWeight: "bold" }}>
//                   {shop.distance.toFixed(2)} km away
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>No nearby shops found.</p>
//       )}

// <UserViewProduct selectedShopId={selectedShopId} currentUserId={userId} />

//     </div>
//   );
// }

// export default UserHome;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Usernav from "./Usernav";
import UserViewProduct from "./UserViewProduct";

function UserHome() {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearestShops, setNearestShops] = useState([]); // State for nearest shops
  const [shops, setShops] = useState([]); // State for shop locations
  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  // Fetch user data
  const fetchUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/getuserhome/${userId}`);
      setUserData(resp.data);
      console.log(resp.data);
      localStorage.setItem('userobjectid',resp.data._id)
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch all shops
  const fetchShops = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/getallshops");
      setShops(resp.data);
    } catch (err) {
      console.error("Error fetching shops:", err);
    }
  };

  // Haversine formula to calculate distance between two lat/lon points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Function to find and filter nearest shops based on location
  const findNearestShops = (searchLat, searchLon) => {
    if (!shops.length) return;

    const nearbyShops = shops
      .map((shop) => ({
        ...shop,
        distance: calculateDistance(searchLat, searchLon, shop.location.lat, shop.location.lng),
      }))
      .filter((shop) => shop.distance <= 10) // Example: filter shops within 10 km
      .sort((a, b) => a.distance - b.distance); // Sort by closest distance

    setNearestShops(nearbyShops);
  };

  // Button handler to find nearest shops
  const handleFindNearestShops = () => {
    let searchLat, searchLon;

    // Use user location or default to Calicut
    if (userData && userData.userLocation) {
      searchLat = userData.userLocation.lat;
      searchLon = userData.userLocation.lng;
    } else {
      searchLat = 11.2588; // Default latitude for Calicut
      searchLon = 75.7804; // Default longitude for Calicut
    }

    findNearestShops(searchLat, searchLon);
  };

  // Handler for shop selection to navigate to UserViewProductByShop
  const handleShopClick = (shopId) => {
    navigate(`/userviewproductbyshop/${shopId}`);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchShops();
    } else {
      setError("User ID not found. Please log in again.");
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <Usernav />
      {userData ? (
        <div className="text-center">
          <h2>Welcome, {userData.userFullname}</h2>
          <p>Email: {userData.userEmail}</p>
          <p>City: {userData.city}</p>
          <p>State: {userData.state}</p>
        </div>
      ) : (
        <div>No user data found.</div>
      )}

      {/* Button to find nearest shops */}
      <div className="text-center">
        <button onClick={handleFindNearestShops} style={{ padding: "8px 12px", marginTop: "16px", borderRadius: '10px', border: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg> View Nearest Shops
        </button>
      </div>

      {/* Display Nearest Shops */}
      {nearestShops.length ? (
        <div className="mt-4">
          <h3>Nearest Shops:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {nearestShops.map((shop) => (
              <div
                key={shop._id}
                onClick={() => handleShopClick(shop.commonKey)} // Navigate to UserViewProductByShop on click
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "200px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h4 style={{ margin: "0 0 8px", fontSize: "1.1em", color: "#333" }}>
                  {shop.shopName}
                </h4>
                <p style={{ margin: "4px 0", color: "#777" }}>{shop.address}</p>
                <p style={{ margin: "4px 0", fontWeight: "bold" }}>
                  {shop.distance.toFixed(2)} km away
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No nearby shops found.</p>
      )}
      <UserViewProduct  currentUserId={userId} />
    </div>
  );
}

export default UserHome;
