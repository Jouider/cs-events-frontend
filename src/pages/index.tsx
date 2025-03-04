import React, { useState } from 'react';
import { Container } from '@mui/material';
import EventList from '@modules/events/components/EventList';
import Hero from '@modules/events/components/Hero';
import CategorySelection from '@modules/events/components/CategorySelection';
import { categories } from '@modules/events/data/categories';
import { Category } from '@modules/events/defs/types';

const EventsPage: React.FC = () => {
  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category.name);
    // Add your logic here for when a category is selected
  };
  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        <CategorySelection categories={categories} onSelectCategory={handleCategorySelect} />
      </Container>
      <Container maxWidth="lg">
        <EventList />
      </Container>
    </>
  );
};

export default EventsPage;
