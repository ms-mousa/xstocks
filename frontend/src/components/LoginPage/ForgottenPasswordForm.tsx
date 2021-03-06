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
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { passwordResetSchema } from '../../lib/formSchemas';
import { InputField } from '../Forms/InputField';

export const ForgottenPasswordForm = (): JSX.Element => {
  const { loginUser, error } = useAuth();
  const { notifySuccess } = useNotifications();
  const router = useRouter();

  const handleSubmit = async (values: FormikValues) => {
    const res = await loginUser(values.username, values.password);
    if (res.user) {
      notifySuccess('Logged in successfully', 'Redirecting to homepage');
      router.push('/');
    }
  };

  return (
    <Stack justify="center" w="100%" p="4">
      <Box my="4" textAlign="center">
        <Heading size="md" fontWeight="bold">
          Reset your password!
        </Heading>
        <Text>Please enter a validated email address</Text>
      </Box>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={passwordResetSchema}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Stack spacing="2">
              <InputField
                leftAddonElement={<Icon as={FiMail} color="gray.500" />}
                placeholder="Email"
                name="email"
                type="email"
              />

              {error && (
                <Alert status="error">
                  <AlertIcon as={FiAlertTriangle} />
                  {error}
                </Alert>
              )}
              <Button isDisabled={!values.email} type="submit" isLoading={isSubmitting}>
                Reset Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
