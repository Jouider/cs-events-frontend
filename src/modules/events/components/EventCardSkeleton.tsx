import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const EventCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={140} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={20} width="60%" />
        <Skeleton variant="text" height={20} width="70%" />
      </CardContent>
      <Skeleton variant="rectangular" height={36} sx={{ mx: 2, mb: 2 }} />
    </Card>
  );
};

export default EventCardSkeleton;
