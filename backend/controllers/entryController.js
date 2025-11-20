const HealthEntry = require('../models/HealthEntry');

// Create new health entry
const createEntry = async (req, res) => {
  try {
    const entry = new HealthEntry({
      ...req.body,
      user: req.user._id
    });

    const createdEntry = await entry.save();
    res.status(201).json(createdEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all entries for user
const getEntries = async (req, res) => {
  try {
    const entries = await HealthEntry.find({ user: req.user._id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single entry
const getEntry = async (req, res) => {
  try {
    const entry = await HealthEntry.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createEntry, getEntries, getEntry };