import './App.css'
import ShopRegistration from './components/ShopRegistration'
import Login from './components/Login'
import UserRegistration from './components/UserRegistration'
import Homepage from './components/Homepage'
import { Routes, Route } from 'react-router-dom';
import ShopHome from './components/ShopHome'
import ShopAddProduct from './components/ShopAddProduct'
import ShopUpdateProduct from './components/ShopUpdateProduct'
import UserHome from './components/UserHome'
import ShopProductStatus from './components/ShopProductStatus'
import Admin from './components/Admin'
import AdminViewshop from './components/AdminViewshop'
import AdminViewUser from './components/AdminViewUser'
import ReviewForm from './components/ReviewForm'
import UserProductDetails from './components/UserProductDetails'
import UserViewProductByShop from './components/UserViewProductByShop'
import UserViewProduct from './components/UserViewProduct'
import ViewComplaints from './components/ViewComplaints'
import AdminViewComplaint from './components/AdminViewComplaint'
import AdminDashboard from './components/AdminDashboard'
import ShopViewReview from './components/ShopViewReview'
import WorkerRegister from './components/WorkerRegister'
import AdminViewWorkers from './components/AdminViewWorkers'
import WorkerHome from './components/WorkerHome'


function App() {
  return (
    <>
    
   <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/shop-registration" element={<ShopRegistration />}/>
      <Route path="/login" element={<Login/>} />
      <Route path='/user-registration' element={<UserRegistration/>}/>
      <Route path='/shop-home' element={<ShopHome/>}/>  
      <Route path='/productAdd' element={<ShopAddProduct/>}/>
      <Route path='/updateproduct/:id' element={<ShopUpdateProduct/>}/>
      <Route path='/user-home' element={<UserHome/>}/>
      <Route path='/shopProductpending' element={<ShopProductStatus/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/viewshops' element={<AdminViewshop/>}/>
      <Route path='/viewuser' element={<AdminViewUser/>}/>
      <Route path='/userreview' element={<ReviewForm/>}/>
      <Route path='/userviewproduct' element={<UserViewProduct/>}/>
      <Route path='/userprodetils/:id' element={<UserProductDetails/>}/>
      <Route path="/userviewproductbyshop/:shopId" element={<UserViewProductByShop />} />
      <Route path='/viewcomplaints' element={<ViewComplaints/>}></Route>
      <Route path='/viewreview' element={<ShopViewReview/>}/>
      {/* <Route path='/adminviewcomplaints'  element={<AdminViewComplaint/>}/> */}
      <Route path='/workerregister' element={<WorkerRegister/>}/>

      <Route path='/viewworkers' element={<AdminViewWorkers/>}/>
      <Route path='/worker-home' element={<WorkerHome/>}/>
      
    </Routes>
    </>
  )
}

export default App
