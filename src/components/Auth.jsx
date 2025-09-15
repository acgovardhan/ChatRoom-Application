import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"

import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Auth = (props) => {
  
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try{
    const result = await signInWithPopup(auth, provider)

    //making cookie
    cookies.set("auth-token", result.user.refreshToken)

    setIsAuth(true);//passing the useState func as prop 

    }
    catch(err)
    {
      console.log(err)
    }

  }

  return (
    <div>
      <h1 className="sub-text" style={{marginTop: "40px"}}>Sign-In</h1>
      <h1 className="sub-text" style={{marginBottom: "20px"}} >With <span style={{color:"#4285F4"}}>G</span><span style={{color:"#EA4335"}}>o</span><span style={{color:"#FBBC05"}}>o</span><span style={{color:"#4285F4"}}>g</span><span style={{color:"#34A853"}}>l</span><span style={{color:"#EA4335"}}>e</span></h1>
      <button className="btn" onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}

export default Auth
