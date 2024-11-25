import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import multer from "multer"; // Import multer
import shopData from "./models/shop.js";
import loginData from "./models/login.js";
import productData from "./models/product.js";
import userData from "./models/user.js";
import reviewData from "./models/review.js";
import complaint from "./models/complaint.js";
import complaintData from "./models/complaint.js";
import workerData from "./models/worker.js";
const server = express();

dotenv.config();

const PORT = process.env.PORT || 8000;
server.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// mongoose.connect("mongodb://localhost:27017/RENTAL_SHOP");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// server.listen(8000, () => {
//   console.log("Server started on port 8000");
// });
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

server.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Name files uniquely with a timestamp
  },
});

const upload = multer({ storage });

// Shop Registration Endpoint
server.post(
  "/shopregistration",
  upload.single("shopImage"), // Single image upload for shop image only
  async (req, res) => {
    const {
      shopId,
      shopName,
      ownerName,
      shopEmail,
      shopPassword,
      shopState,
      shopCity,
      location: { lat, lng },
    } = req.body;

    const shopImage = req.file ? req.file.filename : null; // Save shop image filename

    try {
      // Check if shop email already exists in login data
      const existShop = await loginData.findOne({ username: shopEmail });
      if (existShop) {
        return res.json({ message: "Shop already exists" });
      }

      // Hash the password and create login data entry
      const hashedPassword = await bcrypt.hash(shopPassword, 10);
      const login = await loginData.create({
        username: shopEmail,
        password: hashedPassword,
        role: "shop",
      });

      // Create shop data entry with uploaded shop image filename
      await shopData.create({
        commonKey: login._id,
        shopId,
        shopName,
        ownerName,
        shopEmail,
        shopState,
        shopCity,
        location: { lat, lng },
        shopImage, // Save the filename for the shop image
      });

      return res.json({ message: "Shop registered successfully" });
    } catch (error) {
      console.error("Error registering shop:", error);
      return res.status(400).json({ message: "Failed to register shop" });
    }
  }
);
server.use("/uploads", express.static("uploads"));
// login
server.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(req.body);
  try {
    const user = await loginData.findOne({ username });
    console.log('user:',user);
    
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    // Compare hashed password with the provided password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(400).json({ message: "invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal error" });
  }
});

// get shop details

server.get("/getshop/:id", async (req, res) => {
  const paramsId = req.params.id;
  try {
    const shop = await shopData.findOne({ commonKey: paramsId });
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(400);
  }
});

// add product details
server.post("/addproducts", upload.single("image"), async (req, res) => {
  const { name, description, price, category, productId, productShopId } =
    req.body;
  const image = req.file ? req.file.filename : null; // Save the image filename

  try {
    // Create a new product entry in the database
    const newProduct = await productData.create({
      productName: name,
      description,
      price,
      category,
      productId,
      productShopId,
      image, // Store the filename of the uploaded image
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Failed to add product" });
  }
});

// view products by shops
server.get("/getProduct/:shopId", async (req, res) => {
  const shopId = req.params.shopId;

  try {
    // Fetch products where productShopId matches the shopId from params
    const products = await productData.find({ productShopId: shopId });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
});
// get product by id
server.get("/getUpdateProduct/:id", async (req, res) => {
  try {
    const pId = req.params.id;
    // This should now log the correct ID value

    const product = await productData.findOne({ productId: pId });
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
});

// update product
server.put("/updateProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Product ID:", id);
    const { productName, description, price, category } = req.body;
    const updateData = { productName, description, price, category };
    console.log(updateData);

    const updatedProduct = await productData.findOneAndUpdate(
      { productId: id },
      updateData,
      { new: true } // Option to return the updated document instead of the original
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the updated product in the response
    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
});
// delete product by shop
server.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productData.findOneAndDelete({
      productId: productId,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
});

server.post("/userregister", async (req, res) => {
  console.log(req.body);

  const {
    userFullname,
    userEmail,
    userName,
    userPassword,
    city,
    state,
    pincode,
    userLocation,
  } = req.body;

  const lat = userLocation?.lat;
  const lng = userLocation?.lng;

  // Check if any required fields are missing
  if (
    !userFullname ||
    !userEmail ||
    !userName ||
    !userPassword ||
    !city ||
    !state ||
    !pincode ||
    !lat ||
    !lng
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    // Check if user with the same email or username exists
    const existingUser = await userData.findOne({ userEmail });
    const existUsername = await loginData.findOne({ username: userName });
    if (existingUser || existUsername) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ message: "User already exists with this email or username." });
    }

    // Hash password before saving it to the database
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create a new user instance
    const login = await loginData.create({
      username: userName,
      password: hashedPassword,
      role: "user",
    });

    await userData.create({
      commonKey: login._id,
      userFullname,
      userEmail,
      city,
      state,
      pincode,
      userLocation: { lat, lng },
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user." });
  }
});

server.get("/getuserhome/:id", async (req, res) => {
  const paramsId = req.params.id;
  // console.log(paramsId);

  try {
    const user = await userData.findOne({ commonKey: paramsId });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400);
  }
});

// user get all product details
server.get("/getallproduct", async (req, res) => {
  try {
    const product = await productData.find({});
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400);
  }
});
// book by user
server.patch("/bookProduct/:productId", async (req, res) => {
  
  const { productId } = req.params;
  const { currentUserId } = req.body; // Get userId from the request body
  console.log(currentUserId,'curentuid');
  const userId = currentUserId;

  try {
    const product = await productData.findById(productId);
    // console.log(product);
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.status === "available") {
      product.status = "booked";
      product.bookedBy = userId; // Set the bookedBy field to the provided userId
      await product.save();
      res.json({ message: "Product booked successfully" });
    } else {
      res.status(400).json({ message: "Product is already booked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error booking product", error });
  }
});

//cancel booking
server.patch("/cancelBooking/:id", async (req, res) => {
  const { id: productId } = req.params;
  const { currentUserId } = req.body; // Get userId from the request body
  console.log(currentUserId,'canceluserid');
  const userId = currentUserId;

  try {
    const product = await productData.findById(productId);
    // console.log(product);
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Ensure only the user who booked the product can cancel it
    if (product.bookedBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this booking" });
    }

    product.status = "available";
    product.bookedBy = null; // Clear the bookedBy field
    await product.save();

    res.json({ message: "Product booking cancelled", product });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error });
  }
});
// view shop product
server.get("/shopproductpending/:shopId", async (req, res) => {
  const { shopId } = req.params;
  console.log("shop", shopId);

  try {
    // Find products with the given shopId and 'pending' status
    const pendingProducts = await productData.find({
      productShopId: shopId,
      status: "booked",
    });
    return res.json(pendingProducts); // Send the filtered products as JSON response
  } catch (error) {
    console.error("Error fetching pending products:", error);
    res.status(500).json({ message: "Error fetching pending products", error });
  }
});
// Route to update product status by shop
server.patch("/updateproductstatus/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    // console.log(productId);
    
    const updatedProduct = await productData.findByIdAndUpdate(
      productId,
      { status: "shiped" },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product status", error });
  }
});

// get all shop

server.get("/getallshops", async (req, res) => {
  try {
    const shops = await shopData.find({}); // Use 'const' for variable declaration
    // console.log(shops);

    return res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error accessing shops", error: error.message });
  }
});

// admin shop and user verification
server.patch("/verification/:id", async (req, res) => {
  const paramsId = req.params.id;

  try {
    // Find the shop by ID
    const shop = await loginData.findById(paramsId);
    if (!shop) {
      return res.status(404).json({ message: " not found." });
    }

    // Toggle the verify status
    shop.verify = !shop.verify; // This will switch between true and false
    await shop.save(); // Save the updated shop

    res
      .status(200)
      .json({ message: ` verification status updated to ${shop.verify}.` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating verification." });
  }
});
// get all users for admin

server.get("/getallusers", async (req, res) => {
  try {
    let data = await userData.find({});
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurre" });
  }
});

// Endpoint to add a new review
server.post("/addReview", async (req, res) => {
  const { userId, shopId, rating, comment } = req.body;

  try {
    const newReview = await reviewData.create({
      user: userId,
      shop: shopId,
      rating,
      comment,
    });
    return res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: "Failed to add review" });
  }
});

server.get("/getproductbyId/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("product:", id);
  try {
    const product = await productData.findById(id);
    console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

// rate product by user
server.patch("/rateProduct/:productId", async (req, res) => {
  const { productId } = req.params;
  const { rating } = req.body; // rating and userId should be provided in the request body
// console.log(rating);
// console.log(productId);


  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  try {
    // Find the product by ID
    const product = await productData.findById(productId)

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Calculate new average rating
    const newTotalRatings = product.rating.totalRatings + 1;
    const newAverageRating =
      (product.rating.averageRating * product.rating.totalRatings + rating) /
      newTotalRatings;

    // Update the product rating
    product.rating.averageRating = newAverageRating;
    product.rating.totalRatings = newTotalRatings;

    // Save the updated product
    await product.save();

    res
      .status(200)
      .json({
        message: "Rating submitted successfully.",
        rating: product.rating,
      });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


// get productbyshop
// Route to get all products by a specific shop ID
server.get("/getProductsByShop/:shopId", async (req, res) => {
  const  shopId  = req.params.shopId;
console.log('sshop',shopId);

  try {
    // Find products that belong to the specified shopId
    const products = await productData.find({ productShopId: shopId })
console.log('prodddduct',products);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this shop" });
    }
    const shop= await shopData.find({commonKey:shopId})
    console.log(shop);
    
    res.status(200).json({products,shopdata:shop});
  } catch (error) {
    console.error("Error fetching products by shop:", error);
    res.status(500).json({ message: "Error fetching products by shop", error });
  }
});



// ----------------------
// Endpoint to submit a review for a shop
server.post("/submitShopReview/:shopId", async (req, res) => {
  const { shopId } = req.params;
  // console.log(shopId);
  
  const { user, rating, comment } = req.body;
console.log(user);

  // Validate input
  if (!user || !rating || !comment) {
    return res.status(400).json({ error: "User, rating, and comment are required." });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  // Validate shopId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: "Invalid Shop ID." });
  }

  try {
    // Check if shop exists
    const shop = await shopData.findOne({ commonKey: shopId });
    if (!shop) {
      return res.status(404).json({ error: "Shop not found." });
    }

    // Create and save the new review
    const review = new reviewData({ user, shop: shopId, rating, comment });
    await review.save();

    // Update shop's average rating and total ratings
    const newTotalRatings = (shop.totalRatings || 0) + 1;
    const newAverageRating =
      ((shop.averageRating || 0) * (shop.totalRatings || 0) + rating) / newTotalRatings;

    shop.averageRating = newAverageRating;
    shop.totalRatings = newTotalRatings;
    await shop.save();

    res.status(201).json({
      message: "Review submitted successfully.",
      review,
      updatedShopRating: { averageRating: shop.averageRating, totalRatings: shop.totalRatings },
    });
  } catch (error) {
    console.error("Error submitting review:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});


// ----
// server.get("/getShopReviews/:shopId", async (req, res) => {
//   const { shopId } = req.params;

//   try {
//     // Check if the shop exists
//     const shop = await shopData.findOne({ commonKey: shopId }); // Replace `commonKey` with your actual field name
//     if (!shop) {
//       return res.status(404).json({ error: "Shop not found." });
//     }

//     // Fetch reviews for the shop
//     const reviews = await reviewData.find({ shop: shopId }).sort({ createdAt: -1 }); // Sort by creation date, latest first

//     // Return the reviews
//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error("Error fetching reviews:", error.message);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

// complaint post by server
server.post('/submitComplaint', async (req, res) => {
  const { shopId, userId, complaintText } = req.body;

  try {
    const complaint = new complaintData({ shopId, userId, complaintText });
    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully.', complaint });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ message: 'Error submitting complaint.' });
  }
});
server.get("/getUserComplaints", async (req, res) => {
  const { userId, shopId } = req.query;
  console.log("User ID:", userId);
  console.log("Shop ID:", shopId);
  
  

  if (!userId || !shopId) {
    return res.status(400).json({ error: "userId and shopId are required" });
  }

  try {
    // Find complaints where both userId and shopId match
    const complaints = await complaintData.find({ userId, shopId }).sort({ dateSubmitted: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});
// view shop complaints
server.get("/getShopComplaints", async (req, res) => {
  const { shopId } = req.query;

  if (!shopId) {
    return res.status(400).json({ error: "shopId is required" });
  }

  try {
    const complaints = await complaintData.find({ shopId }).populate("userId", "userFullname userEmail").sort({ dateSubmitted: -1 });
    res.json(complaints);
    console.log(complaints);
    
  } catch (error) {
    console.error("Error fetching shop complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// replay 
server.post("/reply", async (req, res) => {
  const { complaintId, replyText } = req.body;

  if (!complaintId || !replyText) {
    return res.status(400).json({ error: "complaintId and replyText are required" });
  }

  try {
    const complaint = await complaintData.findByIdAndUpdate(
      complaintId,
      { reply: { text: replyText, dateReplied: new Date() } },
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ error: "Failed to add reply" });
  }
});

server.get("/getShopReviews/:shopId", async (req, res) => {
  const { shopId } = req.params; // Extract shopId from the request parameters
  console.log(shopId);

  try {
    // Fetch reviews for the shop, sorted by creation date (most recent first)
    const reviews = await reviewData
      .find({ shop: shopId }) // Filters reviews based on the shop ID
      .populate("user", "userFullname userEmail") // Populates user details from user collection
      .sort({ createdAt: -1 }); // Sorts reviews by most recent first

    console.log("review", reviews); // Logs reviews for debugging

    // Return the reviews as JSON response
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message); // Logs the error for debugging
    res.status(500).json({ error: "Internal server error." }); // Returns error response
  }
});




server.post('/registerWorker', upload.single('workerImage'), async (req, res) => {
  const { workerName, jobTitle, skills, email, phone, password } = req.body;
  const workerImage = req.file ? req.file.filename : null;  // If an image is provided, store its filename

  try {
    // Check if email already exists in loginData
    const existingWorker = await loginData.findOne({ username: email });
    if (existingWorker) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Login document
    const newLogin = new loginData({
      username: email,
      password: hashedPassword,
      role: 'worker',  // Assuming role is worker
    });

    // Save the Login document
    const savedLogin = await newLogin.save();

    // Create a new Worker document and link to the Login document
    const newUser = new workerData({
      commonKey: savedLogin._id,  // Link worker with login document
      workerName,
      jobTitle,
      skills,
      email,
      phone,
      workerImage,
    });

    // Save the Worker document
    const savedWorker = await newUser.save();

    return res.status(201).json({ message: 'Worker registered successfully', worker: savedWorker });
  } catch (error) {
    console.error('Error registering worker:', error);
    return res.status(500).json({ message: 'Failed to register worker' });
  }
});


// get workers for admin
// Add this to your existing backend code (server.js or appropriate file)

server.get('/getAllWorkers', async (req, res) => {
  try {
    const workers = await workerData.find().populate('commonKey'); // Correct approach
    console.log(workers);
    res.status(200).json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Failed to fetch workers' });
  }
});



// worker home page 

server.get('/getworker/:id', async (req, res) => {
  const commonKey = req.params.id; // Use the correct route parameter name
  console.log('Worker Common Key:', commonKey);

  try {
    const worker = await workerData.findOne({ commonKey });
    console.log('Worker:', worker);
    res.status(200).json(worker);
  } catch (error) {
    console.error('Error fetching worker:', error);
    res.status(500).json({ message: 'Failed to fetch worker' });
  }
});
