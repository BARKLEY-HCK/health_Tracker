import React, { useState } from 'react';
import { entriesAPI } from '../../services/api';

const EntryForm = ({ onEntryAdded }) => {
  const [formData, setFormData] = useState({
    symptoms: [],
    mood: 'good',
    sleepHours: 7,
    exercise: 'moderate',
    notes: '',
    currentSymptom: ''
  });

  const addSymptom = () => {
    if (formData.currentSymptom && !formData.symptoms.includes(formData.currentSymptom)) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, formData.currentSymptom],
        currentSymptom: ''
      });
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.filter(symptom => symptom !== symptomToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await entriesAPI.create(formData);
      setFormData({
        symptoms: [],
        mood: 'good',
        sleepHours: 7,
        exercise: 'moderate',
        notes: '',
        currentSymptom: ''
      });
      onEntryAdded();
      alert('Health entry added successfully!');
    } catch (error) {
      alert('Failed to add entry: ' + error.message);
    }
  };

  return (
    <div className="entry-form">
      <h3>Add Health Entry</h3>
      <form onSubmit={handleSubmit}>
        {/* Symptoms */}
        <div className="form-group">
          <label>Symptoms:</label>
          <div className="symptom-input">
            <input
              type="text"
              value={formData.currentSymptom}
              onChange={(e) => setFormData({...formData, currentSymptom: e.target.value})}
              placeholder="Add a symptom"
            />
            <button type="button" onClick={addSymptom}>Add</button>
          </div>
          <div className="symptoms-list">
            {formData.symptoms.map((symptom, index) => (
              <span key={index} className="symptom-tag">
                {symptom}
                <button type="button" onClick={() => removeSymptom(symptom)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div className="form-group">
          <label>Mood:</label>
          <select 
            value={formData.mood} 
            onChange={(e) => setFormData({...formData, mood: e.target.value})}
          >
            <option value="excellent">😄 Excellent</option>
            <option value="good">😊 Good</option>
            <option value="okay">😐 Okay</option>
            <option value="poor">😔 Poor</option>
            <option value="terrible">😢 Terrible</option>
          </select>
        </div>

        {/* Sleep */}
        <div className="form-group">
          <label>Sleep Hours: {formData.sleepHours}</label>
          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={formData.sleepHours}
            onChange={(e) => setFormData({...formData, sleepHours: parseFloat(e.target.value)})}
          />
        </div>

        {/* Exercise */}
        <div className="form-group">
          <label>Exercise:</label>
          <select 
            value={formData.exercise} 
            onChange={(e) => setFormData({...formData, exercise: e.target.value})}
          >
            <option value="none">None</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="intense">Intense</option>
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
            rows="3"
          />
        </div>

        <button type="submit">Save Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;