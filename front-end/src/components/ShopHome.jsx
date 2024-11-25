import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import ShopNav from './ShopNav';
import ShopViewProduct from './ShopViewproduct';

const ShopHome = () => {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const shop_Loginid= localStorage.getItem('shopid')
    console.log(shop_Loginid);
    const fetchShop = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/getshop/${shop_Loginid}`);
          console.log('Response:', response.data); // Accessing response data correctly
          setShopData(response.data); // Save data to state
      } catch (err) {
          console.error('Error fetching shop data:', err);
          setError(err); // Handle error state
      } finally {
          setLoading(false); // Set loading to false after fetching
      }
  };

  useEffect(() => {
     
          fetchShop(); // Fetch data if shop_Loginid is available
  }, [shop_Loginid]); // Dependency array

  // Conditional rendering based on loading, error, and data state
  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error fetching shop data: {error.message}</div>;
  }

  return (
    
    <>
            <ShopNav/>
          <div className="shop-home pt-5">
                {shopData ? (
                    <div className='d-flex flex-wrap align-items-center justify-content-center' >
                      <div>
                       <Image src={`http://localhost:8000/uploads/${shopData.shopImage}`} roundedCircle style={{ width: '300px', height: '300px' }} />
                       </div>
                       <div className='p-2'>
                        <h1 className='text-center'>Welcome to {shopData.shopName}</h1>
                        <p> {shopData.ownerName}</p>
                        <p> {shopData.shopEmail}</p>
                        <p> Latitude: {shopData.location.lat}, Longitude: {shopData.location.lng}</p>
                        </div>
                        </div>


) : (
  <div>No shop data found.</div>
)}
</div>
 

 <ShopViewProduct/>



    </>
  )
}

export default ShopHome