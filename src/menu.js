import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./authcontroller"
import home from './logos/home.png'
import Myaccount from './myaccount'
import {api} from './api'

function Menu(props){

    const {authenticated,logout,person} = useContext(AuthContext)
    const [click,setClick] = useState(false)
    const [Account,setAcccount] = useState(false)
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [admin,setAdmin] = useState()
    const [id,setID] = useState()

    const{loading,lockedButton,setLockedButton} = useContext(AuthContext)
  
  
   
    const authbutton=()=>{
    
        if(authenticated){
            return logout()
        }

    }

    const open=()=>{
    
        if(!click){
            setClick(true)
        return
        }setClick(false)    
    }

    function HideShadow(e){

    if(e.target.className == "shadowcontainer" || e.target.id == "canceledituser" ){
        setAcccount(false)
    }

    }

    const OpenAccount=()=>{
    if(!Account){
        setAcccount(true)
    return
    } 
    setAcccount(false)

    }


   

    useEffect(()=>{


        (async(res)=>{
            
        if(authenticated &&!loading){
            
          await api.get('/getusertoedit').then(
            res=>{
               const{id,name,email,admin,token} = res.data
                setName(name)
                setEmail(email)
                setAdmin(admin)
                setID(id)
                localStorage.setItem("token",token)
                localStorage.setItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",admin)
                setLockedButton(admin)
                
            },error=>{
    
    
            }
          )
            

        }
         

        })()
        
        
    
        },[loading,authenticated])
    
    

    return(
        <>
        <nav className="nav ">
        <ul className="navLink">
        {authenticated && <Link to="/festas"><img src={home} className="home"></img></Link>}
        {authenticated &&<li onClick={open} className={!click ? "dropdown " : " dropdown-open "} >{authenticated && name }<i className="dropdown-arrow"></i>
        <div className="dropdown-menu">
                
                <Link to={"/festas"}>Festas</Link>
                <a onClick={OpenAccount}>Minha Conta</a>
                {lockedButton && <Link to={"/allusers"} >Usuários</Link>}
                <a onClick={authbutton}>Sair</a>
                </div>
        </li>}
    

        </ul>
       
        </nav>
        {Account && <Myaccount id={id} name={name} email={email} admin={admin} HideShadow={HideShadow} Account={Account}/>}
        </>
    )

}

export default Menu