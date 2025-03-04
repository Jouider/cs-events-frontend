import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Event } from '@modules/events/defs/types';

interface EventCardProps {
  event: Event;
  onClick?: () => void; // callback for handling click on the card
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.02)' },
        // Hover effect for the CardMedia overlay and title underline
        '&:hover .cardMediaOverlay': {
          opacity: 1,
        },
        '&:hover .cardTitle': {
          textDecoration: 'underline',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={event.coverImageUrl}
          alt={event.coverImage}
        />
        <Box
          className="cardMediaOverlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255,255,255,0.5)',
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {event.location.toString()}
        </Typography>
        <Typography variant="h5" component="div" className="cardTitle">
          {event.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          HOSTED BY : abdellah jouider
        </Typography>
        <Typography variant="body2">{new Date(event.startDate).toLocaleDateString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
