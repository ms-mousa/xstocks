import {
  Box,
  Button,
  Heading,
  Text,
  Icon,
  Stack,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { FiAlertTriangle, FiHome, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { loginSchema } from '../../lib/formSchemas';
import { InputField } from '../Forms/InputField';

export const LoginForm = (): JSX.Element => {
  const { loginUser, error } = useAuth();
  const { notifySuccess } = useNotifications();
  const router = useRouter();

  return (
    <Box w="100%" p="4">
      <Box my="4" textAlign="center">
        <Heading size="md" fontWeight="bold">
          Welcome!
        </Heading>
        <Text>Login by entering information below</Text>
      </Box>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values) => {
          const res = await loginUser(values.username, values.password);
          if (res.user) {
            notifySuccess('Logged in successfully', 'Redirecting to homepage');
            router.push('/');
          }
        }}
        validationSchema={loginSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="2">
              <InputField
                leftAddonElement={<Icon as={FiUser} color="gray.500" />}
                placeholder="Username"
                name="username"
                type="text"
              />
              <InputField
                leftAddonElement={<Icon as={FiUser} color="gray.500" />}
                placeholder="Password"
                name="password"
                type="password"
              />
              <Flex fontSize="xs" align="center" justify="flex-end">
                <Icon as={FiHome} />
                <Button variant="link" fontSize="xs" ml="1">
                  Forgotten password?
                </Button>
              </Flex>
              {error && (
                <Alert status="error">
                  <AlertIcon as={FiAlertTriangle} />
                  {error}
                </Alert>
              )}
              <Button type="submit" isLoading={isSubmitting}>
                Login
              </Button>

              <Flex justify="center" align="baseline">
                <Text fontSize="xs">Don&apos;t have an account?</Text>
                <Button variant="link" fontSize="xs" ml="1">
                  Create one here.
                </Button>
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
