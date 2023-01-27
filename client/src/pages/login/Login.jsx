import { useContext, useRef } from "react";
import "./login.css";
import {CircularProgress} from "@mui/material"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {

const email = useRef();
const password = useRef(); 

const {user,isFetching,error,dispatch}= useContext(AuthContext);


    const handleClick = (e) =>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    };
   
    console.log(user);
    
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="Email" className="loginInput" required ref = {email}/>
                    <input placeholder="Password" type="Password" className="loginInput" required minLength={6} ref = {password} />
                    <button className="loginButton"  disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" style={{width:"32px",height:"32px"}}/>  : "Log In"}</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">{isFetching ? <CircularProgress color="inherit" style={{width:"32px",height:"32px"}}/>  : "Create a New account"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}
