import {
  FormStepProps,
  FormStepRef,
  StepComponent,
} from '@common/components/lib/navigation/FormStepper';
import RHFImageDropzone from '@common/components/lib/react-hook-form/RHFImageDropzone';
import RHFNumberField from '@common/components/lib/react-hook-form/RHFNumberField';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import { CurrentFormStepRef } from '@common/components/partials/UpsertCrudItemForm';
import { UploadFormContextProvider } from '@common/contexts/UploadFormContext';
import Routes from '@common/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid, Typography } from '@mui/material';
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface CreateEventStep3Props extends FormStepProps {}

const CreateEventStep3 = forwardRef((props: CreateEventStep3Props, ref: Ref<FormStepRef>) => {
  const { next, data } = props;
  const formRef = useRef<CurrentFormStepRef>();
  const { t } = useTranslation(['event', 'common']);

  const schema = Yup.object().shape({
    capacity: Yup.number()
      .required(t('common:field_required'))
      .min(1, t('event:capacity_min')),
    coverImage: Yup.mixed()
      .required(t('common:field_required'))
      .test('fileSize', t('event:image_size_error'), (value) => {
        if (!value) return true;
        return value.size <= 5000000; // 5MB
      })
      .test('fileType', t('event:image_type_error'), (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }),
  });

  const defaultValues: Partial<CreateOneInput> = {
    capacity: data?.capacity || 1,
    coverImage: data?.coverImage || null,
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const res = await formRef?.current?.submit();
      if (res && !res.hasErrors) {
        next(res?.data);
      }
    },
  }));

  return (
    <UploadFormContextProvider>
      <CreateCrudItemForm<Event, CreateOneInput>
        routes={Routes.Events}
        useItems={useEvents}
        schema={schema}
        defaultValues={defaultValues}
        ref={formRef}
        displayCard
        displayFooter={false}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('event:capacity_and_image')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFNumberField
              name="capacity"
              label={t('event:capacity')}
              helperText={t('event:capacity_helper')}
              InputProps={{
                inputProps: { min: 1 }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {t('event:cover_image')}
            </Typography>
            <RHFImageDropzone
              name="coverImage"
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg', '.gif']
              }}
              maxSize={5000000}
              helperText={t('event:image_helper')}
              sx={{
                height: 200,
                border: '1px dashed',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
              {t('event:image_requirements')}
            </Typography>
          </Grid>
        </Grid>
      </CreateCrudItemForm>
    </UploadFormContextProvider>
  );
});

export default CreateEventStep3 as StepComponent<FormStepRef, CreateEventStep3Props>;
