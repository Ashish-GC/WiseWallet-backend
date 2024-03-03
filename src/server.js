// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import router from "./routes/index.js";

// Create an instance of Express
const app = express();

// Set up middleware
app.use(express.json());

dotenv.config();
app.use(cors());

// Define routes
app.get("/", (_, res) => {
  res.send("Hello, WealthWise!");
});

// Use routes
app.use("/api", router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connectDb();
  console.log(`Server is running on port ${port}`);
});
