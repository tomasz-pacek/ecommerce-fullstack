import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";

type Props<T extends FieldValues, TName extends FieldPath<T>> = {
  form: UseFormReturn<T>;
  name: TName;
  className?: string;
  label?: string;
  description?: string;
  children: (field: ControllerRenderProps<T, TName>) => React.ReactNode;
};

export default function RHFField<
  T extends FieldValues,
  TName extends FieldPath<T>,
>({ form, name, label, description, className, children }: Props<T, TName>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className={className} data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          {children(field)}

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
