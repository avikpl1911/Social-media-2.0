import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory()



    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        }else{
            const user= {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }

              try {
                await axios.post(process.env.REACT_APP_API_URL+"/auth/register",user,{timeout:1000});
                history.push("/login");
              } catch (err) {
                console.log(err)
              }

            
        }
    };
    
    


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
                <input placeholder="Username" required ref={username} type="text" className="loginInput" />
                    <input placeholder="Email" required type="Email" ref={email} className="loginInput" />
                    <input placeholder="Password" required minLength="6" type="Password" ref={password} className="loginInput" />
                    <input placeholder="Confirm Password"   minLength="6" required ref={passwordAgain} type="Password" className="loginInput" />
                    <button className="loginButton" type="submit ">Sign Up</button>
                    
                    <button className="loginRegisterButton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
