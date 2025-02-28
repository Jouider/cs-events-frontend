import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Routes from '@common/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Save } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
}));

interface CreateEventFormProps {}

const CreateEventForm = (_props: CreateEventFormProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { createOne } = useEvents();

  const schema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    description: Yup.string()
      .required('Description is required')
      .min(50, 'Description must be at least 50 characters'),
    startDate: Yup.date()
      .required('Start date is required')
      .min(new Date(), 'Start date must be in the future'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    location: Yup.string().required('Location is required'),
    capacity: Yup.number()
      .required('Capacity is required')
      .min(1, 'Minimum capacity is 1'),
    coverImageUrl: Yup.mixed()
      .required('Cover image is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateOneInput>({
  resolver: yupResolver(schema),
  defaultValues: {
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: dayjs().add(1, 'hour').toDate(),
    location: '',
    capacity: 1,
      coverImageUrl: null,
  },
});

const onSubmit = async (data: CreateOneInput) => {
  try {
      console.log('Form Data:', data);
      
      const eventData = {
        ...data,
        startDate: dayjs(data.startDate).toISOString(),
        endDate: dayjs(data.endDate).toISOString(),
};

      console.log('Sending data:', eventData);

      const response = await createOne(eventData, {
        displayProgress: true,
        displaySuccess: true,
      });

      if (response.success) {
        enqueueSnackbar('Event created successfully', { variant: 'success' });
        router.push(Routes.Events.ReadAll);
      } else {
        enqueueSnackbar(response.error || 'Failed to create event', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('An error occurred while creating the event', { variant: 'error' });
    }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
      onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ maxWidth: 900, margin: '0 auto', p: 2 }}
        >
          <StyledPaper>
            <SectionTitle variant="h6">Basic Information</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Event Name"
                  placeholder="Ex: Design Thinking Workshop"
                  error={!!error}
                  helperText={error?.message}
                      />
              )}
                      />
                    </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={6}
                  label="Description"
                  placeholder="Describe your event, what people will learn, the schedule..."
                  error={!!error}
                  helperText={error?.message || "Minimum 50 characters"}
                      />
              )}
                      />
                    </Grid>
                    </Grid>
                </StyledPaper>

      <StyledPaper>
        <SectionTitle variant="h6">Date and Location</SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="endDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Location"
                  placeholder="Event address"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper>
        <SectionTitle variant="h6">Capacity and Image</SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="capacity"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Capacity"
                  InputProps={{
                    inputProps: { min: 1 }
                  }}
                  error={!!error}
                  helperText={error?.message || "Maximum number of participants"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Cover Image
            </Typography>
            <Controller
              name="coverImageUrl"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                  {error && (
                    <Typography color="error" variant="caption">
                      {error.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
              Accepted formats: JPG, PNG, GIF. Max size: 5MB
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          startIcon={<Save />}
          loading={isSubmitting}
        >
          Create Event
        </LoadingButton>
      </Box>
    </Box>
    </LocalizationProvider>
  );
};

export default CreateEventForm;
