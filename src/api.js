import axios from 'axios';
import io from 'socket.io-client'

const logout = ()=>{
    

    const all = ["userdata","token","myid","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"]

    all.forEach((it)=>{
      localStorage.removeItem(it)
    })

    api.defaults.headers.Authorization = null
    SOCKET.io.opts.extraHeaders = { Authorization: null }

//    return SOCKET.disconnect()


}

export const SOCKET= io('http://localhost:5000/',{maxBufferSize:50,extraHeaders:{Authorization:localStorage.getItem("token")}})


export const api = axios.create({
        baseURL: 'http://localhost:5000/',
    })

    
    api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status == 401) {   
          logout();         
                
          }
          return Promise.reject(error);
        }
      );
 
  





