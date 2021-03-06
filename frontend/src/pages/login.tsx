import { Center, Flex, useColorModeValue, useToken, Image } from '@chakra-ui/react';
import React from 'react';
import { ForgottenPasswordForm } from '../components/LoginPage/ForgottenPasswordForm';
import { LoginForm } from '../components/LoginPage/LoginForm';

const LoginPage = (): JSX.Element => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const [purple200, purple500] = useToken('colors', ['purple.200', 'purple.500']);

  return (
    <Center h="100vh">
      <Flex
        overflow="hidden"
        bg={bgColor}
        rounded="md"
        boxShadow="sm"
        w="40vw"
        maxW="700px"
        minH="20vh"
      >
        <Center flex="0 0 50%" bg={`linear-gradient(45deg, ${purple500}, ${purple200})`}>
          <Image src="/img/xStocksLogo.png" maxW="180px" />
        </Center>
        {/* <LoginForm /> */}
        <ForgottenPasswordForm />
      </Flex>
    </Center>
  );
};

export default LoginPage;
