import { Box, Heading, Text } from '@chakra-ui/react';

export const LoginForm = (): JSX.Element => (
  <Box p="2">
    <Box my="4" textAlign="center">
      <Heading size="md" fontWeight="bold">
        Welcome!
      </Heading>
      <Text>Login by entering information below</Text>
    </Box>
  </Box>
);
