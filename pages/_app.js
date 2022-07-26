// pages/_app.js
import { Box, Center, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import Login from "../components/login";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }
  if (!user) {
    return (
      <ChakraProvider>

        <Login />


      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>

  );
}

export default MyApp;
