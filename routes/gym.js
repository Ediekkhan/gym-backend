const express = require('express');
const router = express.Router();
const Gym = require('../models/gym');
const authenticateToken = require('../middleware/authMiddleware');
const gymController = require('../controllers/gymController');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied, super_admin only' });
  }
  next();
};

router.get('/', authenticateToken, gymController.getAllGyms);
router.get('/:id', authenticateToken, gymController.getGymById);
router.post('/', authenticateToken, isAdmin, gymController.createGym);
router.put('/:id', authenticateToken, isAdmin, gymController.updateGym);
router.delete('/:id', authenticateToken, isAdmin, gymController.deleteGym);

module.exports = router;
