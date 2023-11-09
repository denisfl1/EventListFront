import React, { useContext } from "react";
import {useState} from 'react'
import img from './logos/loremipsumlogo1.png'
import {Link, Navigate} from 'react-router-dom'
import { AuthContext } from "./authcontroller";
import { api } from "./api";
import img1 from './logos/wallpapperlorem.jpg'
import InputMask from "react-input-mask";




    function Login(){

   
    const [number,setNumber] = useState(" ")
    const [password,setPassword] = useState(" ")
    const [numberCheck,setNumberCheck] = useState({login:false,empty:false})
    const [loginlock,setLoginLock] = useState(false)

    const [error,setError] = useState({
    number:false,
    password:false
    })

  
    
    const {logged} = useContext(AuthContext)


        const handleChangeNumber=(event)=>{
            const values = event.target.value
            setNumber(values)

        if(values){
            error.number = false
             setNumberCheck({login:false,empty:false})
        }
      
        
          }


          const handleChangePassword=(event)=>{
            const values = event.target.value
            setPassword(values)
            if(values){
                error.password = false
                setNumberCheck({login:false,empty:false})
            }
    
        }

   

        const handleSubmit = async(event)=> {
            event.preventDefault();
      
            
            if(!number.trim() || !password.trim()){
   
                 setError({
                    number:true,
                    password:true})
                setNumberCheck({empty:true})
                 
            }else{
                await api.post('/login',{number,password}).then
                (res=>{

                    if(res.status == 200){
                    setLoginLock(true)
                    logged(res.data)
                }
                    
                },error=>{
                    
                    if(error.response.status == 400){
                    numberCheck.login = true
                    setError({number:true,password:true})
                }   
                })
            }

    
    
            }
   


    return(
        <div className="logincontainer">
      
        <div id="login-login" className="login">
            
            <img className="spasso-picture" src={img} ></img>
            <form className="login-form">
           
               
            <InputMask className={error.number|| numberCheck.login || numberCheck.empty ? 'form-input invalid' : 'form-input '} mask="(99) 99999-9999" id="telefone" name="telefone" placeholder="Número de Celular" onChange={handleChangeNumber}/>

            <input className={error.password ? 'form-input invalid' : 'form-input '} name={"password"} onChange={handleChangePassword}  type="password" placeholder="Digite sua Senha" ></input>

            <label className="labelerror">{numberCheck.empty ? "Campos Obrigatórios *" : " "}
            {numberCheck.login ? "Número ou Senha Incorretos *" : " "}
            </label>
            <button disabled={loginlock} type="submit" onClick={handleSubmit}>LOGIN</button>
            <span>Não possui conta?<Link className="registerclass" to="/register">Registre-se</Link></span>
            </form>
            
        </div>

        <img className="elementor-video" src={img1}></img>
        </div>


    )


    }

export default Login