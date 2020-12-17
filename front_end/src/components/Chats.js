import React, {useEffect, useState} from 'react';
import Chat from '../components/Chat';
import { useSelector } from 'react-redux';
import { setWSUserID, setChatsWS } from '../websockets';
import axios from 'axios';



const Chats = () => {
  const userID = useSelector((state) => {return state.user.userId});
  const [chats, setChats] = useState([]);
  const [forceUpdater, setForceUpdater] = useState(0);

  console.log(userID);
  useEffect(() => {
    const innerFunc = async () => {
      if(userID){
        setWSUserID(userID);
       const response = await axios(`/api/getInquiriesByUserID?userId=${userID}`)
       console.log(response);
       const newChats = []
       response.data.inquiries.forEach((data) => {
         const exisitingChat = newChats.find((chat) => {return chat.listingId === data.listingId._id && chat.userId === data.userId})
         if (exisitingChat){
           exisitingChat.messages.push({
             message: data.message,
             createdAt: data.createdAt
           })
         }else{
           newChats.push({
             listingId: data.listingId._id,
             listingTitle: data.listingId.title,
             userId: data.userId,
             messages: [{
               message: data.message,
               createdAt: data.createdAt
             }]
           })
         }
       })
       setChats(newChats); 
       setChatsWS(newChats, setChats, setForceUpdater);
      };
    }
    innerFunc();
  },[userID])
  console.log(chats)
    return (
        <div>
        <h1>Inquiries</h1>
        {chats.map((chat) => {
          return (<Chat chat={chat} />)
        })}
        </div>
    );
};

export default Chats;