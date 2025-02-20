/* events/components/partials/EventCard.tsx */
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Event } from '@modules/events/defs/types';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={event.coverImage} alt={event.title} />
      <CardContent>
        <Typography variant="h5">{event.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {event.date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {event.location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;