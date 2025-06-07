const express = require('express');
const router = express.Router();
const Branch = require('../models/branch');
const Gym = require('../models/gym');
const authenticateToken = require('../middleware/authMiddleware');
const branchController = require('../controllers/branchController');

// Middleware to check admin or branch admin access
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Get all branches for a gym
router.get('/', authenticateToken, branchController.getAllBranches);
// Get branches for a gym by id
router.get('/:id', authenticateToken, branchController.getBranchById);
// create  branches for a gym
router.post('/', authenticateToken, isAdmin, branchController.createBranch);
// update  branches for a gym
router.put('/:id', authenticateToken, isAdmin, branchController.updateBranch);
router.delete('/:id', authenticateToken, isAdmin, branchController.deleteBranch);

module.exports = router;
