import { useState, useRef } from "react" 
import { ToastContainer, toast } from 'react-toastify';

import Auth from "./components/Auth"
import Chat from "./components/Chat";

import Cookies from "universal-cookie"

import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import countFunc from "./helper";

const cookies = new Cookies();

function App() {

  const notify = (msg) => toast.error(msg);


  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut = async () =>{
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  const handleEnterChat = async (roomName) =>{
    const count = await countFunc(roomName)
    if(count<=0){
      notify('Room does not exist!')
    }
    else{
      setRoom(roomName)
    }
  }

  const handleCreateRoom = async (roomName) =>{
    const count = await countFunc(roomName)
    if(count > 0){
      notify('Room already exist, Try Another Name!')
    }
    else{
      setRoom(roomName)
    }
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

          <input type="text" ref={roomInputRef} placeholder="Enter Room Name" className="inputGroup" style={{marginBottom: "20px"}}/>
          <div>
            <button className="btn2" onClick={() => handleEnterChat(roomInputRef.current.value)} style={{marginRight: '80px'}}>Enter Chat</button>
            <button className="btn2" onClick={() => handleCreateRoom(roomInputRef.current.value)}>Create Room</button>
          </div>
          <ToastContainer/>
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