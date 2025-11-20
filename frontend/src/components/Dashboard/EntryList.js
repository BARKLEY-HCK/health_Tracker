import React from 'react';

const EntryList = ({ entries }) => {
  const getMoodEmoji = (mood) => {
    const emojis = {
      excellent: '😄',
      good: '😊',
      okay: '😐',
      poor: '😔',
      terrible: '😢'
    };
    return emojis[mood] || '😐';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="entry-list">
      <h3>Recent Entries</h3>
      {entries.length === 0 ? (
        <p>No entries yet. Add your first health entry above!</p>
      ) : (
        entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <div className="entry-header">
              <span className="entry-date">{formatDate(entry.date)}</span>
              <span className="entry-mood">
                {getMoodEmoji(entry.mood)} {entry.mood}
              </span>
            </div>
            <div className="entry-details">
              <p><strong>Sleep:</strong> {entry.sleepHours} hours</p>
              <p><strong>Exercise:</strong> {entry.exercise}</p>
              {entry.symptoms.length > 0 && (
                <p><strong>Symptoms:</strong> {entry.symptoms.join(', ')}</p>
              )}
              {entry.notes && (
                <p><strong>Notes:</strong> {entry.notes}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EntryList;