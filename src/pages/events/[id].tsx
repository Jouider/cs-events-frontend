import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  Share,
  Favorite,
  ConfirmationNumber,
  Groups,
  CheckCircle,
} from '@mui/icons-material';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useBookings from '@modules/bookings/hooks/api/useBookings';
import { useSnackbar } from 'notistack';
import Routes from '@common/defs/routes';
// Add these interfaces at the top of the file
interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  onViewTickets: () => void;
}

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  event: Event;
  maxSpots?: number;
  availableSpots: number;
}

const StyledHeroImage = styled(CardMedia)(() => ({
  height: '600px',
  position: 'relative',
  borderRadius: '0',
  filter: 'brightness(0.7)',
  backgroundPosition: 'center center',
  transition: 'all 0.3s ease',
}));

const StyledEventCard = styled(Box)(() => ({
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
        fontWeight: 700,
      }}
    >
      {available}
    </Typography>
    <Typography
      variant="h4"
      color="primary"
      sx={{
        fontWeight: 700,
      }}
    >
      / {capacity}
    </Typography>
  </Box>
);

const SuccessModal = ({ open, onClose, onViewTickets }: SuccessModalProps) => {
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
            Your reservation has been successfully completed. You can view your tickets in the
            bookings section.
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
}: ReservationModalProps) => {
  const [spots, setSpots] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { createOne } = useBookings();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { user } = useAuth();

  const handleSpotChange = (
    _event: React.SyntheticEvent | Event,
    newValue: number | number[],
    _activeThumb: number
  ) => {
    setSpots(newValue as number);
  };

  const handleReservation = async () => {
    try {
      setLoading(true);
      await createOne({
        eventId: event.id,
        spots,
        userId: user!.id,
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
      <Dialog open={open} onClose={() => !loading && onClose()} maxWidth="sm" fullWidth>
        <DialogTitle>Reserve Spots for {event.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography gutterBottom>Select number of spots (Maximum {maxAllowedSpots})</Typography>
            <Slider
              value={spots}
              onChange={handleSpotChange}
              min={1}
              max={maxAllowedSpots}
              marks
              valueLabelDisplay="auto"
              sx={{ mt: 4 }}
              disabled={loading}
              aria-label="Number of spots"
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
                  <Typography variant="body2" color="text.secondary">
                    Event:
                  </Typography>
                  <Typography variant="body2">{event.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Date:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(event.startDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Spots:
                  </Typography>
                  <Typography variant="body2">{spots}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} disabled={loading} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleReservation}
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              minWidth: 120,
              position: 'relative',
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-12px',
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

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return {
      date: date.format('dddd, MMMM D, YYYY'),
      time: date.format('h:mm A'),
    };
  };
  const eventDateTime = formatDate(event?.startDate || '');

  const getEventStatus = () => {
    if (isEventPassed) {
      return {
        label: 'Event Ended',
        color: 'grey.500',
        disabled: true,
        message: 'This event has already ended',
      };
    }
    if (isEventSoldOut) {
      return {
        label: 'Sold Out',
        color: 'error.main',
        disabled: true,
        message: 'No spots available',
      };
    }
    return {
      label: 'Reserve Now',
      color: 'primary.main',
      disabled: false,
      message: null,
    };
  };

  useEffect(() => {
    if (id && events) {
      const found = events.find((ev) => ev.id.toString() === id);
      setEvent(found || null);
    }
  }, [id, events]);

  const isEventPassed = dayjs(event?.startDate).isBefore(dayjs());
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

  const getButtonBackgroundColor = () => {
    if (isEventPassed || isEventSoldOut) {
      return 'grey.300';
    }
    return 'primary.main';
  };

  const getStatusText = () => {
    if (isEventPassed) {
      return 'This event has ended';
    }
    if (isEventSoldOut) {
      return 'Sold Out';
    }
    if ((event.availableSpots ?? 0) < 10) {
      return `Only ${event.availableSpots ?? 0} spots left!`;
    }
    return `${event.availableSpots ?? 0} spots available`;
  };

  // Add this helper function before the return statement
  const getStatusColor = () => {
    if (isEventPassed) {
      return 'grey.500';
    }
    if (isEventSoldOut) {
      return 'error.main';
    }
    return 'success.main';
  };

  return (
    <Box>
      <StyledHeroImage image={event.coverImageUrl} title={event.name} sx={{ borderRadius: 2 }} />
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
                      Hosted By Abdellah Jouider
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
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center', // Centrer le contenu
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                          display: 'block',
                          mb: 1,
                        }}
                      >
                        Date
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {' '}
                        {/* Centrer les éléments */}
                        <CalendarToday
                          sx={{
                            color: 'primary.main',
                            mr: 1.5,
                            fontSize: '1.25rem',
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {eventDateTime.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center', // Centrer le contenu
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                          display: 'block',
                          mb: 1,
                        }}
                      >
                        Time
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {' '}
                        {/* Centrer les éléments */}
                        <AccessTime
                          sx={{
                            color: 'primary.main',
                            mr: 1.5,
                            fontSize: '1.25rem',
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {eventDateTime.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center', // Centrer le contenu
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                          display: 'block',
                          mb: 1,
                        }}
                      >
                        Location
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {' '}
                        {/* Centrer les éléments */}
                        <LocationOn
                          sx={{
                            color: 'primary.main',
                            mr: 1.5,
                            fontSize: '1.25rem',
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {String(event.location)}
                        </Typography>
                      </Box>
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
                {/* <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {event.location}
                  </Typography>
                </Box> */}

                <Box sx={{ mt: 6 }}>
                  {/* <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                    Categories
                  </Typography> */}
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
                  {isEventPassed ? 'Event Ended' : 'Get Tickets'}
                </Typography>

                <Box
                  sx={{
                    mb: 3,
                    p: 3,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    position: 'relative',
                    opacity: isEventPassed ? 0.7 : 1,
                  }}
                >
                  {(isEventSoldOut || isEventPassed) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: isEventPassed ? 'grey.500' : 'error.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {isEventPassed ? 'Event Ended' : 'Sold Out'}
                    </Box>
                  )}

                  <Typography variant="h6" fontWeight="600">
                    Standard
                  </Typography>

                  <AvailabilityDisplay
                    available={event.availableSpots ?? 0}
                    capacity={event.capacity ?? 0}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: getStatusColor(),
                      fontWeight: 600,
                    }}
                  >
                    {getStatusText()}
                  </Typography>

                  {(!user?.id || user.id !== event.organizerId) && (
                    <>
                      <Button
                        variant="contained"
                        fullWidth
                        disabled={isEventSoldOut || isEventPassed}
                        onClick={handleReserveClick}
                        sx={{
                          mt: 2,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          backgroundColor: getButtonBackgroundColor(),
                          '&:hover': {
                            backgroundColor: getButtonBackgroundColor(),
                          },
                        }}
                      >
                        {getEventStatus().label}
                      </Button>
                      {isEventPassed && (
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            textAlign: 'center',
                            mt: 1,
                            color: 'text.secondary',
                          }}
                        >
                          This event took place on {dayjs(event.startDate).format('MMMM D, YYYY')}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <IconButton
                    onClick={() => setLiked(!liked)}
                    disabled={isEventPassed}
                    sx={{ opacity: isEventPassed ? 0.5 : 1 }}
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton
                    sx={{
                      '&:hover': { color: '#1976d2' },
                      opacity: isEventPassed ? 0.5 : 1,
                    }}
                  >
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
        availableSpots={event.availableSpots ?? 0}
      />
    </Box>
  );
};

export default EventDetails;
