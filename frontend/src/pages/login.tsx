import { Center, Flex, useColorModeValue, useToken, Image, Box } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { LoginPageSections } from '../@types/global';
import { ForgottenPasswordForm } from '../components/LoginPage/ForgottenPasswordForm';
import { LoginForm } from '../components/LoginPage/LoginForm';
import { NewAccountForm } from '../components/LoginPage/NewAccountForm';

const LoginPage = (): JSX.Element => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const [purple200, purple500] = useToken('colors', ['purple.200', 'purple.500']);
  const router = useRouter();
  const { section } = router.query;
  const sectionQuery = section?.toString();

  return (
    <Center h="100vh" p="2">
      <Flex
        overflow="hidden"
        bg={bgColor}
        direction={['column', 'column', 'row', 'row']}
        rounded="md"
        boxShadow="sm"
        w={['unset', 'unset', '60vw', '40vw']}
        maxW="700px"
      >
        <Center
          minH="20vh"
          flex="0 0 50%"
          bg={`linear-gradient(45deg, ${purple500}, ${purple200})`}
        >
          <Image src="/img/xStocksLogo.png" maxW="180px" />
        </Center>
        <Box w="100%" p="4">
          {sectionQuery === LoginPageSections.ForgotPassword ? (
            <ForgottenPasswordForm />
          ) : sectionQuery === LoginPageSections.NewAccount ? (
            <NewAccountForm />
          ) : (
            <LoginForm />
          )}
        </Box>
      </Flex>
    </Center>
  );
};

export default LoginPage;
