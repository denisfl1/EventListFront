import React, { useContext } from "react";
import {useState} from 'react';
import { AuthContext } from "./authcontroller";
import { api } from "./api";
import './App.css';
import {Table_Container} from './styled_componets/container'
import {  Login_form } from "./styled_componets/login";


function Login(){

    const [number,setNumber] = useState(" ")
    const [password,setPassword] = useState(" ")
    const [numberCheck,setNumberCheck] = useState({login:false,empty:false})
    const [loginlock,setLoginLock] = useState(false)

    const [error,setError] = useState({
    number:false,
    password:false,
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

        <Table_Container login>

        < Login_form
        
        handleChangeNumber = {handleChangeNumber}
        numberCheck = {numberCheck}
        loginlock = {loginlock}
        error = {error}
        handleSubmit = {handleSubmit}
        handleChangePassword = {handleChangePassword}>


        </Login_form>


    </Table_Container>

    

    )


    }

export default Login