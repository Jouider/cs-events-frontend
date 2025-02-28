import React from 'react';
import { Grid, Box } from '@mui/material';
import CategoryIcon from './CategoryIcon';
import { Category } from '@modules/events/defs/types';

interface CategorySelectionProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ categories, onSelectCategory }) => (
  <Box
    sx={{
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      // Afficher la scrollbar en mobile et la masquer sur les écrans plus larges
      '&::-webkit-scrollbar': {
        display: { xs: 'block', sm: 'none' },
      },
      scrollbarWidth: { xs: 'auto', sm: 'none' },
      msOverflowStyle: { xs: 'auto', sm: 'none' },
    }}
  >
    <Grid
      container
      spacing={2}
      wrap="nowrap"
      sx={{
        minWidth: '100%',
        pb: 2,
      }}
    >
      {categories.map((category) => (
        <Grid item key={category.id} sx={{ width: { xs: 180, sm: 180, md: 180, lg: 180 } }}>
          <CategoryIcon
            name={category.name}
            icon={category.icon}
            onClick={() => onSelectCategory(category)}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CategorySelection;
