import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  FormHelperText,
  Icon,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FiUser } from 'react-icons/fi';
import { InputField } from '../Forms/InputField';

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
      {({ isSubmitting }) => (
        <Form>
          <InputField
            leftAddonElement={<Icon as={FiUser} color="gray.500" />}
            label="Username:"
            name="username"
          />
          <Button type="submit" isLoading={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  </Box>
);
