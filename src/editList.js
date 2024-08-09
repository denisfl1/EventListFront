import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from './api';
import { Shadow_container } from './components/shadow_container';
import { AuthContext } from './authcontroller';
import { EventForm } from './components/Event_Form';


function EditList(props){

    const {editId} = props
    const [id,setID] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [extrachange,setExtraChange] = useState()
    const [extratime,setExtraTime] = useState()

   
    const{HandleShadow,handleCancelClick}= useContext(AuthContext)
    
    useEffect(() => {
        
        (async()=>{

            await api.get("/editId/" + editId).then(
                res=>{
                    const {_id,date,time,extratime} = res.data

                    const translatedate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

                    setID(_id)
                    setDate(translatedate)
                    setTime(time)
                    setExtraTime(extratime)

                    if(extratime && extratime  === " - ")return setExtraChange(false)
                        return setExtraChange(true)
            
                }
            )
          
        
        })()


      },[editId]);
      
      

    const enviar = async ()=>{
     
        const formatteddate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
 
        await api.put("/editlist",{id,formatteddate,time,extratime}).then(
            res=>{
                if(res.status == 200){

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
                   return handleCancelClick()
                }
             
            },error=>{
                console.log(error)
            }
        )
        

             
       
    }

        
    
   

    return(
      
      <Shadow_container funcao={(e)=>HandleShadow(e)} >
        

        <EventForm 
                
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                extrachange={extrachange}
                setExtraChange={setExtraChange}
                extratime={extratime}
                setExtraTime={setExtraTime}
                // CheckOption={CheckOption}
                enviar={enviar}
                handleCancelClick={handleCancelClick}>
                 
        </EventForm>


        </Shadow_container>
 
) 

}

export default EditList