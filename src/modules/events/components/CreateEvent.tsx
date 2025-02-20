import { RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import { ItemResponse } from '@common/hooks/useItems';
import Routes from '@modules/events/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

const CreateEventForm = () => {
  const router = useRouter();
  const schema = Yup.object().shape({
    title: Yup.string().required('Le titre est obligatoire'),
    description: Yup.string().required('La description est obligatoire'),
    date: Yup.string().required('La date est obligatoire'),
    location: Yup.string().required('Le lieu est obligatoire'),
  });
  const defaultValues: CreateOneInput = {
    title: '',
    description: '',
    date: '',
    location: '',
  };
  const onPostSubmit = async (
    _data: CreateOneInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<CreateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.ReadAll);
    }
  };
  return (
    <CreateCrudItemForm<Event, CreateOneInput>
      routes={Routes}
      useItems={useEvents}
      schema={schema}
      defaultValues={defaultValues}
      onPostSubmit={onPostSubmit}
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
    </CreateCrudItemForm>
  );
};

export default CreateEventForm;
