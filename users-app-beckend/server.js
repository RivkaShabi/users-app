const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const userSystemRoutes = require('./routes/userSystemRoutes');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration for allowed origins
const allowedOrigins = ['https://www.google.com', 'https://www.facebook.com'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow localhost and specific origins
      if (
        !origin ||
        origin.startsWith('http://localhost') ||
        origin.startsWith('https://localhost') ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS: ' + origin));
      }
    },
  })
);

// User and Auth routes
app.use('/api/users', userRoutes);
app.use('/api/auth', userSystemRoutes);

// Global error handler
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error(err));
