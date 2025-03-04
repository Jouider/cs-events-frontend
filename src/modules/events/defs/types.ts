import { CrudObject, Id } from '@common/defs/types';
import { User } from '@modules/users/defs/types';


import { SvgIconComponent } from '@mui/icons-material';

export interface Category {
  id: string;
  name: string;
  icon: SvgIconComponent;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string; // ou Date si vous convertissez la chaîne en objet Date
  endDate: Date; // idem
  location: Date;
  organizerId: number;
  capacity: number;
  coverImage?: string;
  coverImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  availableSpots?: number;
  organiserName?: string;
}
