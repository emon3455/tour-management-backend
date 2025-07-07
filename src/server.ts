import http from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVariable } from "./app/config/env";

let server: http.Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVariable.DB_URL as string);
        console.log("MongoDB Connected");
        server = app.listen(envVariable.PORT, () => {
            console.log(`Server is listening to port ${envVariable.PORT}`);
        });
    } catch (error) {
        console.log("Error:", error);
    }
};
startServer();

process.on("uncaughtException",(error)=>{
    console.log("Uncaught Exception Detected..!, Server shutting Down. ", error);
    
    if(server){
        process.exit(1);
    }
    process.exit(1);
})
process.on("unhandledRejection",(error)=>{
    console.log("Unhandle Rejection Detected..!, Server shutting Down. ", error);
    
    if(server){
        process.exit(1);
    }
    process.exit(1);
})
process.on("SIGINT",(error)=>{
    console.log("SIGINT Detected..!, Server shutting Down. ", error);
    
    if(server){
        process.exit(1);
    }
    process.exit(1);
})
process.on("SIGTERM",(error)=>{
    console.log("SIGTERM Detected..!, Server shutting Down. ", error);
    
    if(server){
        process.exit(1);
    }
    process.exit(1);
})
