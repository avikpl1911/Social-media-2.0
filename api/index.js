const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser")

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());
app.disable('etag');
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));







app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages", messageRoute);

const PORT=8800 || process.env.PORT


app.listen(PORT,(err)=>{
    if(!err){
      console.log("server is running on port "+ PORT);
    }else{
      console.log(err)
    }
});
