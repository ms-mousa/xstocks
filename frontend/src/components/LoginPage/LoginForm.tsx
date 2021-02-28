import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  FormHelperText,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter your username')
    .min(5, 'Username has to be at least 5 characters'),
});

export const LoginForm = (): JSX.Element => (
  <Box p="2">
    <Box my="4" textAlign="center">
      <Heading size="md" fontWeight="bold">
        Welcome!
      </Heading>
      <Text>Login by entering information below</Text>
    </Box>
    <Formik
      initialValues={{
        username: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        console.log(values);
      }}
      validationSchema={loginSchema}
    >
      {({ errors, touched, isSubmitting, values, setFieldValue }) => (
        <Form>
          <FormControl isInvalid={!!errors.username && !!touched.username}>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input
              value={values.username}
              onChange={(e) => {
                setFieldValue('username', e.target.value);
              }}
              name="username"
              variant="filled"
            />
            {errors.username && touched.username && (
              <FormHelperText>{errors.username}</FormHelperText>
            )}
          </FormControl>
          <Button type="submit" isLoading={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  </Box>
);
