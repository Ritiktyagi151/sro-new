const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    
    credentials: true,
  })
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/navbar", require("./routes/navbarRoutes"));
app.use("/api/cms", require("./routes/cmsRoutes"));
app.use("/api/settings", require("./routes/roleRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "SRO Bearing Admin API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
