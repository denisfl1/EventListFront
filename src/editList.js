import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from './api';



function EditList(props){

    const {editId} = props
    const [id,setID] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [extrachange,setExtraChange] = useState()
    const [extratime,setExtraTime] = useState()


    

    useEffect(() => {
        
        const listAPI = async() =>{

        try{
            const res = await api.get("/editId/" + editId)
            const {_id,date,time,extratime} = res.data
            const translatedate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

            setID(_id)
            setDate(translatedate)
            setTime(time)
            setExtraTime(extratime)
            setExtraChange(" - ")
            
           

        }catch(error){
            
        }


        }
        listAPI()

      },[editId]);
      
  

    const CheckOption = (e)=>{
        
        if(e.target.value == "Não"){
            setExtraTime(" - ")
        }

    }




    const formatteddate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    

    const save= async (e)=>{


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

                }
                props.hidemodal1()
            },error=>{
                props.hidemodal1()
            }
        )
        

             
       
    }

        
    
   

    return(
      
        <div className={props.show1 ? "shadowcontainer" : "shadowcontainer-hide"}>
        
        <form  className={"editlistform "} >
     
       
        <h3>ADICIONE UM EVENTO</h3>
        
        <label for="date">Data do Evento </label>
        <input type='date' name={"date"} onChange={(event) => setDate(event.target.value)} defaultValue={date}></input>
         
       
        <label for="time">Horário</label>
        <input type='time' name={"time"} onChange={(event) => setTime(event.target.value)} defaultValue={time}></input>
        
        <label>Hora Extra</label>
        <select name={"extrachange"} onClick={CheckOption} onChange={(event) => setExtraChange(event.target.value)} defaultValue={extrachange}>      
            
            <option Value=" - " selected={" - "} >-</option>
            <option Value="Não" >NÃO</option>
            <option Value="Sim" >SIM</option>

          
        </select>
        <label>Horas a Mais</label>
        <input name={"time"} disabled ={extrachange == " - " || extrachange == "Não"  } type='time' onChange={(event) => setExtraTime(event.target.value)} defaultValue={extratime}></input>
      
    
        <div className='editbuttons'><button type="reset" id="cancel"  onClick={props.hidemodal1}>CANCELAR</button><button type="reset" id='save' onClick={save}>SALVAR</button></div>
        
        </form>

        </div>

        
 
) 

}

export default EditList