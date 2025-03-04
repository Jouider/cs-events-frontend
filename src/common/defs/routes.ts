import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Permissions from '@modules/permissions/defs/routes';
import Events from '@modules/events/defs/routes';
import Bookings from '@modules/bookings/defs/routes';

const Common = {
  Home: '/events',
  NotFound: '/404',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
  Events,
  Bookings
};

export default Routes;
