import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./authcontroller"
import home from './logos/home.png'
import Myaccount from './myaccount'
import {api} from './api'
import TokenGen from "./components/tokengen"

function Menu(){

    const {authenticated,logout} = useContext(AuthContext)
    const [click,setClick] = useState(false)
    const [name,setName] = useState()
    const [number,setNumber] = useState()
    const [admin,setAdmin] = useState()
    const [id,setID] = useState()

    const{loading,lockedButton,setLockedButton,shadowcontainer} = useContext(AuthContext)
  
  
    const authbutton=()=>{
    
        if(authenticated) return logout()
       

    }

    const open=()=>{
    
        if(!click)return setClick(true)
    
        return setClick(false)    
    }


    useEffect(()=>{


        (async()=>{
            
        if(authenticated &&!loading){
            
          await api.get('/getusertoedit').then(
            res=>{
               const{id,name,number,admin,token} = res.data
                setName(name)
                setNumber(number)
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
                
                <Link to={"/festas"}>Eventos</Link>
                <a onClick={()=>shadowcontainer.Myaccount = true}>Minha Conta</a>
                {lockedButton && <Link to={"/allusers"} >Usuários</Link>}
                {lockedButton && <a onClick={()=>shadowcontainer.token = true}>Token de Cadastro</a>}
                <a onClick={authbutton}>Sair</a>
                </div>
        </li>}
    

        </ul>
       
        </nav>
        {shadowcontainer.Myaccount && <Myaccount id={id} name={name} number={number} admin={admin} />}
        {shadowcontainer.token && <TokenGen  />}
        </>
    )

}

export default Menu