import React from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from './api';




function List(props){


    const [date,setDate] = useState(" ")
    const [time,setTime] = useState(" ")
    const [extrachange,setExtraChange] = useState(" - ")
    const [extratime,setExtraTime] = useState()



    const CheckOption = (e)=>{
     

        if(e.target.value == " - "  || extratime == " "){
            setExtraTime()
        }

    }

    

    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    

    const enviar= async (e)=>{
        // e.preventDefault()
            

        if(!time.trim()  || !date.trim()){
      
            Swal.fire({


                position: 'center',
                icon: 'error',
                title: 'Preencha os Campos Necessários!',
                confirmButtonColor:'#3085d6',
                confirmButtonText:"Fechar",
                width:"380px",
                // buttonsStyling:false,
                heightAuto:false,
                customClass:'swal-wide'
                

                 
              })
           
              
        }else{
  
         
        await api.post("/newevent",{formattedDate,time,extratime}).then
        (res=>{

            
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
      
       props.hidemodal()
    
            
        },error=>{
         
        })

    }   
        
       
    }

        
    
   

    return(
      
        <div className={props.show ? "shadowcontainer" : "shadowcontainer-hide"}>
        
        <div  className={"listform"} >
     
       
        <h3>ADICIONE UM EVENTO</h3>
        
        <label for="date">Data do Evento</label>
        <input type='date' name={"date"} onChange={(event) => setDate(event.target.value)}></input>
         
       
        <label for="time">Horário</label>
        <input type='time' name={"time"} onChange={(event) => setTime(event.target.value)}></input>
        
        <label>Hora Extra</label>
        <select  name={"extrachange"} onClick={CheckOption} onChange={(event) => setExtraChange(event.target.value)} defaultValue={extrachange}>      
            <option selected Value=" - " >-</option>
            <option Value=" - ">NÃO</option>
            <option Value="Sim">SIM</option>
          
        </select>
        <label>Horas a Mais</label>
        <input name={"time"} disabled ={extrachange == " - " } type='time' onChange={(event) => setExtraTime(event.target.value)} defaultValue={extratime} ></input>
      
    
        <div className='editbuttons'><button  id="cancel"  onClick={props.hidemodal} >CANCELAR</button><button  id="save" onClick={enviar}>ADICIONAR</button></div>
        </div> 

        </div>
    
        
 
) 

}

export default List