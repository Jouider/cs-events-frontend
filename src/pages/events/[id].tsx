import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { borderRadius, styled } from '@mui/system';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  IconButton,
  Chip,
  Paper,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Slider,
  InputAdornment,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  Share,
  Favorite,
  ConfirmationNumber,
  Groups,
} from '@mui/icons-material';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useBookings from '@modules/bookings/hooks/api/useBookings';
import { useSnackbar } from 'notistack';
import Routes from '@common/defs/routes';
import { CheckCircle } from '@mui/icons-material';

const StyledHeroImage = styled(CardMedia)(({ theme }) => ({
  height: '600px',
  position: 'relative',
  borderRadius: '0',
  filter: 'brightness(0.7)',
  backgroundPosition: 'center center',
  transition: 'all 0.3s ease',
}));

const StyledEventCard = styled(Box)(({ theme }) => ({
  marginTop: '-150px',
  position: 'relative',
  zIndex: 1,
}));

const StickyTicketCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: 24,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
}));

const AvailabilityDisplay = ({ available, capacity }: { available: number; capacity: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
    <Typography
      variant="h4"
      sx={{
        color: 'text.secondary',
        fontWeight: 700
      }}
    >
      {available}
    </Typography>
    <Typography
      variant="h4"
      color="primary"
      sx={{
        fontWeight: 700
      }}
    >
      / {capacity}
                  </Typography>
                </Box>
  );

const SuccessModal = ({ open, onClose, onViewTickets }) => {
  return (
    <Dialog 
      open={open} 
      maxWidth="sm" 
                      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          textAlign: 'center',
          p: 2,
                      },
                      }}
                    >
      <DialogContent>
        <Box sx={{ py: 3 }}>
          <Box
                    sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,
            }}
          >
            <CheckCircle
              sx={{
                fontSize: 40,
                color: 'success.main',
              }}
      />
    </Box>

          <Typography variant="h5" gutterBottom fontWeight="bold">
            Booking Confirmed!
          </Typography>
          
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Your reservation has been successfully completed. You can view your tickets in the bookings section.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={onViewTickets}
              startIcon={<ConfirmationNumber />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
              }}
            >
              View My Tickets
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ReservationModal = ({ 
  open, 
  onClose, 
  event, 
  maxSpots = 10,
  availableSpots,
}) => {
  const [spots, setSpots] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { createOne } = useBookings();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleSpotChange = (event: Event, newValue: number | number[]) => {
    setSpots(newValue as number);
  };

  const handleReservation = async () => {
    try {
      setLoading(true);
      await createOne({
        eventId: event.id,
        spots: spots,
      });
      setShowSuccess(true);
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to make reservation', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleViewTickets = () => {
    setShowSuccess(false);
    router.push(Routes.Bookings.ReadAll);
  };

  const maxAllowedSpots = Math.min(maxSpots, availableSpots);

  return (
    <>
      <Dialog 
        open={open} 
        onClose={() => !loading && onClose()}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Reserve Spots for {event.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography gutterBottom>
              Select number of spots (Maximum {maxAllowedSpots})
            </Typography>
            <Slider
              value={spots}
              onChange={handleSpotChange}
              min={1}
              max={maxAllowedSpots}
              marks
              valueLabelDisplay="auto"
              sx={{ mt: 4 }}
              disabled={loading}
            />
            <TextField
              fullWidth
              value={spots}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= maxAllowedSpots) {
                  setSpots(value);
                }
              }}
              type="number"
              disabled={loading}
              InputProps={{
                inputProps: { min: 1, max: maxAllowedSpots },
                startAdornment: (
                  <InputAdornment position="start">
                    <Groups />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 3 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              You are about to reserve {spots} spot{spots > 1 ? 's' : ''} for this event
            </Typography>

            <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Reservation Summary:
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Event:</Typography>
                  <Typography variant="body2">{event.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Date:</Typography>
                  <Typography variant="body2">
                    {new Date(event.startDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Spots:</Typography>
                  <Typography variant="body2">{spots}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={onClose}
            disabled={loading}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReservation}
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              minWidth: 120,
              position: 'relative'
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-12px'
                  }}
                />
                <span style={{ opacity: 0 }}>Confirm</span>
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onViewTickets={handleViewTickets}
      />
    </>
  );
};

const EventDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { items: events } = useEvents({ fetchItems: true });
  const [event, setEvent] = useState<Event | null>(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id && events) {
      const found = events.find((ev) => ev.id.toString() === id);
      setEvent(found || null);
    }
  }, [id, events]);

  const isEventSoldOut = event?.availableSpots === 0;

  if (!event) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleReserveClick = () => {
    if (!user) {
      router.push({
        pathname: Routes.Auth.Login,
        query: { returnUrl: router.asPath },
      });
      return;
    }
    setReservationModalOpen(true);
  };

  return (
    <Box>
      <StyledHeroImage image={event.coverImageUrl} title={event.name} alt="Event banner" sx={{borderRadius: 2 }} />
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <StyledEventCard>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 4, borderRadius: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                    pb: 3,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {event.organiserName}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1.2,
                    color: '#1a237e',
                  }}
                >
                  {event.name}
                </Typography>

                <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                  <Box>
                    <Typography variant="overline" color="primary">
                      Date
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="subtitle1">{event.startDate}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="primary">
                      Time
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="subtitle1">{event.startDate}</Typography>
                    </Box>
                  </Box>
                </Stack>

                <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="h5" gutterBottom fontWeight="600">
                    About this event
                  </Typography>
                  <Typography variant="body1" lineHeight={1.8}>
                    {event.description}
                  </Typography>
                </Paper>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {event.location}
                  </Typography>
                </Box>

                <Box sx={{ mt: 6 }}>
                  <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                    Categories
                  </Typography>
                  {/* <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {event.categories.map((category: string, index: number) => (
                      <Chip
                        key={index}
                        label={category}
                        sx={{
                          borderRadius: 2,
                          py: 2.5,
                          px: 1,
                          bgcolor: '#e3f2fd',
                          color: '#1976d2',
                          fontSize: '1rem',
                          '&:hover': { bgcolor: '#bbdefb' },
                        }}
                      />
                    ))}
                  </Box> */}
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <StickyTicketCard>
                <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                  <ConfirmationNumber sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Get Tickets
                </Typography>

                <Box
                  sx={{
                    mb: 3,
                    p: 3,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    position: 'relative',
                  }}
                >
                  {isEventSoldOut && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'error.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      Sold Out
                    </Box>
                  )}

                  <Typography variant="h6" fontWeight="600">
                    Standard
                  </Typography>

                  <AvailabilityDisplay
                    available={event.availableSpots}
                    capacity={event.capacity}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: isEventSoldOut
                        ? 'error.main'
                        : event.availableSpots < 10
                        ? 'warning.main'
                        : 'success.main',
                      fontWeight: 600,
                    }}
                  >
                    {isEventSoldOut
                      ? 'Sold Out'
                      : event.availableSpots < 10
                      ? `Only ${event.availableSpots} spots left!`
                      : `${event.availableSpots} spots available`}
                  </Typography>
                  {(!user?.id || user.id !== event.organizerId) && (
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={isEventSoldOut}
                      onClick={handleReserveClick}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        backgroundColor: isEventSoldOut ? 'grey.300' : 'primary.main',
                        '&:hover': {
                          backgroundColor: isEventSoldOut ? 'grey.300' : 'primary.dark',
                        },
                      }}
                    >
                      {isEventSoldOut ? 'Sold Out' : 'Reserve Now'}
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <IconButton
                    onClick={() => setLiked(!liked)}
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton sx={{ '&:hover': { color: '#1976d2' } }}>
                    <Share />
                  </IconButton>
                </Box>
              </StickyTicketCard>
            </Grid>
          </Grid>
        </StyledEventCard>
      </Container>

      <ReservationModal
        open={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        event={event}
        maxSpots={10}
        availableSpots={event.availableSpots}
      />
    </Box>
  );
};

export default EventDetails;
