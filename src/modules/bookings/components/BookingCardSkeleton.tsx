import React from 'react';
import { Card, Box, Skeleton, Stack, Divider } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: '#ffffff',
}));

const BookingCardSkeleton = () => {
  return (
    <StyledCard>
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" height={32} width="80%" sx={{ mb: 2 }} animation="wave" />

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={20} height={20} animation="wave" />
            <Skeleton variant="text" width="40%" height={24} animation="wave" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={20} height={20} animation="wave" />
            <Skeleton variant="text" width="60%" height={24} animation="wave" />
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" width={80} height={24} animation="wave" />
          <Skeleton variant="text" width={100} height={24} animation="wave" />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{
              flexGrow: 1,
              borderRadius: 2,
            }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={40}
            height={40}
            sx={{ borderRadius: 2 }}
            animation="wave"
          />
        </Stack>
      </Box>
    </StyledCard>
  );
};

export default BookingCardSkeleton;
