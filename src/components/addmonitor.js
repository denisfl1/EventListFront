import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../api";
import { Participate_form } from "../styled_componets/participate_form";
import { AuthContext } from "../authcontroller";


function AddMonitor(props){

    const [names,setNames] = useState(props.username)
    const [fills,setFills] = useState(" - ")
    const {HandleShadow,handleClose} = useContext(AuthContext)
 

    const id = props.id

    const addNameandFill = async ()=>{
 

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


                  return handleClose()
              }
          })
          .catch((error) => {  

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


        return(
          <Participate_form 
          HandleShadow={HandleShadow}
          useradmin={props.useradmin}
          setNames={setNames}
          names={names}
          setFills={setFills}
          addNameandFill={addNameandFill}
          fills={fills}
          handleClose={handleClose}>
          </Participate_form>
        )



}export default AddMonitor