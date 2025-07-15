
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');

dotenv.config();
 
console.log("MONGO_URI loaded:", process.env.MONGO_URI='mongodb+srv://nehemiahkiptoo7:KIPTOONEM@cluster0.kauwuqr.mongodb.net/manspace?retryWrites=true&w=majority&appName=Cluster0');
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// MongoDB connection
const connectDB = require('./routes/db');

connectDB();

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Basic route for health check
app.get('/', (req, res) => {
  res.json({ message: 'ManSpace API is running' });
});
