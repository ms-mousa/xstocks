import { Box, Button, Heading, Text, Icon, Stack, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FiHome, FiUser } from 'react-icons/fi';
import { loginSchema } from '../../lib/formSchemas';
import { InputField } from '../Forms/InputField';

export const LoginForm = (): JSX.Element => (
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
        await new Promise((r) => setTimeout(r, 500));
        console.log(values);
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
