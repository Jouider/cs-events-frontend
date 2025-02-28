import React from 'react';
import { Box, Avatar, Typography, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';

interface CategoryIconProps {
  name: string;
  icon: typeof SvgIcon;
  onClick: () => void;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.primary.light}`,
  color: theme.palette.text.primary,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CategoryIcon: React.FC<CategoryIconProps> = ({ name, icon: IconComponent, onClick }) => (
  <Box
    mt={5}
    display="flex"
    flexDirection="column"
    alignItems="center"
    sx={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <StyledAvatar>
      <IconComponent />
    </StyledAvatar>
    <Typography variant="caption" align="center" sx={{ mt: 1 }}>
      {name}
    </Typography>
  </Box>
);

export default CategoryIcon;
