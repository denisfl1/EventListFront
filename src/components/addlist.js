import React, { useContext } from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from '../api';
import { AuthContext } from '../authcontroller';
import { EventForm } from '../styled_componets/Event_Form';


function List(){

    const [date,setDate] = useState(" ")
    const [time,setTime] = useState(" ")
    const [extrachange,setExtraChange] = useState(false)
    const [extratime,setExtraTime] = useState()
    const {HandleShadow,handleClose} = useContext(AuthContext)


    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    
    const enviar= async ()=>{
        
            
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

         if(res.status === 200){
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
      
     return handleClose()

    }

       
        },error=>{
         
        })

    }   
  
       
    }

        
   

    return(

                <EventForm 
                
                HandleShadow={HandleShadow}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                extrachange={extrachange}
                setExtraChange={setExtraChange}
                extratime={extratime}
                setExtraTime={setExtraTime}
                enviar={enviar}
                handleClose={handleClose}>
                 
                </EventForm>
        
 
) 

}

export default List