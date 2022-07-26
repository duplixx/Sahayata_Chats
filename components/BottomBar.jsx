import { Button } from "@chakra-ui/react";
import { FormControl, Input } from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const BottomBar = ({ id, user }) => {
    const [input, setInput] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp(),
        })
        setInput("");

    };
    return (
        <FormControl bg="blue.200" p={3} onSubmit={sendMessage} as="form" >
            <Input type="text" bg="blue.500" placeholder="type something..." autoComplete="off" borderColor="black" borderWidth={2} onChange={e => setInput(e.target.value)} value={input} />
            <Button type="submit" hidden >Submit</Button>
        </FormControl>
    );

};

export default BottomBar;

