import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField } from '@mui/material';

interface RHFNumberFieldProps {
  name: string;
  label: string;
  control: Control;
  defaultValue?: number;
}

const RHFNumberField: React.FC<RHFNumberFieldProps> = ({ name, label, control, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || 0}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type="number"
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message}
        />
      )}
    />
  );
};

export default RHFNumberField;
