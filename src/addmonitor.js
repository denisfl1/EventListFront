import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "./api";
import { Shadow_container } from "./components/shadow_container";
import { AuthContext } from "./authcontroller";


function AddMonitor(props){

    const [names,setNames] = useState()
    const [fills,setFills] = useState(" - ")
    const {HandleShadow,shadowcontainer} = useContext(AuthContext)
 

    const id = props.id

    const addNameandFill = async (event)=>{
        event.preventDefault()


        if(!names.trim())return

    
      api.post("/addnameandfill", { id, names, fills })
          .then((res) => {
              if (res.status === 200) {
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Adicionado com Sucesso!',
                      confirmButtonColor: '#3085d6',
                      width: "350px",
                      customClass: 'swal-wide',
                      confirmButtonText: "Fechar",
                  });


                  return shadowcontainer.addMonitor = false
              }
          })
          .catch((error) => {  // Aqui está a correção
              Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Você já está na lista!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: "Fechar",
                  width: "350px",
                  heightAuto: false,
                  customClass: 'swal-wide',
              });

          })

     
        
    }

      useEffect(()=>{

        setNames(props.username)

      },[props.username])
 

        return(
            <Shadow_container funcao={(e)=>HandleShadow(e)}>
            
            <div className={"addmonitor"}>
            <label for="names">Nome
            <input disabled={!props.useradmin} name={"names"}  type="text" onChange={(event)=> setNames(event.target.value)} value={names} ></input>
            </label>
            <label>Serviço Aux.?</label>
            <select  name={"fills"}  onChange={(event)=> setFills(event.target.value)} value={fills}>
            <option value=" - ">-</option>
            <option value=" - ">NÃO</option>
            <option value="SIM">SIM</option>
            
            </select>
            <div className="monitorsbuttons"><button type="reset" onClick={()=>shadowcontainer.addMonitor = false} id="cancelbtn">Cancelar</button><button onClick={addNameandFill} type="reset" id="savebtn">Salvar</button></div>
            </div>
           
            </Shadow_container>
        )



}export default AddMonitor