import React, {useEffect,useContext} from "react";
import { useState } from "react";
import { api } from "./api";
import edit from './logos/edit.png'
import { AuthContext } from "./authcontroller";
import EditUser from "./edituser";
import { RotatingLines } from "react-loader-spinner";
import searchicon from './logos/lupa.png'

 function AllUsers(){

    const [users,setUsers] = useState()
    const [select,setSelect] = useState([])
    const [searchUser,setSearchUser]=  useState()
    const [container,setContainer] = useState(false)
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [admin,setAdmin] = useState()
    const [rotating,setRotating] = useState(true)

    const [id,setID] = useState()
   
    const{ID}=useContext(AuthContext)

    useEffect(()=>{

        (async()=>{

        await api.get('/getusers').then(
            res=>{
                setUsers(res.data)
                if(res.data){
                    setRotating(false)
                }
               
            },error=>{
              
            }
        )


        })()


    },[])

  
   

    const GetUsers=(e)=>{
        const value = e.target.value
        if(e.target.checked){
        setSelect((copys=>[...copys,value]))
            
        }else{
            setSelect((copys)=>copys.filter((items)=>items !== value))
         
        }

    }
    

    const excluir= async()=>{

    await api.delete(`/delUsers/${select}`).then(
        res=>{
            
        },error=>{
           
        }
    )
   

    }

    const OpenEdit=(e)=>{
    
    if(!container){
        setContainer(true)
        setID(e.target.id)
    }else{
        setContainer(false)
    }
       
    }

    const hide =(e)=>{
     
    if(e.target.className == "shadowcontainer"){
        setContainer(false)
    }

    }

   const hide1=()=>{

    setContainer(false)

   }


   useEffect(()=>{


    (async(res)=>{

      await api.get(`/getusertoedit/${id}`).then(
        res=>{
           const{id,name,email,admin} = res.data
            setName(name)
            setEmail(email)
            setAdmin(admin)
            setID(id)
            
        },error=>{

        }
      )

    })()
    

    },[id])
   
    const filteredUsers = typeof searchUser !== "undefined" ?
    users.filter((item)=>item.name.toLowerCase().includes(searchUser) ||item.email.toLowerCase().includes(searchUser)):
    users

    

    return(
        <div className="participatelist" onClick={hide}>

        <div className="addheader"><h1>Usuários</h1></div>
        <div className="inputsearch"><input placeholder="Nome ou Email" onChange={(e)=>setSearchUser(e.target.value)}id="searchInput" ></input><img src={searchicon}/></div>
        
        {rotating ?<div className='loading'>
          <RotatingLines   strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true} />
            </div>:
        <table className='table '>

        <thead>

            <tr>

            <th>#ID</th>

            <th>Nome</th>

            <th>Email</th>

            <th>Admin</th>

            <th>Alterar</th>

            <th><form><button id="deleteuser" disabled={select == 0}  type="submit" onClick={excluir}>EXCLUIR</button></form></th>

            
            </tr>

        </thead>
    
        <tbody >

        {typeof filteredUsers !== "undefined" && filteredUsers.map((value, index) => (
        <tr key={index} id={value._id == ID && "MyUser"}>
        <td>{index + 1}</td>
        <td>{value.name}</td>
        <td>{value.email}</td>
        <td><input className="activatelist" checked={value.admin} type="checkbox"></input></td>
        <td><img onClick={OpenEdit} id={value._id} className="edit" src={edit}></img></td>
        <td><input onClick={GetUsers} className="usercheck" type="checkbox" defaultValue={value._id}></input></td>
      </tr>
    ))}

        </tbody>

        </table>}
        <EditUser hide1={hide1} id={id} name={name} email={email} password={password} admin={admin} container={container}/>  
        </div>
        
    )

            

 }export default AllUsers