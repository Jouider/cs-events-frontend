import { Grid } from '@mui/material';
import { Event } from '@modules/events/defs/types';
import EventCard from '@modules/events/components/EventCard';

// Événements statiques de test
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Event One',
    coverImage: 'https://via.placeholder.com/150',
    date: '2025-03-01',
    location: 'Paris',
  },
  {
    id: '2',
    title: 'Event Two',
    coverImage: 'https://via.placeholder.com/150',
    date: '2025-03-02',
    location: 'Lyon',
  },
  {
    id: '3',
    title: 'Event Three',
    coverImage: 'https://via.placeholder.com/150',
    date: '2025-03-03',
    location: 'Marseille',
  },
];

interface EventListProps {
  events?: Event[];
}

const EventList = ({ events = [] }: EventListProps) => {
  // Si aucun événement n'est passé en prop, utiliser les données statiques
  const displayedEvents = events.length > 0 ? events : sampleEvents;

  return (
    <Grid container spacing={3}>
      {displayedEvents.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
