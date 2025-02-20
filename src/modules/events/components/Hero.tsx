import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const images = [
  'https://cdn.evbstatic.com/s3-build/fe/build/images/0205288125d365f93edf9b62837de839-nightlife_desktop.webp',
  'https://cdn.evbstatic.com/s3-build/fe/build/images/389ece7b7e2dc7ff8d28524bad30d52c-dsrp_desktop.webp',
  'https://cdn.evbstatic.com/s3-build/fe/build/images/08f04c907aeb48f79070fd4ca0a584f9-citybrowse_desktop.webp',
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change de slide toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '400px',
        position: 'relative',
        overflow: 'hidden',
        margin:4 , // Ajout de margin autour du slider
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`Slide ${index + 1}`}
          sx={{
            width: '100%',
            height: '400px',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: 'opacity 1s ease-in-out',
            opacity: index === currentSlide ? 1 : 0,
            borderRadius: '16px', // Ajout de border-radius pour arrondir les angles
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
        }}
      >
        {images.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              color: index === currentSlide ? 'primary.main' : 'common.white',
              '&:hover': {
                color: 'primary.light',
              },
            }}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Hero;