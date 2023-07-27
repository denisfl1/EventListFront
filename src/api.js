import React from 'react';
import axios from 'axios';
import io from 'socket.io-client'



const logout = ()=>{

    localStorage.removeItem("userdata")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("myid")
    localStorage.removeItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
    api.defaults.headers.Authorization = null
    SOCKET.io.opts.extraHeaders = { Authorization: null }
    // return SOCKET.disconnect()

}



export const SOCKET= io(process.env.REACT_APP_URL,{maxBufferSize:50,extraHeaders:{Authorization:localStorage.getItem("token")}})


export const api = axios.create({
        baseURL: process.env.REACT_APP_URL
    })

    
    
    api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status == 401) {
                
          return logout();
              
                
          }
          return Promise.reject(error);
        }
      );
      
 
  





