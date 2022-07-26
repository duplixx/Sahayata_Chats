import Head from "next/head";
import { Icon, Box, Stack, Center, Button } from "@chakra-ui/react";
import { SiGooglechat } from "react-icons/si";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {auth} from "../firebase"
export default function login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box w="100%" bgGradient='linear(to-r, pink.200, indigo.100)'>
      <Center h="100vh" >
        <Stack
          align="center"
          rounded="3xl"
          spacing={12}
          borderColor="blue"
          size="sm"
          p={12}
          boxShadow="lg"
        >
          <Box w="fit-content" p={5} rounded="3xl" boxShadow="sm">
            <Icon as={SiGooglechat} w="100px" h="100px" color="red" />
          </Box>
          <Button boxShadow="sm" onClick={() => signInWithGoogle("",{prompt:"select_account"} )}>
            Sign In Google
          </Button>
        </Stack>
      </Center>
      </Box>
    </>
  );
}
