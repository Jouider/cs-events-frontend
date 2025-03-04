import {
  FormStepProps,
  FormStepRef,
  StepComponent,
} from '@common/components/lib/navigation/FormStepper';
import { RHFTextField } from '@common/components/lib/react-hook-form';
import { Grid } from '@mui/material';
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CreateOneInput } from '../../hooks/api/useEvents';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import useEvents from '../../hooks/api/useEvents';
import { Event } from '../../defs/types';
import { CurrentFormStepRef } from '@common/components/partials/UpsertCrudItemForm';

interface CreateEventStep1Props extends FormStepProps {}

const CreateEventStep1 = forwardRef((props: CreateEventStep1Props, ref: Ref<FormStepRef>) => {
  const { next, data } = props;
  const formRef = useRef<CurrentFormStepRef>();
  const { t } = useTranslation(['event', 'common']);

  const schema = Yup.object().shape({
    name: Yup.string().required(t('common:field_required')),
    description: Yup.string()
      .required(t('common:field_required'))
      .min(50, t('event:description_min_length')),
  });

  const defaultValues: Partial<CreateOneInput> = {
    name: data?.name || '',
    description: data?.description || '',
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
        <Grid item xs={12}>
          <RHFTextField
            name="name"
            label={t('event:name')}
            placeholder={t('event:name_placeholder')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField
            name="description"
            label={t('event:description')}
            multiline
            rows={6}
            placeholder={t('event:description_placeholder')}
          />
        </Grid>
      </Grid>
    </CreateCrudItemForm>
  );
});

export default CreateEventStep1 as StepComponent<FormStepRef, CreateEventStep1Props>;
