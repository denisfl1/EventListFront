import React,{useContext} from "react";
import {useState} from 'react'
import { AuthContext} from "./authcontroller";
import { api } from "./api";
import { Navigate } from "react-router-dom";
import {Table_Container} from './styled_componets/container'
import { Login_form } from "./styled_componets/login";


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
                    console.log(error.response.data)
                    if(error.response.data === "Token Inválido")return setError({token:true} ) 

                    if(error.response.data === "Número já existe")return setNumberCheck({login:true})
                   

                }
            )
                          
           
            }
       
        }
    

    return(

        <Table_Container>

        < Login_form
        
                handleChangeName={handleChangeName}
                handleChangeNumber = {handleChangeNumber}
                handleChangeToken={handleChangeToken}
                numberCheck = {numberCheck}
                loginlock = {loginlock}
                error = {ERROR}
                handleSubmit = {handleSubmit}
                handleChangePassword = {handleChangePassword}
                register={true}>

        </Login_form>

    
        </Table_Container>

        
   
    
    )

}

export default Register