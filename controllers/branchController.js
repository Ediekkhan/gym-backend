// controllers/branchController.js
const Branch = require('../models/branch');

// Get all branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get branch by ID
const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create branch
const createBranch = async (req, res) => {
  try {
    const { name, address, phone, gymId } = req.body;
    const newBranch = await Branch.create({ name, address, phone, gymId });
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update branch
const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });

    const { name, address, phone } = req.body;
    await branch.update({ name, address, phone });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete branch
const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });

    await branch.destroy();
    res.json({ message: 'Branch deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
