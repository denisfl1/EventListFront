import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
import { api } from './api';
import { Shadow_container } from './components/shadow_container';
import { AuthContext } from './authcontroller';



function EditList(props){

    const {editId} = props
    const [id,setID] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [extrachange,setExtraChange] = useState()
    const [extratime,setExtraTime] = useState()

    const verify =()=>{return  extratime  && extratime  === " - "}
    const{HandleShadow}= useContext(AuthContext)
    
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
      
      

    const CheckOption = (e)=>{
        
        if(!JSON.parse(e.target.value)){
            setExtraTime(" - ")
        }

    }




  
    

    const save= async (e)=>{

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

                }
                props.setShowModal1(false)
            },error=>{
                props.setShowModal1(false)
            }
        )
        

             
       
    }

        
    
   

    return(
      
      <Shadow_container funcao={(e)=>HandleShadow(e)} id={"shadow_container"}>
        
        <form  className={"editlistform "} >
     
       
        <h3>ADICIONE UM EVENTO</h3>
        
        <label for="date">Data do Evento </label>
        <input type='date' name={"date"} onChange={(event) => setDate(event.target.value)} defaultValue={date}></input>
         
       
        <label for="time">Horário</label>
        <input type='time' name={"time"} onChange={(event) => setTime(event.target.value)} defaultValue={time}></input>
        
        <label>Hora Extra</label>
        <select name={"extrachange"} onClick={CheckOption} onChange={(event) => setExtraChange(JSON.parse(event.target.value))} value={extrachange}>      
            
        
            <option value={false} selected={verify()} >NÃO</option>
            <option value={true} selected={!verify()}>SIM</option>

          
        </select>
        <label>Horas a Mais</label>
        <input name={"time"} disabled ={!extrachange} type='time' onChange={(event) => setExtraTime(event.target.value)} value={extratime}></input>
      
    
        <div className='editbuttons'><button type="reset" id="cancel"  onClick={props.s}>CANCELAR</button><button type="reset" id='save' onClick={save}>SALVAR</button></div>
        
        </form>


        </Shadow_container>
 
) 

}

export default EditList