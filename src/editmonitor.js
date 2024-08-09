import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "./api";
import { AuthContext } from "./authcontroller";
import { Shadow_container } from "./components/shadow_container";


function AddMonitor(props){

    const [names,setNames] = useState()
    const [fills1,setFills1] = useState()
    const [ocultOption,setOcultOption] = useState(false)
    const {shadowcontainer,HandleShadow} = useContext(AuthContext)

    const id = props.id
    const position = props.position

    const ocult =(e)=>{
    
    if(e.target.value == fills1){
        setOcultOption(true)
    
    }
   
        
    }



    useEffect(()=>{

    const getDATA= async (req,res)=>{
        
        await api.get(`/getnamesandfillstoedit/${id}/${position}`).then(
        res=>{
            const {names,fills} = res.data
            setNames(names)
            setFills1(fills)

            
        },error=>{
            
        }

    )}
       
        getDATA()  

    },[position])


    const UpdateNamesandFills = async (event)=>{
 


        if(!names.trim()){
           return 
          }

            await api.put("/updatenamesandfills",{id,position,names,fills1}).then
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
             
              },error=>{
                
              })
              

              
        
    }


   

        return(
            <Shadow_container funcao={(e)=>HandleShadow(e)}>
            
            <form className={"editmonitor"}>
            <label for="names">Nome
            <input name={"names"} disabled={!props.useradmin}   type="text" onChange={(event)=> setNames(event.target.value)} defaultValue={names}></input>
            </label>
            <label>Serviço Aux.?</label>

    
            <select onClick = {ocult} onChange={(event)=> setFills1(event.target.value)} >

            <option hidden={ocultOption} value={fills1} selected>{fills1}</option>
            <option value="SIM">SIM</option>
            <option value="-" >NÃO</option>


            </select>
            <div className="monitorsbuttons"><button type="reset" onClick={()=>shadowcontainer.editMonitor = false} id="cancelbtn">Cancelar</button><button  type="reset" onClick={UpdateNamesandFills} id="savebtn">Salvar</button></div>
            </form>
           
            </Shadow_container>
        )



}export default AddMonitor