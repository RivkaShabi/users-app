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

// CORS configuration
const allowedOrigins = [
  'https://www.google.com',
  'https://www.facebook.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||                                // אם אין origin (למשל curl או סקריפט מקומי)
      origin.startsWith('http://localhost') ||  // כל פורט של localhost
      origin.startsWith('https://localhost') || // אם תשתמשי ב-https
      allowedOrigins.includes(origin)           // אם ה-origin נמצא ברשימה
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  }
}));


app.use('/api/users', userRoutes);
app.use('/api/auth', userSystemRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch(err => console.error(err));
