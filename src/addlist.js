import React, { useContext } from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from './api';
import { AuthContext } from './authcontroller';






function List(props){


    const [date,setDate] = useState(" ")
    const [time,setTime] = useState(" ")
    const [extrachange,setExtraChange] = useState(" - ")
    const [extratime,setExtraTime] = useState()

   
    const {lockedButton} = useContext(AuthContext)
    
    

    const CheckOption = (e)=>{
     

        if(e.target.value == " - "  || extratime == " "){
            setExtraTime()
        }

    }

    

    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    

    const enviar= async (e)=>{
        // e.preventDefault()
            

        if(!time.trim()  || !date.trim()){
            console.log('Campos inválidos')
      
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
            console.log(res.status)
            // setDate(" ")
            // setTime(" ")
            // setExtraChange()
            // setExtraTime( ) 
            
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
            console.log(error)
        })

    }   
        
       
    }

        
    
   

    return(
      
        <div className={props.show ? "shadowcontainer" : "shadowcontainer-hide"}>
        
        <div  className={"listform"} >
     
       
        <h3>ADICIONE UMA FESTA</h3>
        
        <label for="date">Data da Festa </label>
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
      
    
        <div className='editbuttons'><button  id="cancel"  onClick={props.hidemodal} >Cancelar</button><button   onClick={enviar}>Adicionar</button></div>
        </div> 

        </div>
    
        
 
) 

}

export default List