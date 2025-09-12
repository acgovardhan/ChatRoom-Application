import { useState, useRef } from "react" 

import Auth from "./components/Auth"
import Chat from "./components/Chat";

import Cookies from "universal-cookie"
const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  if(!isAuth){
    return (
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    );
  }

  return (
    <div> 
      {room ? (
          <Chat room={room}/>
      ) : (
        <div>
          <label>Enter Room Name: </label>
          <input type="text" ref={roomInputRef}/>{/*onChange={(e) => setRoom(e.target.value)} not gud in this case */}
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )} 
    </div>
  );
  
}

export default App
