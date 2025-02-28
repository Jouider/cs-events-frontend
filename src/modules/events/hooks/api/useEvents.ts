import ApiRoutes from '@common/defs/api-routes';
import { ROLE } from '@modules/permissions/defs/types';
import { Event } from '@modules/events/defs/types';
import useItems, { UseItemsOptions, defaultOptions } from '@common/hooks/useItems';

export interface CreateOneInput {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  coverImageUrl?: File | null;
}

export interface UpdateOneInput {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  coverImageUrl?: File | null;
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput; 

function useEvents(opts: UseItemsOptions = defaultOptions) {
  const apiRoutes = ApiRoutes.Events;
  const itemsHook = useItems<Event, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return itemsHook;
}

export default useEvents;
