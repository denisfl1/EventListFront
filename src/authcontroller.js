import React,{useState,createContext,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { api, SOCKET } from './api';



export const AuthContext = createContext();


export const AuthProvider = ({children})=>{

    
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [lockedButton,setLockedButton] = useState()
    const [shadowcontainer,setShadowContainer] = useState({
        addList:false,
        editList:false,
        token:false,
        myAccount:false,
        addMonitor:false,
        editMonitor:false,
    
    })


    const HandleShadow=(e)=>{
      
        if(e.target.id === "shadow_container" )return setShadowContainer(
            {
                addList:false,
                ediList:false,
                token:false,
                myAccount:false,
                addMonitor:false,
                editMonitor:false,
            
            })   

    }

    const handleCancelClick = () => {
        if (shadowcontainer.addList) {
            shadowcontainer.addList = false;
        } else {
            shadowcontainer.editList = false;
        }
    };
    
  

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
  
            
            SOCKET.connect('http://localhost:3000/',{maxBufferSize:50,extraHeaders:{Authorization:token}})
        
       

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
       return SOCKET.disconnect()


  }


return(
    
    <AuthContext.Provider value={{authenticated:
        !!user,user,loading,setLoading,lockedButton,ID,token,setLockedButton, logged,logout,HandleShadow,shadowcontainer,setShadowContainer,handleCancelClick}}>
            {children}   
    </AuthContext.Provider>

)

}