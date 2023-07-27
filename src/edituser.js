import React, { useEffect, useState } from "react";
import { api } from "./api";


function EditUser(props){

    

    const [ocultOption,setOcultOption] = useState(false)
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [admin,setAdmin] = useState()
    const id = props.id
    

    const [error,setError] = useState({
        fullname:false,
        email:false,
       
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
    console.log(error.email)
    }


    
    useEffect(()=>{
        
  
    setName(props.name)
    setEmail(props.email)
    setAdmin(props.admin)

      
    },[props.name,props.email,props.admin])
    
    const saveSettings= async()=>{
   
    
    if(error.email || error.fullname || !name.trim() || !email.trim()){
    return
    }
    
    await api.put('/edituser',{id,name,email,admin}).then(
        res=>{
            
        },error=>{

            console.log(error)
        }
    )
        window.location.reload()

    }

    const ocult =(e)=>{
       
        if(e.target == "true" || "false"){
            setOcultOption(true)     
        
        }
       
            
        }

    const close=()=>{
    setError(
        {fullname:false,email:false}
    )

    props.hide1()

    }

    return(

    <div className={!props.container ? "shadowcontainer-hide" : "shadowcontainer"}>

    <div className={props.container ? "EditUser" : "EditUser-hide"}>
        <h3>ALTERAR DADOS</h3>

        {error.fullname ? <label id="inputmatch" for="name">Nome Inválido</label>:<label for="name">Nome de Usuário</label>}
        <input className={error.fullname && "form-input invalid" } disabled={!props.name} name="name" defaultValue={name} value={name} onChange={handleChangeName}></input>
        

        {error.email ? <label id="inputmatch" for="email">Email Inválido</label>:<label for="email">Email Atual</label>}
        <input className={error.email && "form-input invalid"} disabled={!props.email} name="email" defaultValue={email} value={email} onChange={handleChangeEmail}></input>

       
        
        <label for="admin">Administrador </label>
        <select disabled={props.admin == null} onClick={ocult} onChange={(e)=>(setAdmin(e.target.value))}  type="select" name="admin">
        
        <option hidden={ocultOption} selected={props.admin} defaultValue={props.admin} value={props.admin}>{props.admin ? "SIM" : "NÃO"}</option>
        <option value={true}>SIM</option>
        <option value={false}>NÃO</option>

        </select>
       
       <div className="editbuttons"> <button type="reset" onClick={close} id="canceledituser">Cancelar</button> <button  onClick={saveSettings} id="saveedituser">Salvar</button></div>


    </div>

    </div>
)





}export default EditUser