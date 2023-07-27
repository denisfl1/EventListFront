import React, { useState } from "react";
import { api } from "./api";


function MyAccount(props){

    const [name,setName] = useState(props.name)
    const [email,setEmail] = useState(props.email)
    const [password,setPassword] = useState()
    const [password1,setPassword1] = useState()
    const [admin,setAdmin] = useState(props.admin)
    const [id,setID] = useState(props.id)

        const [error,setError] = useState({
            fullname:false,
            email:false,
            password:false,
            password1:false,
            match:false
        
            })
    
        const handleChangeName=(e)=>{
            const values = e.target.value
            const explodeString = values.split(" ")
            const filter = explodeString.filter((x)=>{return x!== ""})
            setName(values)
        
            if(!filter[1]){
            error.fullname = true
            }else{
            error.fullname = false
            }
        
            
            }

        const handleChangeEmail=(e)=>{
            const values = e.target.value
            const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/  
            setEmail(values)
            
            if(!regex.test(values)){
            error.email = true
            
            }else{
            error.email = false
                    
            }
     
            }   
        
        const handleChangePassword=(e)=>{
            const values = e.target.value
            setPassword(values)
   
            if(values.length <5 || !values.trim()){
                error.password = true
            }else{
                error.password = false
            }
            
        }

        const handleChangePassword1=(e)=>{
            const values = e.target.value
            setPassword1(values)

            if(error.password1 && values){
                error.password1= false
            }

        }

        


        const saveSettings= async()=>{

            if(error.password || error.name || error.email  || !name.trim() || !email.trim() ){
                return 
            }
            if(password1 != password){
                return error.password1 = true
            }

            await api.put('/edituser1',{id,name,email,password1}).then(
                res=>{
                    
                  
                },error=>{
                    
             
                }
            )
          
            window.location.reload()
            }

         


    return(

        <div className={props.Account ?"shadowcontainer" :"shadowcontainer-hide"} onClick={props.HideShadow}>
    
        <div id={props.Account ? "EditMyUser" : "EditMyUser-hide"} className={"EditUser"}>
            <h3>DADOS PESSOAIS</h3>
    
            {error.fullname ?<label id="inputmatch" for="name">Nome Inválido</label>:<label for="name">Nome de Usuário</label>}
            <input className={error.fullname && "form-input invalid"} disabled={!admin} name="name" defaultValue={name} onChange={handleChangeName}></input>
            
    
            {error.email ? <label id="inputmatch" for="email">Email Inválido</label>:<label for="email">Email Atual</label>}
            <input className={error.email && "form-input invalid"} disabled={!admin} name="email" defaultValue={email} onChange={handleChangeEmail}></input>
    
            {error.password ?<label id="inputmatch" for="password">Mínimo 5 caracteres</label> :<label for="password">Nova Senha</label>}
            <input className={error.password && "form-input invalid"}  type="password"  name="password" onChange={handleChangePassword}></input>
            
           
            {error.password1 ? <label  id="inputmatch" for="password1">Senhas Diferentes</label>:<label for="password1">Confirme a Senha</label>}
            <input className={error.password1 && "form-input invalid"} type="password"  name="password1"  onChange={handleChangePassword1} ></input>
           
           <div className="editbuttons"> <button type="reset"  onClick={props.HideShadow} id="canceledituser">Cancelar</button> <button  onClick={saveSettings} id="saveedituser">Salvar</button></div>
    
    
        </div>
    
        </div>
    )






}export default MyAccount

