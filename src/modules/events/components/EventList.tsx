import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';
import EventFilter, { FilterOption } from './EventFilter';

const EventList: React.FC = () => {
  const router = useRouter();
  const { items: events } = useEvents({ fetchItems: true });
  const [filterText, setFilterText] = useState('');
  const [dateFilter, setDateFilter] = useState<FilterOption>('all');

  if (!events) {
    return (
      <Box>
        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <EventCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Filter by text first
  const filteredByText = events.filter((event: Event) =>
    event.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Apply date filtering based on the selected date filter
  const now = dayjs();
  const filteredEvents = filteredByText.filter((event: Event) => {
    const start = dayjs(event.startDate);
    switch (dateFilter) {
      case 'past':
        return start.isBefore(now, 'day');
      case 'today':
        return start.isSame(now, 'day');
      case 'tomorrow':
        return start.isSame(now.add(1, 'day'), 'day');
      case 'this-week':
        return start.isAfter(now.startOf('week')) && start.isBefore(now.endOf('week'));
      case 'this-month':
        return start.isSame(now, 'month');
      default:
        return true;
    }
  });

  return (
    <Box>
      {/* Filter components */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Filter events"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <EventFilter filter={dateFilter} onFilterChange={setDateFilter} />
      </Box>

      {filteredEvents.length === 0 ? (
        <Typography>No events match your filter criteria.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event: Event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <EventCard
                event={event}
                onClick={() => router.push(`/events/${event.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EventList;
