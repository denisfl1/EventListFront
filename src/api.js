import axios from 'axios';
import io from 'socket.io-client'



export const SOCKET= io(process.env.REACT_APP_URL,{maxBufferSize:50,extraHeaders:{Authorization:localStorage.getItem("token")}})


export const api = axios.create({
        baseURL: process.env.REACT_APP_URL
    })

    
    
 
  





