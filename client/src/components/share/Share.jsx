import "./share.css";
import storage from "../../firebase";
import {PermMedia,Label,Room,EmojiEmotions, Cancel} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

export default function Share() {
       
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [img,setImg] = useState(null);
    const [file,setFile]= useState(null);
    



    const handleUpload = async (e)=>{
        
       
        const fileName = new Date().getTime() + e.target.files[0].name;
           
            // data.append("file",file);
            // data.append("name",fileName);
            
            const uploadTask = storage.ref(`/items/${fileName}`).put(e.target.files[0]);
            
            
      
        await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
            
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setImg(url);
            console.log(url);
            
          });
         
        }
      );
      

      
      setFile(e.target.files[0]);
      
      
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        
        

       
    const newPost = {
        userId: user._id,
        desc: desc.current.value,
        img: img
    }

        
    console.log(newPost)
        try{
           const res = await axios.post(process.env.REACT_APP_API_URL+"/posts",newPost);
           console.log(res)
        }catch(err){
         console.log(err)
        }
        window.location.reload();
    
    }


  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                <input placeholder={"Whats in your mind "+user.username + "?"} className="shareInput" ref={desc} />
            </div>
            <hr className="shareHr"/>

            {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={img} alt="" />
            <Cancel className="shareCancelImg" onClick={
              () => {
            setFile(null);
            setImg(null);
            }} />
          </div>
        )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions" >
                    <label className="shareOption" htmlFor="file">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg"  onChange={handleUpload} />
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                    
                </div>
                <button className="shareButton" type="submit">Share</button>
                
                
            </form>
        </div>
    </div>
  )
}
