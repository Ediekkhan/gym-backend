require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const Gym = require('./models/Gym');
const Subscription = require('./models/Subscription');
const Payment = require('./models/Payment');
const Product = require('./models/Product');
const Branch = require('./models/Branch');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Gym Management API is up!');
});

// Sync database and start server
const PORT = process.env.PORT || 5050;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => console.error('Database error:', err));
