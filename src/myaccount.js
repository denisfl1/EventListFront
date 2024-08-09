import React, { useContext, useState } from "react";
import { api } from "./api";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import { Shadow_container } from "./components/shadow_container";
import { AuthContext } from "./authcontroller";


function MyAccount(props){

    const [name,setName] = useState(props.name)
    const [number,setNumber] = useState(props.number)
    const [password,setPassword] = useState()
    const [password1,setPassword1] = useState()
    const [admin,setAdmin] = useState(props.admin)
    const [id,setID] = useState(props.id)
    const {HandleShadow,shadowcontainer} = useContext(AuthContext)

        const [error,setError] = useState({
            fullname:false,
            number:false,
            password:false,
            password1:false,
            matchnumber:false
        
            })
    
        const handleChangeName=(e)=>{
            const values = e.target.value
            const explodeString = values.split(" ")
            const filter = explodeString.filter((x)=>{return x!== ""})
            setName(values)
        
            if(!filter[1]){
            error.fullname = true
            }else{
            error.fullname = false
            }
        
            
            }

        const handleChangeNumber=(e)=>{
            const values = e.target.value
            const regex =  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/ 
            setNumber(values)
            
            if(!regex.test(values)){
            error.number = true
            
            }else{
            error.number = false
                    
            }
     
            }   
        
        const handleChangePassword=(e)=>{
            const values = e.target.value
            setPassword(values)
   
            if(values.length <5 || !values.trim()){
                error.password = true
            }else{
                error.password = false
            }
            
        }

        const handleChangePassword1=(e)=>{
            const values = e.target.value
            setPassword1(values)

            if(error.password1 && values){
                error.password1= false
            }

        }

        


        const saveSettings= async()=>{

            if(password1 != password){
                return error.password1 = true
            }

            if(error.password || error.name || error.number  || !name.trim() || !number.trim() ){
                return 
            }
           

            await api.put('/edituser1',{id,name,number,password1}).then(
                res=>{
                    if(res.status == 200){
                  return window.location.reload()
                }
                  
                },error=>{
                    
                   if(error.response.data == "Número já existe"){

                    setError({matchnumber:true})
                    Swal.fire({

                        position: 'center',
                        icon: 'error',
                        title: 'Número já Existe!',
                        // confirmButtonColor:'#3085d6',
                        // confirmButtonText:"Fechar",
                        width:"350px",
                        // buttonsStyling:false,
                        showConfirmButton:false,
                        heightAuto:false,
                        height:'360px',
                        customClass:'swal-wide',
                        timer:1500
                    
                         
                      })


                   }
        
             
                }
            )
            
           
            }

         


    return(

        <Shadow_container funcao={(e)=>HandleShadow(e)}>
    
        <div id={"EditMyUser"}  className={"EditUser"}>
            <h3>DADOS PESSOAIS</h3>
    
            {error.fullname ?<label id="inputmatch" for="name">Nome Inválido</label>:<label for="name">Nome de Usuário</label>}
            <input className={error.fullname && "form-input invalid"} disabled={!admin} name="name" defaultValue={name} onChange={handleChangeName}></input>
            

            {error.number ? <label id="inputmatch" for="number">Número Inválido</label>:<label for="number">Número Atual</label>}
            <InputMask className={error.number && 'form-input invalid'} disabled={!admin} mask="(99) 99999-9999"  name="number" defaultValue={number}  onChange={handleChangeNumber}/>
    
            {error.password ?<label id="inputmatch" for="password">Mínimo 5 caracteres</label> :<label for="password">Nova Senha</label>}
            <input className={error.password && "form-input invalid"}  type="password"  name="password" onChange={handleChangePassword}></input>
            
           
            {error.password1 ? <label  id="inputmatch" for="password1">Senhas Diferentes</label>:<label for="password1">Confirme a Senha</label>}
            <input className={error.password1 && "form-input invalid"} type="password"  name="password1"  onChange={handleChangePassword1} ></input>
           
           <div className="editbuttons"> <button onClick={()=>shadowcontainer.Myaccount = false} type="reset" id="canceledituser">CANCELAR</button> <button  onClick={saveSettings} id="saveedituser">SALVAR</button></div>
    
    
        </div>
    
        </Shadow_container>
    )






}export default MyAccount

