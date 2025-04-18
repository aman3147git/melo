import express from "express"; 
import dotenv from "dotenv"; 
import connectDB from "./utils/database.js";
import userRoute from "./routes/user.js";
import messageRoute from "./routes/message.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 



app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOption)); 



app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(process.env.PORT, ()=>{
    connectDB();
    console.log(`Server listening at port:${process.env.PORT}`);
});