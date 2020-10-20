import { TextField } from "@material-ui/core";
import React, { ChangeEventHandler, FC } from "react";

interface FieldProps {
  edit?: boolean;
  fullWidth?: boolean;
  label: string;
  value: string | null;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  error?: string | null;
}
export const Field: FC<FieldProps> = ({
  edit = false,
  fullWidth = true,
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      disabled={!edit}
      label={label}
      value={value || ""}
      onChange={onChange}
      error={!!error}
      helperText={error}
    />
  );
};
