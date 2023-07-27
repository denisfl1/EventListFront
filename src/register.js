import React,{useContext} from "react";
import {useState,useEffect} from 'react'
import img from './logos/logo.png'
import { AuthContext} from "./authcontroller";
import { api } from "./api";
import { Navigate } from "react-router-dom";
import loginvideo from './login video/video.mp4'


    function Register(){


    const [name,setName] = useState(" ")
    const [email,setEmail] = useState(" ")
    const [password,setPassword] = useState(" ")
    const [emailCheck,setemailCheck] = useState({login:false,empty:false})


    const [error,setError] = useState({
    fullname:false,
    email:false,
    password:false,
   
    })

    const {logged} = useContext(AuthContext)


    const handleChangeName=(event)=>{
        const values = event.target.value
        const explodeString = values.split(" ")
        const filter = explodeString.filter((x)=>{return x !== ''})
     
    setName(values)
        
    if(!filter[1] ){
        error.fullname = true
   
    }else{
        error.fullname = false
   }
    
    if(values){
        emailCheck.empty = false
    }


 
    }

    const handleChangeEmail=(event)=>{
      const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
      const values = event.target.value
      setEmail(values)

    if(!regex.test(values) || values == " "){   
        error.email = true
           
    }else{
        error.email = false
            
            
    }if(values){
       setemailCheck({login:false,empty:false})
    }
  
    }

    const handleChangePassword=(event)=>{
        
        const values = event.target.value
        setPassword(values)
        

    if(values.length <5  || !values){
        error.password = true
        emailCheck.empty = false

            
    }else{
        error.password=false
    }


    }




    const handleSubmit = async  (event)=> {
        event.preventDefault()
        
        if(error.fullname || error.email || error.password || emailCheck.empty) {
         return   event.preventDefault()
        }
        if(!name.trim() || !email.trim() || !password.trim()){
         setemailCheck({empty:true})

        }else{
           
            
            await api.post('/register',{name,email,password}).then(
                res=>{
                  
                    logged(res.data)
                   return <Navigate to="/login"/>
                },error=>{  
                    setemailCheck({login:true})

                }
            )
                          
           
            }
       
        }
           

    
    

    return(
        <div className="logincontainer">
           <video className="elementor-video"  src={loginvideo} autoPlay loop muted playsInline controlsList="nodownload" ></video>
        <div className="login" >
            
            <img className="spasso-picture" src={img} ></img>
            <form className="login-form"  >
            
            
            <input className={error.fullname || emailCheck.empty ? 'form-input invalid' : 'form-input' } 
            name={"name"} onChange={handleChangeName}
            placeholder="Nome e Sobrenome" ></input>
            <label className="labelerror">{emailCheck.empty ? "" : error.fullname ? "Nome Inválido *":" " }  
            </label>
            
           
            <input className={error.email|| emailCheck.login || emailCheck.empty ? 'form-input invalid1' : 'form-input '} 
            name={"email"} onChange={handleChangeEmail} 
            placeholder="Digite seu E-mail" ></input>
             <label className="labelerror">{emailCheck.login || emailCheck.empty ? "" :error.email ? "E-mail Inválido *" : "  "} 
             {emailCheck.login ? "E-mail Já Cadastrado *" : "  "  } 
             </label>
             
               
            
            
            <input className={error.password|| emailCheck.empty ? 'form-input invalid2' : 'form-input'} 
            name={"password"} onChange={handleChangePassword}  type="password"
             placeholder="Digite sua Senha" ></input>
              <label className="labelerror">{emailCheck.empty ? "" : error.password ? "Mínimo 5 Caracteres *":" "}
              {emailCheck.empty ?"Campos Obrigatórios *" : " "} 
              </label>
            
            
            <button type="submit" onClick={handleSubmit}>Cadastrar</button>
            </form>
           
           
        </div>
        </div>
    )


}

export default Register