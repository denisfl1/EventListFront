import React, { useContext, useState } from "react";
import { api } from "./api";
import Swal from "sweetalert2";
import { Token_gen} from "./styled_componets/token";
import { AuthContext } from "./authcontroller";


function TokenGen(props){

    const [token,setToken]= useState()
    const {HandleShadow,shadowcontainer} = useContext(AuthContext)
    
    const genToken= async()=>{
        
    await api.get('/tokengen').then(res => {  
        if(res.status === 200){
            setToken(res.data._id);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Inspira em 3 minutos!',
                width: "350px",
                customClass: 'swal-wide',
                showConfirmButton: false,
                timer: 1500
            });
        }   
             })
            .catch(error => {
                shadowcontainer.token = false    
            })
            

    }


    return(
      
        <Token_gen  
        
        token={token} 
        genToken={genToken} 
        shadowcontainer={shadowcontainer} 
        HandleShadow={HandleShadow}>

        </Token_gen>
    )     




}
export default TokenGen