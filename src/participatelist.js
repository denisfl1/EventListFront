import React, { useContext, useEffect, useState } from "react";
import edit from './logos/edit.png'
import del from './logos/delete.png'
import { useParams } from "react-router-dom";
import AddMonitor from "./addmonitor";
import EditMonitor from "./editmonitor"
import { api,SOCKET} from "./api";
import Swal from "sweetalert2";
import { AuthContext } from "./authcontroller";
import { RotatingLines } from "react-loader-spinner";
import { Table } from "./styled_componets/table";
import {Table_Container} from "./styled_componets/container"
import { Button } from "./styled_componets/button";


function Participate(){

    const {id} = useParams()
    const [alldata,setallData] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [extratime,setExtraTime] = useState()
    const [btn,setBtn] = useState()
    const [position,setPosition] = useState()
    const [userid,setuserid]= useState()
    const [username,setusername] = useState()
    const [useradmin,setuseradmin] = useState()
    const [rotating1,setRotating1] = useState(true)


    const {lockedButton,shadowcontainer} = useContext(AuthContext)
    

    const getID =(event)=>{

        shadowcontainer.editMonitor = true
        setPosition(event.target.id)
        

    }

    const delmonitor = async (event)=>{
    
    const position = event.target.id
        
    await api.put(`/delnamesandfills/${id}`,{position}).then(
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
        
               
        SOCKET.on('participate',(list)=>{
      
            setallData([list])
            setDate(list.date)
            setTime(list.time)
            setExtraTime(list.extratime)
            setBtn(list.lockbtn)
            
            if([list]){
                setRotating1(false)
            }

                
           })
           
        //    SOCKET.on('participateerror',(error)=>{
           
        //     return SOCKET.disconnect()
            
        //    })
           
           SOCKET.emit('participatelist',id)

    

           return () => {
            SOCKET.removeAllListeners("participate");
            }

      

    },[alldata])

  
    useEffect(()=>{
    
       
        (async ()=>{
        
            await api.get('/getuser').then(
                res=>{
                   
                    const {id,name,admin} = res.data
                    setuserid(id)
                    setusername(name)
                    setuseradmin(admin)
               
        
                },error=>{

                }
             )   
    
        })();
        
  
       },[useradmin,username])



    return(
    <Table_Container participate>
    
    <div className="addheader"><h1>Funcionários</h1>{typeof alldata != "undefined" && alldata[0] && !rotating1 &&<h2>Evento: {date} - {time} {extratime !== " - " ? " + " + extratime  + " Extra " : " "} </h2>}<Button add_event disabled={!btn && !lockedButton}  onClick={()=>shadowcontainer.addMonitor = true}>Participar</Button></div>
    

    {rotating1 ?
    
        <div className='loading'>
          <RotatingLines  strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true} />
        </div> :

        <Table>


        <thead>
            <tr>
                <th>#ID</th>
                <th>Nome</th>
                <th>Serviço Auxiliar</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
        </thead>
        
    <tbody className={id}>

        {typeof alldata !== "undefined" && alldata.map((value,index)=>{
            return (
                <>
                {Object.keys(value.names).map((key)=>(
                    <tr key={key} id={userid == value.myID[key] && "MyUser"}>
                    <td>{1 + index++}</td>
                    <td>{value.names[key]}</td>
                    <td>{value.fills[key]}</td>
                    <td><img hidden={userid !== value.myID[key] && !lockedButton} id={key}  onClick={(event)=>getID(event)} className="edit" src={edit} ></img></td>
                    <td><img hidden={userid !== value.myID[key] && !lockedButton} id={key} name={value.myID[key]}  className="del" src={del} onClick={delmonitor}></img></td>
                </tr>
            

                ))}
               </>
            )
        })} 

    
    </tbody>

    </Table>}

        {shadowcontainer.addMonitor && <AddMonitor  id={id} userid={userid} username={username} useradmin={useradmin}></AddMonitor>}
        {shadowcontainer.editMonitor && <EditMonitor id={id}  useradmin={useradmin} position={position} ></EditMonitor>}
    </Table_Container>)


}

export default Participate