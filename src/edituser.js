import React, { useEffect, useState } from "react";
import { api } from "./api";
import Swal from "sweetalert2";
import { My_Account } from "./styled_componets/my_account";
import { useContext } from "react";
import { AuthContext } from "./authcontroller";


function EditUser(props){

    const [name,setName] = useState()
    const [number,setNumber] = useState()
    const [admin,setAdmin] = useState()
    const [id,setID] = useState()
    const {handleClose,HandleShadow,lockedButton} = useContext(AuthContext)


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
   
    setName(props.data.name)
    setNumber(props.data.number)
    setAdmin(lockedButton)
    setID(props.data.id)
        

    },[props.data])
    
    const saveSettings= async()=>{

    
    if(error.number || error.fullname || !name.trim() || !number.trim())return
    
    
    await api.put('/edituser',{id,name,number,admin}).then(
        res=>{
            window.location.reload()
        },error=>{
           
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


    return(


        <My_Account 
        
        id={id} 
        name={name} 
        number={number} 
        admin={admin}
        setAdmin={setAdmin}
        handleChangeNumber={handleChangeNumber}
        handleChangeName={ handleChangeName}
        saveSettings={saveSettings}
        editUser={true}
        error={error}
        handleClose={ handleClose}
        HandleShadow={HandleShadow}
    
        ></My_Account >


)





}export default EditUser