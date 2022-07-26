import { Avatar, Button, Flex, FormControl, Input, Text} from "@chakra-ui/react";
import Head from "next/head";
import { collection, doc, orderBy, query } from "firebase/firestore"
import { db, auth } from "../../firebase"
import Sidebar from "../../components/sidebar";
import { useRouter } from "next/router";
import { useCollectionData,useDocumentData } from "react-firebase-hooks/firestore";
import { useRef, useEffect } from "react";
import BottomBar from "../../components/bottomBar";
import TopBar from "../../components/TopBar";
import getOtherEmail from "../../utils/getOtherEmails";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Chat() {
    const router=useRouter();
    const { id }= router.query;
    const [user] = useAuthState(auth);
    const q=query(collection(db,'chats/${id}/messages'),orderBy("timestamp"));
    const [messages]=useCollectionData(q);
    const [chat] = useDocumentData(doc(db, "chats", id));
    const bottomOfChat = useRef();
    const getMessages=()=>
            messages?.map(msg=>{
                const sender=msg.sender===user.email;
            
            return(
                <Flex  key={Math.random()}  p={3} bg={sender?"green.200" :"blue.200"} alignSelf={sender ? "flex-end":"flex-start"}> 
                    <Text w="fit-content" minWidth="100px"  p={3} m={1} borderRadius="10px">{msg.text}</Text> 
                </Flex>

            )
        })

    useEffect(() =>
        setTimeout(
          bottomOfChat.current.scrollIntoView({
          behavior: "smooth",
          block: 'start',
    }), 100)
  , [messages])
    return (
        <>
            <Flex h="100vh">
                <Head>
                    <title>
                        Chat App
                    </title>
                </Head>
                <Sidebar/>
                
                <Flex bg="pink.400" flex={1} direction="column">
                    <TopBar email={getOtherEmail(chat?.users, user)} />
                        <Flex flex={1} overflowX="scroll" sx={{scrollbarWidth:"none"}} direction="column">
                           {getMessages()}
                           <div ref={bottomOfChat}></div>
                        </Flex>
                        <BottomBar id={id} user={user}/>
                    
                    
                </Flex>
            </Flex>
        </>
    )
  }
  