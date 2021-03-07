import {
  Box,
  Button,
  Heading,
  Text,
  Icon,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { FiAlertTriangle, FiAtSign, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { signUpSchema } from '../../lib/formSchemas';
import { InputField } from '../Forms/InputField';

export const NewAccountForm = (): JSX.Element => {
  const { error, signUp } = useAuth();
  const { notifySuccess } = useNotifications();
  const router = useRouter();
  const handleSubmit = async (values: FormikValues) => {
    const { firstName, lastName, email, password } = values;
    const res = await signUp(firstName, lastName, email, password);
    if (res?.user) {
      notifySuccess('Account created successfully', 'Redirecting to homepage');
      router.push('/');
    }
  };

  const isFormIncomplete = (values: FormikValues) =>
    !values.firstName ||
    !values.lastName ||
    !values.password ||
    !values.passwordConfirmation ||
    !values.email;

  return (
    <Stack justify="center" w="100%" p="4">
      <Box my="4" textAlign="center">
        <Heading size="md" fontWeight="bold">
          Join us!
        </Heading>
        <Text>Please fill the information below</Text>
      </Box>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={signUpSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Stack spacing="2">
              <Stack isInline spacing="2">
                <InputField
                  leftAddonElement={<Icon as={FiUser} color="gray.500" />}
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                />
                <InputField
                  leftAddonElement={<Icon as={FiUser} color="gray.500" />}
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                />
              </Stack>
              <InputField
                leftAddonElement={<Icon as={FiAtSign} color="gray.500" />}
                placeholder="Email"
                name="email"
                type="email"
              />
              <InputField
                leftAddonElement={<Icon as={FiLock} color="gray.500" />}
                placeholder="Password"
                name="password"
                type="password"
              />
              <InputField
                leftAddonElement={<Icon as={FiLock} color="gray.500" />}
                placeholder="Confirm Password"
                name="passwordConfirmation"
                type="password"
              />

              {error && (
                <Alert status="error">
                  <AlertIcon as={FiAlertTriangle} />
                  {error}
                </Alert>
              )}
              <Button
                isDisabled={isFormIncomplete(values)}
                type="submit"
                isLoading={isSubmitting}
              >
                Signup!
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
