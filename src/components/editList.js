import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from '../api';
import { AuthContext } from '../authcontroller';
import { EventForm } from  '../styled_componets/Event_Form';


function EditList(props){

    const {editId} = props
    const [id,setID] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [extrachange,setExtraChange] = useState()
    const [extratime,setExtraTime] = useState()

   
    const{HandleShadow,handleClose}= useContext(AuthContext)
    
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
                   return handleClose()
                }
             
            },error=>{
                console.log(error)
            }
        )
        

             
       
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

export default EditList