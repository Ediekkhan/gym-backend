require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const Gym = require('./models/gym');
const Branch = require('./models/branch');
const Subscription = require('./models/Subscription');
const Payment = require('./models/Payment');
const Product = require('./models/Product');
const gymRoutes = require('./routes/gym');
const branchRoutes = require('./routes/branch');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/branches', branchRoutes);

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
