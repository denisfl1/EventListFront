import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import './App.css';
import Addlist from './addlist'
import icon from './logos/redimensionar.png'
import edit from './logos/edit.png'
import del from './logos/delete.png'
import Swal from 'sweetalert2';
import EditList from './editList';
import { Link } from 'react-router-dom';
import { api } from './api';
import { AuthContext } from './authcontroller';
import { SOCKET} from './api';
import {RotatingLines} from 'react-loader-spinner'




function Feslist(props){
   

    const [show,setShowModal] = useState()
    const [show1,setShowModal1] = useState()
    const [festlist,setFestList] = useState()
    const [editId,setEditId] = useState()
    const [rotating,setRotating] = useState(true)
   

    const {lockedButton} = useContext(AuthContext)
  

    function hide(e){
    
    if(e.target.className == 'addlist' || e.target.className == "shadowcontainer"){
        setShowModal(false)
        setShowModal1(false)
        
    }
    }

    const participate = (event) =>{
    
    
        const id = event.target.id
        setEditId(id)
       

    }

   
    const handlecheck= async (event)=>{

        const checklist = event.target.checked 
        const id = event.target.id
       
       

        await api.put("/editlockbutton",{id,checklist}).then(
            res=>{
            
            },error=>{
                
           
            }
        )

    }
    

    const handleEdit = (event)=>{
   
    
    const id = event.target.id
    setEditId(id)
  
 
    if(!show){
        setShowModal1(true)
    
    }else{
        setShowModal1(false)
    }    
    }




    function hidemodal(){

        setShowModal(false)
        
    }

    function hidemodal1(){

    
        setShowModal1(false)
     
        
    }




    const delEvent  = async (e)=>{


        const id = e.target.id

        
        await api.delete(`/delete/${id}`).then(
            res=>{
              
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Apagado com Sucesso!',
                    confirmButtonColor:'#3085d6',
                    width:"350px",
                    customClass:'swal-wide',
                    confirmButtonText:"Fechar",
                    // showConfirmButton:false,
                    // timer:1500  
                 
                  })
           
            },error=>{
               
                Swal.fire({

                    position: 'center',
                    icon: 'error',
                    title: 'Acesso Negado!',
                    confirmButtonColor:'#3085d6',
                    confirmButtonText:"Fechar",
                    width:"350px",
                    // buttonsStyling:false,
                    heightAuto:false,
                    customClass:'swal-wide'
                
                     
                  })
                  

            }
            
        )

    }

  
    useEffect(()=>{

      
            SOCKET.on('initialList',(list)=>{
            
            setFestList(list)
                
                if(festlist){
                    setRotating(false)
                }  
           
            
            })
    
     
            
            // SOCKET.on('initialListError',(error)=>{
                
            // return SOCKET.disconnect()

            // })
            
            SOCKET.emit('allList')

    

        return () => {
            SOCKET.removeAllListeners("initialList");
            };
        
          

    },[festlist])

 



    return(
      
        
       
    
   
    <div id={show1 ? "festcontainer-edit" : "festcontainer"} className={show ? 'festcontainer-open' : 'festcontainer' }  onClick={hide}>
      
      
        <div className='addheader'><h1>{typeof festlist != "undefined" && festlist.length == 0 && !rotating ? "Não há festas Disponíveis" :"Eventos Disponíveis"  }</h1><button hidden={!lockedButton} onClick={()=>{setShowModal(true)}}>Novo Evento</button></div>
        
        {rotating && <div className='loading'>
          <RotatingLines   strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true} />
            </div>}
              
        {!rotating && festlist.length > 0 &&
        <table className='table '>
                
                <thead >
                
                    <tr >
                        <th> #ID </th>
    
                        <th> Data </th>
    
                        <th>Horário</th>
    
                        <th> Hora Extra</th>
    
                        <th>Participar</th>

                        <th hidden={!lockedButton}>OFF/ON</th>

                        <th hidden={!lockedButton}>Editar</th>

                        <th hidden={!lockedButton}>Excluir</th>
    
                    </tr>
    
                </thead>
                <tbody> 

              
                
                
              {typeof festlist !== "undefined" && festlist.map((value,index)=>{
              return  <tr key={index + 1} > 
              <td>{index + 1 }</td>
              <td>{value.date}</td>
              <td>{value.time}</td>
              <td>{value.extratime}</td>
              <td><Link to={`/participatelist/${value._id}`}><img onClick={participate} id={value._id} className='icon' src={icon}></img></Link></td>
              <td hidden={!lockedButton}><input onClick={handlecheck} id={value._id} className='activatelist' type="checkbox" checked={value.lockbtn} defaultValue={value.lockbtn} ></input></td>
              <td hidden={!lockedButton}><img  onClick={handleEdit} id={value._id} className="edit" src={edit}>
              </img></td>
              <td hidden={!lockedButton}><img onClick={delEvent} id={value._id} className='del' src={del}></img></td>

              </tr>
            
             
              })}      
    
                
    
     
                </tbody> 
                
    
        
              
            </table>}  

           
            

            <Addlist  show={show} hidemodal={hidemodal} />
            <EditList editId={editId} show1={show1} hidemodal1={hidemodal1} />
            
      
        
      </div>
      
    )

    

}

export default Feslist