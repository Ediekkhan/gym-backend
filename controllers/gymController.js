// controllers/gymController.js
const Gym  = require('../models/gym');

// Get all gyms
const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll();
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get gym by ID
const getGymById = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });
    res.json(gym);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create gym
const createGym = async (req, res) => {
  try {
    const { name, address, description } = req.body;
    const newGym = await Gym.create({ name, address, description });
    res.status(201).json(newGym);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update gym
const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });

    const { name, address, description } = req.body;
    await gym.update({ name, address, description });
    res.json(gym);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete gym
const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByPk(req.params.id);
    if (!gym) return res.status(404).json({ message: 'Gym not found' });

    await gym.destroy();
    res.json({ message: 'Gym deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export them as named exports
module.exports = {
  getAllGyms,
  getGymById,
  createGym,
  updateGym,
  deleteGym,
};
