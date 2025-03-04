import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box, Typography, Divider } from '@mui/material';
import { Search as SearchIcon, LocationOn } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '9px',
  border: '2px soli d #DBDAE3',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  '&:hover': {
    borderColor: '#A9A8B3',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6F7287',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#1E0A3C',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '&::placeholder': {
      color: '#6F7287',
    },
  },
}));
const SearchBar = () => {
  return (
    <Search sx={{ paddingLeft: '5rem' }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search events"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider orientation="vertical" flexItem />
    </Search>
  );
};

export default SearchBar;
