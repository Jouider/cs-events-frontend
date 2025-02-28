import {
  FormStepProps,
  FormStepRef,
  StepComponent,
} from '@common/components/lib/navigation/FormStepper';
import { RHFTextField } from '@common/components/lib/react-hook-form';
import RHFDatePicker from '@common/components/lib/react-hook-form/RHFDatePicker';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid } from '@mui/material';
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CurrentFormStepRef } from '@common/components/partials/UpsertCrudItemForm';

interface CreateEventStep2Props extends FormStepProps {}

const CreateEventStep2 = forwardRef((props: CreateEventStep2Props, ref: Ref<FormStepRef>) => {
  const { next, data } = props;
  const formRef = useRef<CurrentFormStepRef>();
  const { t } = useTranslation(['event', 'common']);

  const schema = Yup.object().shape({
    startDate: Yup.date()
      .required(t('common:field_required'))
      .min(new Date(), t('event:date_future')),
    endDate: Yup.date()
      .required(t('common:field_required'))
      .min(Yup.ref('startDate'), t('event:end_date_after_start')),
    location: Yup.string().required(t('common:field_required')),
  });

  const defaultValues: Partial<CreateOneInput> = {
    startDate: data?.startDate || new Date(),
    endDate: data?.endDate || new Date(),
    location: data?.location || '',
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
        <Grid item xs={12} md={6}>
          <RHFDatePicker name="startDate" label={t('event:start_date')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFDatePicker name="endDate" label={t('event:end_date')} />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField
            name="location"
            label={t('event:location')}
            placeholder={t('event:location_placeholder')}
          />
        </Grid>
      </Grid>
    </CreateCrudItemForm>
  );
});

export default CreateEventStep2 as StepComponent<FormStepRef, CreateEventStep2Props>;
