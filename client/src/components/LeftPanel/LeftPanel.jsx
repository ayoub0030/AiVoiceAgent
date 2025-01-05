import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  Paper,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './LeftPanel.css';

const LeftPanel = ({ emergencies, onEmergencySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmergencies = emergencies.filter(emergency =>
    emergency.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper className="left-panel">
      <Typography variant="h6" className="panel-title">
        Emergencies
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Filter calls..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        className="search-field"
      />

      <Box className="emergency-stats">
        <Box className="stat-item">
          <Typography variant="h4">{emergencies.length}</Typography>
          <Typography variant="body2">Total</Typography>
        </Box>
        <Box className="stat-item">
          <Typography variant="h4">
            {emergencies.filter(e => e.status === 'CRITICAL').length}
          </Typography>
          <Typography variant="body2">Critical</Typography>
        </Box>
        <Box className="stat-item">
          <Typography variant="h4">
            {emergencies.filter(e => e.status === 'RESOLVED').length}
          </Typography>
          <Typography variant="body2">Resolved</Typography>
        </Box>
      </Box>

      <List className="emergency-list">
        {filteredEmergencies.map((emergency) => (
          <ListItem
            key={emergency.id}
            button
            onClick={() => onEmergencySelect(emergency)}
            className={`emergency-item ${emergency.status.toLowerCase()}`}
          >
            {emergency.status === 'CRITICAL' && (
              <ErrorOutlineIcon color="error" className="critical-icon" />
            )}
            <ListItemText
              primary={emergency.title}
              secondary={emergency.timestamp}
            />
            {emergency.status === 'CRITICAL' && (
              <Chip
                label="CRITICAL"
                color="error"
                size="small"
                className="status-chip"
              />
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default LeftPanel;
