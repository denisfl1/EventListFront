import React, { useContext } from "react";
import {useState} from 'react'
import img from './logos/logo.png'
import {Link, Navigate} from 'react-router-dom'
import { AuthContext } from "./authcontroller";
import { api } from "./api";
import loginvideo from './login video/video.mp4'




    function Login(){

   
    const [email,setEmail] = useState(" ")
    const [password,setPassword] = useState(" ")
    const [emailCheck,setemailCheck] = useState({login:false,empty:false})

    const [error,setError] = useState({
    email:false,
    password:false
    })

  
    
    const {logged} = useContext(AuthContext)


        const handleChangeEmail=(event)=>{
            const values = event.target.value
            setEmail(values)

        if(values){
            error.email = false
             setemailCheck({login:false,empty:false})
        }
      
        
          }


          const handleChangePassword=(event)=>{
            const values = event.target.value
            setPassword(values)
            if(values){
                error.password = false
                setemailCheck({login:false,empty:false})
            }
    
        }

   

        const handleSubmit = async(event)=> {
            event.preventDefault();
      
            
            if(!email.trim() || !password.trim()){
   
                 setError({
                    email:true,
                    password:true})
                setemailCheck({empty:true})
                 
            }else{
                await api.post('/login',{email,password}).then
                (res=>{

                    logged(res.data)
                    
                },error=>{
                    emailCheck.login = true
                    setError({email:true,password:true})

                })
            }

    
    
            }
   


    return(
        <div className="logincontainer">
      
        <div className="login">
        
            <img className="spasso-picture" src={img} ></img>
            <form className="login-form">
           
            <input className={error.email ? 'form-input invalid1' : 'form-input ' }name={"email"} onChange={handleChangeEmail} type="text"  placeholder="Digite seu Email" ></input>    
           

            <input className={error.password ? 'form-input invalid2' : 'form-input '} name={"password"} onChange={handleChangePassword}  type="password" placeholder="Digite sua Senha" ></input>

            <label className="labelerror">{emailCheck.empty ? "Campos Obrigatórios *" : " "}
            {emailCheck.login ? "Email ou Senha Incorretos *" : " "}
            </label>
            <button type="submit" onClick={handleSubmit}>LOGIN</button>
            <span>Não possui conta?<Link className="registerclass" to="/register">Registre-se</Link></span>
            </form>
            
        </div>
        <video className="elementor-video"  src={loginvideo} autoPlay loop muted playsInline controlsList="nodownload" ></video>
        </div>


    )


    }

export default Login