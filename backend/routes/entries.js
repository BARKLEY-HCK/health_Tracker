const express = require('express');
const { createEntry, getEntries, getEntry } = require('../controllers/entryController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .post(protect, createEntry)
  .get(protect, getEntries);

router.route('/:id')
  .get(protect, getEntry);

module.exports = router;