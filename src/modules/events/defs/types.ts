import { CrudObject, Id } from '@common/defs/types';
import { User } from '@modules/users/defs/types';

export interface Event extends CrudObject {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}
