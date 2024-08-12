import React,{useContext} from "react";
import {useState,useEffect} from 'react'
import img from './logos/loremipsumlogo1.png'
import { AuthContext} from "./authcontroller";
import { api } from "./api";
import { Navigate } from "react-router-dom";
import InputMask from "react-input-mask";
import img1 from './logos/wallpapperlorem.jpg'


    function Register(){


    const [name,setName] = useState(" ")
    const [number,setNumber] = useState(" ")
    const [password,setPassword] = useState(" ")
    const [authtoken,setAuthtoken] = useState(" ")
    const [numberCheck,setNumberCheck] = useState({login:false,empty:false})
    const [loginlock,setLoginLock] = useState(false)


    const [ERROR,setError] = useState({
    fullname:false,
    number:false,
    password:false,
    token:false
   
    })

    const {logged} = useContext(AuthContext)


    const handleChangeName=(event)=>{
        const values = event.target.value
        const explodeString = values.split(" ")
        const filter = explodeString.filter((data)=>{return data !== ''})
     
    setName(values)
        
    if(!filter[1] ){
        ERROR.fullname = true
   
    }else{
        ERROR.fullname = false
   }
    
    if(values){
        numberCheck.empty = false
    }


 
    }

    const handleChangeNumber=(event)=>{
      const regex =  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
      const values = event.target.value
      setNumber(values)

      if(!regex.test(values) || values == " "){
       ERROR.number = true
        return
      }ERROR.number = false
       
      if(values){
        setNumberCheck({login:false,empty:false})
      }

  
    }

    const handleChangePassword=(event)=>{
        
        const values = event.target.value
        setPassword(values)
        

    if(values.length <5  || !values){
        ERROR.password = true
        numberCheck.empty = false

            
    }else{
        ERROR.password=false
    }


    }

    const handleChangeToken=(event)=>{

        const values = event.target.value
        setAuthtoken(values)
        
        if(values){
         ERROR.token = false 
         numberCheck.empty = false

        }
    }


    const handleSubmit = async  (event)=> {
        event.preventDefault()

        if(ERROR.fullname || ERROR.number || ERROR.password || numberCheck.empty || ERROR.token) {
         return   
        }
        if(!name.trim() || !number.trim() || !password.trim() || !authtoken.trim()){
         setNumberCheck({empty:true})

        }else{
           
            
            await api.post('/register',{name,number,password,authtoken}).then(
                res=>{
                    if(res.status == 200){
                        setLoginLock(true)
                        logged(res.data)
                        return <Navigate to="/login"/>
                    }        
                },error=>{ 
                    
                    if(error.response.data === "Token Inválido")return ERROR.token = true

                    if(error.response.data === "Número já existe") return numberCheck.login = true 
                   

                }
            )
                          
           
            }
       
        }
    

    return(
        <div className="logincontainer">
   
           <img className="elementor-video" src={img1}></img>
        <div id="login-register" className="login" >
            
            <img className="spasso-picture" src={img} ></img>
            <form className="login-form"  >
            
            
            <input className={ERROR.fullname || numberCheck.empty ? 'form-input invalid' : 'form-input' } 
            name={"name"} onChange={handleChangeName}
            placeholder="Nome e Sobrenome" ></input>
            <label className="labelerror">{numberCheck.empty ? "" : ERROR.fullname ? "Nome Inválido *":" " }  
            </label>
             
            
             <InputMask className={ERROR.number|| numberCheck.login || numberCheck.empty ? 'form-input invalid' : 'form-input '} mask="(99) 99999-9999" id="telefone" name="telefone" placeholder="Número de Celular" onChange={handleChangeNumber}/>
             <label className="labelerror">{numberCheck.login || numberCheck.empty ? "" :ERROR.number ? "Número Inválido *" : "  "} 
             {numberCheck.login ? "Número Já Cadastrado *" : "  "  } 
             </label>
            
            
            <input className={ERROR.password|| numberCheck.empty ? 'form-input invalid' : 'form-input'} 
            name={"password"} onChange={handleChangePassword}  type="password"
             placeholder="Digite sua Senha" ></input>
              <label className="labelerror">{numberCheck.empty ? "" : ERROR.password ? "Mínimo 5 Caracteres *":" "}
              </label>

              
             
              <input  className={ERROR.token || numberCheck.empty ? 'form-input invalid' :'form-input'} name={"token"} onChange={handleChangeToken} placeholder="Token de Autenticação"></input>
              <label  className="labelerror">{ERROR.token ? "Token Inválido *":" "} {numberCheck.empty ?"Campos Obrigatórios *" : " "} </label>
              

            
            <button disabled={loginlock} type="submit" onClick={handleSubmit}>Cadastrar</button>
            </form>
           
           
        </div>
        </div>
    )


}

export default Register