import { useState, useRef } from "react" 

import Auth from "./components/Auth"
import Chat from "./components/Chat";

import Cookies from "universal-cookie"

import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut = async () =>{
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth){
    return (
      <div className="bg flex">
        <Auth setIsAuth={setIsAuth}/>
        <h1 className="main-text">DESI CHAT</h1>
        
      </div>
    );
  }

  return (
    <div className="bg flex-col"> 
      {room ? (
        <>
        <Chat room={room}/>
        </>
          
      ) : (
        <div className="flex-col">
          <h1 className="sub-text" style={{color: "#103cc2", marginBottom:"20px"}}>Welcome</h1>

          <div>
            <input type="text" ref={roomInputRef} placeholder="Enter Room Name.. (eg. room1)" className="inputGroup"/>
            <button className="btn2" onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
        </div>
      )} 

      <div style={{marginTop: "30px"}}>
        {
          room ? (<button onClick={()=>setRoom(null)} className="btn" style={{marginRight: "20px"}}>Go Back</button>):(<></>)
        }
        <button onClick={signUserOut} className="btn">Sign Out</button>
      </div>
    </div>
  );
  
}

export default App
