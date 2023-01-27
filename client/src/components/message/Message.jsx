import "./message.css";
import {format} from "timeago.js"


export default function Message({message,own}) {
  return (
    <div className={own? "message own" : "message"}>
         <div className="messageTop">
            <img className="messageImg" 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
             alt="" />
         </div>
         <p className="messageText">{message.text}</p>
         <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
