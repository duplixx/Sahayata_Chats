import { Button } from "@chakra-ui/react";
import { FormControl, Input, Icon } from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { RiSendPlane2Line} from "react-icons/Ri";

const BottomBar = ({ id, user }) => {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <FormControl bg="pink.100" p={3} onSubmit={sendMessage} as="form">
      <Input
        type="text"
        bg="pink.100"
        placeholder="type something..."
        autoComplete="off"
        borderColor="black"
        borderWidth={2}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Icon
        type="submit"
        as={RiSendPlane2Line}
        w="28px"
        h="28px"
        style={{ position: "absolute", right: "28px", top: "18px" }}
        _hover={{ cursor: "pointer",bgColor:"white",rounded: "50px"}}
      />
    </FormControl>
  );
};

export default BottomBar;
