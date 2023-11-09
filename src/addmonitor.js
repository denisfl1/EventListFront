import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "./api";


function AddMonitor(props){

    const [names,setNames] = useState()
    const [fills,setFills] = useState(" - ")
 

    const id = props.id


    const addNameandFill = async (event,req,res)=>{
        event.preventDefault()


        if(!names.trim()){
         return 
        }
      

          await api.post("/addnameandfill",{id,names,fills}).then
          (res =>{
              
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Adicionado com Sucesso!',
                confirmButtonColor:'#3085d6',
                width:"350px",
                customClass:'swal-wide',
                confirmButtonText:"Fechar",
                // showConfirmButton:false,
                // timer:1500
                
             
              })
         
            },error=>{

              Swal.fire({

                position: 'center',
                icon: 'error',
                title: 'Você já está na lista!',
                confirmButtonColor:'#3085d6',
                confirmButtonText:"Fechar",
                width:"350px",
                // buttonsStyling:false,
                heightAuto:false,
                customClass:'swal-wide'
            
                 
              })
            
           
           
            })
            
            props.hidecontainer()
           
       
        
        

        
    }

      useEffect(()=>{

        setNames(props.username)

      },[props.username])
 

        return(
            <form className={props.monitorcontainer ? "shadowcontainer" : "shadowcontainer-hide"}>
            
            <div className={props.monitorcontainer ? "addmonitor" : "addmonitor-hide"}>
            <label for="names">Nome
            <input disabled={!props.useradmin} name={"names"}  type="text" onChange={(event)=> setNames(event.target.value)} defaultValue={names} ></input>
            </label>
            <label>Serviço Aux.?</label>
            <select  name={"fills"}  onChange={(event)=> setFills(event.target.value)} defaultValue={fills}>
            <option value=" - ">-</option>
            <option value=" - ">NÃO</option>
            <option value="SIM">SIM</option>
            
            </select>
            <div className="monitorsbuttons"><button type="reset" onClick={props.hidecontainer} id="cancelbtn">Cancelar</button><button onClick={addNameandFill} type="reset" id="savebtn">Salvar</button></div>
            </div>
           
            </form>
        )



}export default AddMonitor