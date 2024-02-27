// Import required modules
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

// Create an instance of Express
const app = express();

// Set up middleware
app.use(express.json());

dotenv.config();

connectDb();

// Connect to MongoDB using Mongoose
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, WealthWise!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
