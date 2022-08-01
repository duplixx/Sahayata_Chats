import Head from "next/head";
import { Icon, Box, Stack, Center, Button ,Text} from "@chakra-ui/react";
import { SiGooglechat } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Login() {
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
      <Box w="100%" >
        
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
          <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
          textAlign={["center", "center", "center", "center"]}
          marginTop='1vh'
        >
          Welcome to Sahayata Chats
        </Text>

            <Box w="fit-content" p={5} rounded="3xl" boxShadow="sm">
              <Icon as={SiGooglechat} w="100px" h="100px" color="red" />

            </Box>
            <Button boxShadow="sm" onClick={() => signInWithGoogle("", { prompt: "select_account" })}>
              Sign In Google
              <Icon as={FcGoogle} marginLeft={2} size="20px" marginTop={1} />
            </Button>
          </Stack>
        </Center>
      </Box>
    </>
  );
}
