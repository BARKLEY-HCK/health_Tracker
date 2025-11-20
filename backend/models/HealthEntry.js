const mongoose = require('mongoose');

const healthEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  symptoms: [{
    type: String
  }],
  mood: {
    type: String,
    enum: ['excellent', 'good', 'okay', 'poor', 'terrible'],
    required: true
  },
  sleepHours: {
    type: Number,
    min: 0,
    max: 24
  },
  exercise: {
    type: String,
    enum: ['none', 'light', 'moderate', 'intense']
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthEntry', healthEntrySchema);