import ApiRoutes from '@common/defs/api-routes';
import { Booking } from '@modules/bookings/defs/types';
import useItems, { UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Id } from '@common/defs/types';

export interface CreateOneInput {
  userId: Id;
  eventId: Id;
  spots: number;
}
export interface UpdateOneInput {
  userId: Id;
  eventId: Id;
  spots: number;
}
export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useBookings = (opts: UseItemsOptions = defaultOptions) => {
  const apiRoutes = ApiRoutes.Bookings;
  const itemsHook = useItems<Booking, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return itemsHook;
};

export default useBookings;
