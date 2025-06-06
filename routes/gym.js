const express = require('express');
const router = express.Router();
const Gym = require('../models/gym');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied, super_admin only' });
  }
  next();
};

// GET all gyms (any logged-in user)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  const gyms = await Gym.findAll();
  res.json(gyms);
});

// GET single gym by ID
router.get('/:gymId', authenticateToken, async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.gymId);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });
    res.json(gym);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching gym' });
  }
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

// PUT update gym (admin only)
router.put('/:gymId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.gymId);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });

    const { name, description, location } = req.body;
    gym.name = name || gym.name;
    gym.description = description || gym.description;
    gym.location = location || gym.location;

    await gym.save();
    res.json(gym);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating gym' });
  }
});

// DELETE gym (admin only)
router.delete('/:gymId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.gymId);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });

    await gym.destroy();
    res.json({ message: 'Gym deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting gym' });
  }
});

module.exports = router;
