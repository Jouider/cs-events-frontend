import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl, FormHelperText } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import { frFR } from '@mui/x-date-pickers/locales';

type Props = Omit<DatePickerProps<Dayjs>, 'value' | 'onChange'> & {
  name: string;
  helperText?: string;
};

const RHFDatePicker = ({ name, helperText, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <FormControl fullWidth error={!!error}>
            <DatePicker
              {...field}
              value={value ? dayjs(value) : null}
              onChange={(newValue) => {
                onChange(newValue ? newValue.toDate() : null);
              }}
              {...other}
              slotProps={{
                ...other.slotProps,
                textField: {
                  error: !!error,
                  helperText: error?.message || helperText,
                  fullWidth: true,
                },
              }}
            />
          </FormControl>
        </LocalizationProvider>
      )}
    />
  );
};

export default RHFDatePicker;
