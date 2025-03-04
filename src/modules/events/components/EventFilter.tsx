import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

export type FilterOption = 'past' | 'today' | 'tomorrow' | 'this-week' | 'this-month' | 'all';

interface EventFilterProps {
  filter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ filter, onFilterChange }) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newFilter: FilterOption) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <Box sx={{ mb: 3, mt: 10 }}>
      <ToggleButtonGroup value={filter} exclusive onChange={handleChange} aria-label="event filter">
        <ToggleButton value="all" aria-label="all events">
          All
        </ToggleButton>
        <ToggleButton value="past" aria-label="past events">
          Past
        </ToggleButton>
        <ToggleButton value="today" aria-label="today's events">
          Today
        </ToggleButton>
        <ToggleButton value="tomorrow" aria-label="tomorrow's events">
          Tomorrow
        </ToggleButton>
        <ToggleButton value="this-week" aria-label="this week's events">
          This Week
        </ToggleButton>
        <ToggleButton value="this-month" aria-label="this month's events">
          This Month
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default EventFilter;
