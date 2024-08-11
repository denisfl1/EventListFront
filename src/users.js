import React, {useEffect,useContext} from "react";
import { useState } from "react";
import { api } from "./api";
import edit from './logos/edit.png'
import { AuthContext } from "./authcontroller";
import EditUser from "./edituser";
import { RotatingLines } from "react-loader-spinner";
import searchicon from './logos/lupa.png'
import Swal from "sweetalert2";

 function AllUsers(){

    const [users,setUsers] = useState()
    const [select,setSelect] = useState([])
    const [searchUser,setSearchUser]=  useState()
    const [data,setData] = useState()
    const [rotating2,setRotating2] = useState(true) 

    const [id,setID] = useState()
   
    const{ID,shadowcontainer}=useContext(AuthContext)

    useEffect(()=>{

        (async()=>{

        await api.get('/getusers').then(
            res=>{
                setUsers(res.data)
                
                if(res.data){
                    setRotating2(false)
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

    const excluir= async(e)=>{
        e.preventDefault()

        Swal.fire({
            title: `Deseja excluir este${select.length>1 ?"s" :""} usuário${select.length>1 ?"s" :""}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText: "Não"
          }).then(async(result) => {
            if (result.isConfirmed) {

                await api.delete(`/delUsers/${select}`).then(
                    res=>{
                    setUsers((prev)=>prev.map((it)=>it).filter((item)=>!select.includes(item._id)))
                    Swal.fire({
                        title: "Apagado com sucesso!",
                        icon: "success"
                    });
                    setSelect([])
                   

                    },error=>{
                       
                    }
                )

            }
          });


   

    }


    const OpenEdit=(e)=>{
    
        shadowcontainer.editUser = true
        // setContainer(true)
        setID(e.target.id)
  
       
    }


   useEffect(()=>{


    (async()=>{

      await api.get(`/getusertoedit/${id}`).then(
        res=>{
            setData(res.data)
        //    const{id,name,number,admin} = res.data
            // setName(name)
            // setNumber(number)
            // setAdmin(admin)
            // setID(id)
            // setData
        },error=>{

        }
      )

    })()
    

    },[id])
   
    const filteredUsers = typeof searchUser !== "undefined" ?
    users.filter((item)=>item.name.toLowerCase().includes(searchUser) ||item.name.includes(searchUser) ||item.number.includes(searchUser)):
    users

    

    return(
        <div className="participatelist" >

        <div className="addheader"><h1>Usuários</h1></div>
        <div className="inputsearch"><input placeholder="Nome ou Número" onChange={(e)=>setSearchUser(e.target.value)}id="searchInput" ></input><img src={searchicon}/></div>
        
        {rotating2 ?<div className='loading'>
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

            <th>Número</th>

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
        <td>{value.number}</td>
        <td><input className="activatelist" checked={value.admin} type="checkbox"></input></td>
        <td><img onClick={OpenEdit} id={value._id} className="edit" src={edit}></img></td>
        <td><input onClick={GetUsers} className="usercheck" type="checkbox" defaultValue={value._id}></input></td>
      </tr>
    ))}

        </tbody>

        </table>}
      {shadowcontainer.editUser && data && <EditUser data={data} /> }

        </div>
        
    )

            

 }export default AllUsers