import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../api";
import { AuthContext } from "../authcontroller";
import { Participate_form } from "../styled_componets/participate_form";


function AddMonitor(props){

    const [names,setNames] = useState()
    const [fills,setFills] = useState()
    const {HandleShadow,handleClose} = useContext(AuthContext)

    const id = props.id
    const position = props.position


    useEffect(()=>{

    const getDATA= async ()=>{
        
        await api.get(`/getnamesandfillstoedit/${id}/${position}`).then(
        res=>{
            const {names,fills} = res.data
            setNames(names)
            setFills(fills)

            
        },error=>{
            
        }

    )}
       
        getDATA()  

    },[position])


    const  addNameandFill = async ()=>{
 
        if(!names.trim()){
           return 
          }
    
            console.log(id,position,names,fills)
            await api.put("/updatenamesandfills",{id,position,names,fills}).then
            (res =>{
              
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alterado com Sucesso!',
                    confirmButtonColor:'#3085d6',
                    width:"350px",
                    customClass:'swal-wide',
                    confirmButtonText:"Fechar",
                    // showConfirmButton:false,
                    // timer:1500
                    
                 
                  })
                  return  handleClose()

              },error=>{
                
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