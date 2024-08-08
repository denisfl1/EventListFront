import React, { useState } from "react";
import { api } from "./api";
import Swal from "sweetalert2";
import { Shadow_container } from "./components/shadow_container";


function TokenGen(props){

    const [token,setToken]= useState()
    
    const getToken= async()=>{
        
    await api.get('/tokengen').then(
        res=>{  
           if(res.status == 200){
            setToken(res.data._id)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Inspira em 3 minutos!',
                // confirmButtonColor:'#3085d6',
                width:"350px",
                customClass:'swal-wide',
                // confirmButtonText:"OK",
                showConfirmButton:false,
                timer:1500
                
             
              })
            }else{
            props.OpenToken()
        }
        },error=>{
            
            return props.OpenToken()
        }
    )

    }


    return(

        <Shadow_container onClick={props.OpenToken}>


        <div className={"tokengencontainer"}>

            <h3>Novo Token</h3>

                <input defaultValue={token ? token : ""} value={token ? token : ""}></input>
                <div className="tokenbuttons"><button id="canceltoken" onClick={props.OpenToken} >FECHAR</button><button id="genbutton" onClick={getToken}>GERAR</button></div>
        </div>
  

        </Shadow_container>
      
    )     




}
export default TokenGen