const express = require('express');
const router = express.Router();
const Gym = require('../models/gym');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

router.get('/', authenticateToken, isAdmin, async (req, res) => {
  const gyms = await Gym.findAll();
  res.json(gyms);
});

router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const { name, description } = req.body;
  try {
    const gym = await Gym.create({ name, description });
    res.status(201).json(gym);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
