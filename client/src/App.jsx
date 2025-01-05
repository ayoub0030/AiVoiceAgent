import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Map from './components/Map/Map';
import { subscribeToEmergencies, updateEmergencyStatus } from './firebase/emergencyService';
import './App.css';

function App() {
  const [emergencies, setEmergencies] = useState([]);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  useEffect(() => {
    // Subscribe to real-time emergency updates
    const unsubscribe = subscribeToEmergencies((updatedEmergencies) => {
      setEmergencies(updatedEmergencies);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency(emergency);
  };

  const handleStatusUpdate = async (emergencyId, newStatus) => {
    try {
      await updateEmergencyStatus(emergencyId, newStatus);
    } catch (error) {
      console.error('Error updating emergency status:', error);
    }
  };

  return (
    <Box className="app-container">
      <LeftPanel 
        emergencies={emergencies}
        onEmergencySelect={handleEmergencySelect}
        onStatusUpdate={handleStatusUpdate}
      />
      <Box className="main-content">
        <Map 
          selectedEmergency={selectedEmergency}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDaM_WnVJRWVOBhMY5hqnKROP_jV_s4SNw`}
        />
      </Box>
    </Box>
  );
}

export default App;
