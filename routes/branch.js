const express = require('express');
const router = express.Router();
const Branch = require('../models/branch');
const Gym = require('../models/gym');
const authenticateToken = require('../middleware/authMiddleware');

// Middleware to check admin or branch admin access
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Get all branches for a gym
router.get('/gym/:gymId', authenticateToken, async (req, res) => {
  const { gymId } = req.params;
  try {
    const branches = await Branch.findAll({ where: { gymId } });
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a branch under a gym (Admin only)
router.post('/gym/:gymId', authenticateToken, isAdmin, async (req, res) => {
  const { gymId } = req.params;
  const { name, location } = req.body;
  try {
    // Verify gym exists
    const gym = await Gym.findByPk(gymId);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });

    const branch = await Branch.create({ name, location, gymId });
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get branch details
router.get('/:branchId', authenticateToken, async (req, res) => {
  const { branchId } = req.params;
  try {
    const branch = await Branch.findByPk(branchId);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update branch (Admin only)
router.put('/:branchId', authenticateToken, isAdmin, async (req, res) => {
  const { branchId } = req.params;
  const { name, location } = req.body;
  try {
    const branch = await Branch.findByPk(branchId);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });

    branch.name = name || branch.name;
    branch.location = location || branch.location;
    await branch.save();

    res.json(branch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete branch (Admin only)
router.delete('/:branchId', authenticateToken, isAdmin, async (req, res) => {
  const { branchId } = req.params;
  try {
    const branch = await Branch.findByPk(branchId);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });

    await branch.destroy();
    res.json({ message: 'Branch deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
