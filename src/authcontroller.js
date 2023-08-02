import React,{useState,createContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { api, SOCKET } from './api';



export const AuthContext = createContext();


export const AuthProvider = ({children})=>{

    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [lockedButton,setLockedButton] = useState()
  

    const recoveredUser = localStorage.getItem("userdata");
        const token = localStorage.getItem("token")
        const ID = localStorage.getItem("myid")

    
    useEffect(()=>{
        

        setTimeout(()=>{

            if(recoveredUser && token){
                setUser(JSON.parse(recoveredUser))
                api.defaults.headers.Authorization = `Bearer ${token}`
                SOCKET.io.opts.extraHeaders = { Authorization: token }
                setLoading(false)
                

            }else{
                setUser()  
                setLoading(false)
              return  SOCKET.disconnect()
                
            }
     
           
        },1)
           

    },[user])



  
    const logged = (data) =>{

        const loggedUser = data
        const token = loggedUser.token
 
        setLockedButton(loggedUser.admin)

        localStorage.setItem("userdata",JSON.stringify(loggedUser))
        localStorage.setItem("token",token)

        localStorage.setItem("myid",loggedUser.id)
        localStorage.setItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",loggedUser.admin)
        
       

        api.defaults.headers.Authorization =  `Bearer ${token}`
        SOCKET.io.opts.extraHeaders = { Authorization: token }
    

            setUser(loggedUser)
            navigate("/festas")
            
            SOCKET.connect("http://localhost:3000",{maxBufferSize:50,extraHeaders:{Authorization:token}})
        
       

    }

    const logout = ()=>{
        setLoading(true)
        localStorage.removeItem("userdata")
        localStorage.removeItem("token")
        localStorage.removeItem("myid")
        localStorage.removeItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
        api.defaults.headers.Authorization = null
        SOCKET.io.opts.extraHeaders = { Authorization: null }
        setUser(null)
    //    return SOCKET.disconnect()


  }


  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status == 401) {   
      logout();         
            
      }
      return Promise.reject(error);
    }
  );


return(
    <AuthContext.Provider value={{authenticated:
        !!user,user,loading,setLoading,lockedButton,ID,token,setLockedButton, logged,logout}}>
            {children}
            
        </AuthContext.Provider>

)

}