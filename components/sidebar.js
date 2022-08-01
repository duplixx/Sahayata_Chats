import { Avatar } from "@chakra-ui/avatar";
import { Button, Icon } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { TbArrowBarRight } from "react-icons/Tb";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc } from "@firebase/firestore";
import getOtherEmail from "../utils/getOtherEmails";
import { useRouter } from "next/router";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigHeads";
import { useState, useDisclosure } from "react";
import { Tooltip } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/Ai";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();
  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };
  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && input != user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "chats", id);
    await deleteDoc(docRef);
  };

  const ChatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          p={3}
          align="center"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => redirect(chat.id)}
        >
          <div style={{ width: "60px" }}>
            <BigHead {...getRandomOptions()} />
          </div>
          <Text style={{ flexWrap: "wrap" }}>
            {getOtherEmail(chat.users, user)}
          </Text>
          <Icon
            as={AiOutlineDelete}
            marginLeft={5}
            w="20px"
            h="30px"
            _hover={{
              bg: "red.400",
              cursor: "pointer",
              shadow: "lg",
              rounded: "50px",
            }}
            onClick={() => {
              handleDelete(chat.id);
            }}
          ></Icon>
        </Flex>
      ));
  };
  return (
    <>
      <Flex
        bg="pink.100"
        w="300px"
        borderEnd="1px solid"
        borderColor="gray.200"
        direction="column"
      >
        <Flex
          h="81px"
          w="100%"
          align="center"
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="gray.200"
          p={3}
        >
          <Flex align="center">
            <Avatar src={user.photoURL} marginEnd={3} />
            <Text>{user.displayName}</Text>
          </Flex>
          <Tooltip label="LogOut" placement="bottom">
            <IconButton
              size="md"
              icon={<TbArrowBarRight />}
              onClick={() => signOut(auth)}
            />
          </Tooltip>
        </Flex>
        <Tooltip label="New chat" placement="bottom">
          <Button
            m={5}
            p={4}
            onClick={() => newChat()}
            borderColor="blue.200"
            borderWidth="2px"
            _hover={{ bg: "blue.200" }}
          >
            New Chat
          </Button>
        </Tooltip>
        <Flex
          overflowX="scroll"
          direction="column"
          sx={{ scrollbarWidth: "none" }}
        >
          {ChatList()}
        </Flex>
      </Flex>
    </>
  );
}
