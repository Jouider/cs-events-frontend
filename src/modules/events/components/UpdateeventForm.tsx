import { RHFTextField } from '@common/components/lib/react-hook-form';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import Routes from '@modules/events/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid } from '@mui/material';
import * as Yup from 'yup';

interface UpdateEventFormProps {
  item: Event;
}

const UpdateEventForm = ({ item }: UpdateEventFormProps) => {
  const schema = Yup.object().shape({
    title: Yup.string().required('Le titre est obligatoire'),
    description: Yup.string().required('La description est obligatoire'),
    date: Yup.string().required('La date est obligatoire'),
    location: Yup.string().required('Le lieu est obligatoire'),
  });
  const defaultValues: UpdateOneInput = {
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
  };
  return (
    <UpdateCrudItemForm<Event, UpdateOneInput>
      item={item}
      routes={Routes}
      useItems={useEvents}
      schema={schema}
      defaultValues={defaultValues}
    >
      <Grid container spacing={3} sx={{ padding: 6 }}>
        <Grid item xs={6}>
          <RHFTextField name="title" label="Titre" />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField name="description" label="Description" />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField name="date" label="Date" type="date" />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField name="location" label="Lieu" />
        </Grid>
      </Grid>
    </UpdateCrudItemForm>
  );
};

export default UpdateEventForm;
