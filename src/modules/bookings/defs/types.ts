import { Id } from '@common/defs/types';
import { Event } from '@modules/events/defs/types';

export interface Booking {
  id: string;
  userId: Id;
  eventId: Id;
  spots: number;
  createdAt: Date;
  updatedAt: Date;
  event: Event;
}
