import React, { useContext, useState } from "react";
import { api } from "./api";
import Swal from "sweetalert2";
import { Shadow_container } from "./styled_componets/shadow_container";
import { AuthContext } from "./authcontroller";


function TokenGen(){

    const [token,setToken]= useState()
    const {HandleShadow,shadowcontainer} = useContext(AuthContext)
    
    const getToken= async()=>{
        
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

        <Shadow_container funcao={(e)=>HandleShadow(e)}>


        <div className={"tokengencontainer"}>

            <h3>Novo Token</h3>

                <input defaultValue={token ? token : ""} value={token ? token : ""}></input>
                <div className="tokenbuttons"><button id="canceltoken" onClick={()=>shadowcontainer.token = false}>FECHAR</button><button id="genbutton" onClick={getToken}>GERAR</button></div>
        </div>
  

        </Shadow_container>
      
    )     




}
export default TokenGen