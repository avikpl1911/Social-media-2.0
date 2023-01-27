import "./post.css"
import { MoreVert } from "@mui/icons-material";
import axios from "axios"
import { useState,useEffect, useContext } from "react";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


export default function Post({post}) {

    const {user:currentUser} =  useContext(AuthContext)
    const [like,setLike] = useState(post.likes.length);
    
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    

    
    const likeHandler = async ()=>{
         try {
            await axios.put(process.env.REACT_APP_API_URL+"/posts/"+post._id+"/like",{userId:currentUser._id});
            
            const res =  await axios.get(process.env.REACT_APP_API_URL+"http://localhost:8800/api/posts/"+post._id);
           
          
            
            setLike(res.data.likes.length);


            
            
            
            
         } catch (err) {
            console.log(err)
         }
        

        
        
    }
    



    useEffect(()=> {

        const fetchUser = async()=>{
          const res =  await axios.get(`${process.env.REACT_APP_API_URL}/users?userId=${post.userId}`);
          setUser(res.data);
          
        }
        fetchUser();
      },[post.userId])



 
        



  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}></Link>
                    <img className="postProfileImg" src={ user.profilePicture ? user.profilePicture :  PF+"person/noAvatar.png"} alt="" />
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={post?.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}/like.png`} onClick={likeHandler} alt="" />
                    <img className="likeIcon" src={`${PF}/heart.png`} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people likes this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">
                    {post.comment} comments
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
