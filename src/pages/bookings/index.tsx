import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  Grid,
  Chip,
  IconButton,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from '@mui/material';
import {
  ConfirmationNumber,
  Event,
  AccessTime,
  LocationOn,
  Delete,
  QrCode2,
  CalendarMonth,
  ArrowForward,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import useBookings from '@modules/bookings/hooks/api/useBookings';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import Link from 'next/link';
import ConfirmDialog from '@common/components/lib/feedbacks/ConfirmDialog';
import LoadingScreen from '@common/components/lib/feedbacks/LoadingScreen';
import useProgressBar from '@common/hooks/useProgressBar';
import BookingCardSkeleton from '@modules/bookings/components/BookingCardSkeleton';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';

const StyledCard = styled(Card)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: '#ffffff',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
    borderColor: theme.palette.primary.main,
  },
}));

const EventImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

const DateChip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const BookingsPage = () => {
  const { items: bookings, deleteOne} = useBookings({ fetchItems: true });
  const { enqueueSnackbar } = useSnackbar();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
  const { start, stop } = useProgressBar();

  const handleDeleteClick = (bookingId: number) => {
    setBookingToDelete(bookingId);
  };

  const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return;

    try {
      start();
      await deleteOne(bookingToDelete);
      enqueueSnackbar('Booking cancelled successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to cancel booking', { variant: 'error' });
    } finally {
      stop();
      setBookingToDelete(null);
    }
  };

  if (!bookings) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6 }}>
          {/* <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={200} height={24} /> */}
        </Box>
      <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <BookingCardSkeleton />
            </Grid>
        ))}
      </Grid>
    </Container>
  );
  }

  if (!bookings?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderRadius: 4,
          border: '1px dashed rgba(0,0,0,0.1)'
        }}>
          <ConfirmationNumber sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No Bookings Found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You haven't made any bookings yet.
          </Typography>
          <Button 
            variant="contained" 
            href="/events"
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Browse Events
          </Button>
        </Box>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          My Bookings
        </Typography>
        <Typography color="text.secondary">
          Manage your event bookings and tickets
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} lg={4} key={booking.id}>
            <StyledCard>
              <Box sx={{ position: 'relative' }}>
                <EventImage
                  src={booking.event.coverImageUrl || "https://source.unsplash.com/random/400x200/?event"}
                  alt={booking.event.name}
                />
                <DateChip>
                  <CalendarMonth sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {dayjs(booking.event.startDate).format('MMM D')}
                  </Typography>
                </DateChip>
              </Box>

              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.3,
                    height: '2.6em'
                  }}
                >
                  {booking.event.name}
                </Typography>

                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(booking.event.startDate).format('h:mm A')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {booking.event.location}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Chip
                    label={`${booking.spots} Spot${booking.spots > 1 ? 's' : ''}`}
                    color="primary"
                    size="small"
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Booking #{booking.id}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<QrCode2 />}
                    onClick={() => setQrDialogOpen(true)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    View Ticket
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(booking.id)}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={qrDialogOpen}
        onClose={() => setQrDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Your Ticket QR Code
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <QrCode2 sx={{ fontSize: 180, color: 'primary.main' }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Show this QR code at the event entrance
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => setQrDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, mr: 1 }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => window.print()}
            sx={{ borderRadius: 2 }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={bookingToDelete !== null}
        onClose={() => setBookingToDelete(null)}
        title="Cancel Booking"
        content={
          <Box>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </Typography>
            {bookingToDelete && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Booking Details:
                </Typography>
                <Typography variant="body2">
                  Event: {bookings.find(b => b.id === bookingToDelete)?.event.name}
                </Typography>
                <Typography variant="body2">
                  Date: {dayjs(bookings.find(b => b.id === bookingToDelete)?.event.startDate).format('MMM D, YYYY')}
                </Typography>
                <Typography variant="body2">
                  Spots: {bookings.find(b => b.id === bookingToDelete)?.spots}
                </Typography>
              </Box>
            )}
          </Box>
        }
        action={
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
              sx={{ borderRadius: 2 }}
            >
              Cancel Booking
            </Button>
          </Stack>
        }
        
      />
    </Container>
  );
};

export default withAuth(BookingsPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
