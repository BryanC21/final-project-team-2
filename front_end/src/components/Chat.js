import React, {useRef} from 'react';
import axios from 'axios';

const Chat = ({chat}) => {
    const inputRef = useRef();
  return (
    <div className='Chat-container'>
            <div>{chat.listingTitle},{chat.userId}</div>
            {chat.messages.map((message) => {
              return (<div>{new Date (message.createdAt).toLocaleString()}: {message.message}</div>)
            })}
            <input ref={inputRef}/>
            <button onClick={() => {
               axios
               .post(`/api/makeInquiry`, {
                 message: inputRef.current.value,
                 listingId: chat.listingId,
                 userId: chat.userId,
                 fromOwner: true
               })
               .then(function (response) {
                 console.log(response);
                 inputRef.current.value = '';
               })
               .catch(function (error) {
                 console.log(error);
               });
            }}>Reply</button>
            </div>
  );
};

export default Chat;
