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
  ScaleFade,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { FiAlertTriangle, FiHome, FiUser } from 'react-icons/fi';
import { LoginPageSections } from '../../@types/global';
import { navigateToLoginPageSection } from '../../helpers/router';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { loginSchema } from '../../lib/formSchemas';
import { InputField } from '../Forms/InputField';

export const LoginForm = (): JSX.Element => {
  const { loginUser, error } = useAuth();
  const { notifySuccess } = useNotifications();
  const router = useRouter();
  const { section } = router.query;
  const sectionQuery = section?.toString();

  const handleSubmit = async (values: FormikValues) => {
    const res = await loginUser(values.username, values.password);
    if (res.user) {
      notifySuccess('Logged in successfully', 'Redirecting to homepage');
      router.push('/');
    }
  };

  return (
    <ScaleFade
      in={
        !Object.values<LoginPageSections | string | undefined>(
          LoginPageSections,
        ).includes(sectionQuery)
      }
    >
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
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ isSubmitting, values }) => (
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
                <Button
                  onClick={() => {
                    navigateToLoginPageSection(LoginPageSections.ForgotPassword);
                  }}
                  variant="link"
                  fontSize="xs"
                  ml="1"
                >
                  Forgotten password?
                </Button>
              </Flex>
              {error && (
                <Alert status="error">
                  <AlertIcon as={FiAlertTriangle} />
                  {error}
                </Alert>
              )}
              <Button
                isDisabled={!values.username || !values.password}
                type="submit"
                isLoading={isSubmitting}
              >
                Login
              </Button>

              <Flex justify="center" align="baseline">
                <Text fontSize="xs">Don&apos;t have an account?</Text>
                <Button
                  onClick={() => {
                    navigateToLoginPageSection(LoginPageSections.NewAccount);
                  }}
                  variant="link"
                  fontSize="xs"
                  ml="1"
                >
                  Create one here.
                </Button>
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </ScaleFade>
  );
};
