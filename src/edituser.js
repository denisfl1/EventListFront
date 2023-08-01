import React, { useEffect, useState } from "react";
import { api } from "./api";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";


function EditUser(props){

    

    const [ocultOption,setOcultOption] = useState(false)
    const [name,setName] = useState()
    const [number,setNumber] = useState()
    const [admin,setAdmin] = useState()
    const id = props.id
   
  

    const [error,setError] = useState({
        fullname:false,
        number:false,
        matchnumber:false
       
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

    const handleChangeNumber=(e)=>{
    const values = e.target.value
    const regex =  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    setNumber(values)

    if(!regex.test(values)){
        error.number = true

    }else{
        error.number = false
        
    }

    }

    
    
    useEffect(()=>{
   
  
    setName(props.name)
    setNumber( props.number)
    setAdmin(props.admin)

    },[props.name,props.admin,props.number])
    
    const saveSettings= async(e)=>{
        e.preventDefault()
    
    if(error.number || error.fullname || !name.trim() || !number.trim()){
    return
    }
    
    await api.put('/edituser',{id,name,number,admin}).then(
        res=>{
            window.location.reload()
        },error=>{
            props.hide1()
            if(error.response.status == 404){
                Swal.fire({

                    position: 'center',
                    icon: 'error',
                    title: 'Número já Existe!',
                    // confirmButtonColor:'#3085d6',
                    // confirmButtonText:"Fechar",
                    width:"350px",
                    // buttonsStyling:false,
                    showConfirmButton:false,
                    heightAuto:false,
                    height:'360px',
                    customClass:'swal-wide',
                    timer:1500
                
                     
                  })
            }
        }
    )


    }

    const ocult =(e)=>{
       
        if(e.target == "true" || "false"){
            setOcultOption(true)     
        
        }
       
            
        }

    const close=()=>{
    setError(
        {fullname:false,number:false}
    )

    props.hide1()

    }

    return(

    <div className={!props.container ? "shadowcontainer-hide" : "shadowcontainer"}>

    <form className={props.container ? "EditUser" : "EditUser-hide"}>
        <h3>ALTERAR DADOS</h3>

        {error.fullname ? <label id="inputmatch" for="name">Nome Inválido</label>:<label for="name">Nome de Usuário</label>}
        <input className={error.fullname && "form-input invalid" } disabled={!props.name} name="name" defaultValue={name} value={name} onChange={handleChangeName}></input>
        

        {error.number ? <label id="inputmatch" for="number">Número Inválido</label>:<label for="number">Número Atual</label>}
        <InputMask className={error.number &&'form-input invalid'}  mask="(99) 99999-9999" id="telefone" name="number"  defaultValue={number}  value={number} onChange={handleChangeNumber}/>
       
        
        <label for="admin">Administrador </label>
        <select disabled={props.admin == null} onClick={ocult} onChange={(e)=>(setAdmin(e.target.value))}  type="select" name="admin">
        
        <option hidden={ocultOption} selected={props.admin} defaultValue={props.admin} value={props.admin}>{props.admin ? "SIM" : "NÃO"}</option>
        <option value={true}>SIM</option>
        <option value={false}>NÃO</option>

        </select>
       
       <div className="editbuttons"> <button type="reset" onClick={close} id="canceledituser">Cancelar</button> <button  onClick={saveSettings} id="saveedituser">Salvar</button></div>


    </form>

    </div>
)





}export default EditUser