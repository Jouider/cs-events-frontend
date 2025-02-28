
import { Category } from '@modules/events/defs/types';
import {
  MusicNote as MusicIcon,
  TheaterComedy as ArtsIcon,
  CalendarToday as HolidaysIcon,
  SportsEsports as HobbiesIcon,
  BusinessCenter as BusinessIcon,
  LocalBar as FoodDrinkIcon
} from '@mui/icons-material';

export const categories: Category[] = [
  { id: 'travel', name: 'Travel and Outdoor', icon: MusicIcon },
  { id: 'arts', name: 'Performing & Visual Arts', icon: ArtsIcon },
  { id: 'holidays', name: 'Holidays', icon: HolidaysIcon },
  { id: 'hobbies', name: 'Hobbies', icon: HobbiesIcon },
  { id: 'business', name: 'Business', icon: BusinessIcon },
  { id: 'food-drink', name: 'Food & Drink', icon: FoodDrinkIcon },
  { id: 'social-activities', name: 'Social Activities ', icon: FoodDrinkIcon },
  { id: 'sport', name: 'Technology', icon: FoodDrinkIcon },
];
