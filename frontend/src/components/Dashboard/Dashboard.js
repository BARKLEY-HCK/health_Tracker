import React, { useState, useEffect } from 'react';
import { entriesAPI } from '../../services/api';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import HealthCharts from '../Charts/HealthCharts';

const Dashboard = ({ user, onLogout }) => {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('add');

  const loadEntries = async () => {
    try {
      const response = await entriesAPI.getAll();
      setEntries(response.data);
    } catch (error) {
      console.error('Failed to load entries:', error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Track your health journey</p>
        </div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Entry
        </button>
        <button 
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button 
          className={activeTab === 'insights' ? 'active' : ''}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'add' && (
          <EntryForm onEntryAdded={loadEntries} />
        )}
        
        {activeTab === 'history' && (
          <EntryList entries={entries} />
        )}
        
        {activeTab === 'insights' && (
          <HealthCharts entries={entries} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;