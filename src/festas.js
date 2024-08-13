import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import './App.css';
import Addlist from './components/addlist'
import icon from './logos/redimensionar.png'
import edit from './logos/edit.png'
import del from './logos/delete.png'
import Swal from 'sweetalert2';
import EditList from './components/editList';
import { Link } from 'react-router-dom';
import { api } from './api';
import { AuthContext } from './authcontroller';
import { SOCKET} from './api';
import {RotatingLines} from 'react-loader-spinner'
import { Table } from  './styled_componets/table';
import { Table_Container } from './styled_componets/container';
import { Button } from './styled_componets/button';


function Feslist(props){
   
    const [festlist,setFestList] = useState()
    const [editId,setEditId] = useState()
    const [rotating,setRotating] = useState(true)
   

    const {lockedButton,shadowcontainer} = useContext(AuthContext)
  

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
                console.log(error)
           
            }
        )

    }
    

    const handleEdit = (id)=>{
   
    
    const ID = id
    setEditId(ID)
    shadowcontainer.editList = true
  
  
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
      
    
    <Table_Container event_list>
      
      
        <div className='addheader'>
            <h1>{typeof festlist != "undefined" && festlist.length == 0 && !rotating ? "Não há festas Disponíveis" :"Eventos Disponíveis"  }</h1>
            <Button add_event hidden={!lockedButton} onClick={()=>shadowcontainer.addList = true}>Novo Evento</Button>
        </div>
        
        {rotating && <div className='loading'>
          <RotatingLines   strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true} />
            </div>}
              
        {!rotating && festlist.length > 0 &&

        <Table>

            <thead>
                <tr>

                <th>#ID</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Hora Extra</th>
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
              <td hidden={!lockedButton}><input onClick={handlecheck} id={value._id} className='activatelist' type="checkbox" checked={value.lockbtn} value={value.lockbtn} ></input></td>
              <td hidden={!lockedButton}><img  onClick={()=>handleEdit(value._id)} id={value._id} className="edit" src={edit}>
              </img></td>
              <td hidden={!lockedButton}><img onClick={delEvent} id={value._id} className='del' src={del}></img></td>

              </tr>
            
             
              })}      
    
                
    
     
                </tbody> 
                       
            </Table>}  

           

            {shadowcontainer.addList && <Addlist />}
            {shadowcontainer.editList && <EditList editId={editId}/>}
            
      
        
      </Table_Container>
      
    )

    

}

export default Feslist