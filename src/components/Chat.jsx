import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from "../firebase-config";

const Chat = (props) => {

  const { room } = props;

  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])

  const messagesRef = collection(db, "messages")

  useEffect(()=>{
    const queryMessages = query(messagesRef, where("room", "==", room));
    const unsubscribe =  onSnapshot(queryMessages, (snapshot)=>{
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      });

      setMessages(messages)
    })//what changes are we listening to

    return () => unsubscribe; //cleanup (imp)
  }, [])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt : serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("")
  };

  return (
    <div>
      <div>{messages.map((message) => <h1>{message.text}</h1>)}</div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="type your msg here..." 
          onChange={(e)=> setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat
