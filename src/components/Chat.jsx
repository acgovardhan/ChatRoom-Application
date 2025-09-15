import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../firebase-config";

const Chat = (props) => {

  const { room } = props;

  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])

  const messagesRef = collection(db, "messages")
  
  useEffect(()=>{
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
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
      <div>
      <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div>{messages.map((message) => (
        <div key={message.id}>
          <span>
            {message.user}
          </span>
          {message.text}
         
        </div>
      ))}</div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="type your msg here..." 
          onChange={(e)=> setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat
