import { FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import { useField } from 'formik';

interface IInputFieldProps {
  name: string;
  label?: string;
}

export const InputField = (props: IInputFieldProps): JSX.Element => {
  const { name, label } = props;
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error && !!meta.touched}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input id={name} variant="filled" {...field} />
      {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
