import styled from "styled-components";
import { Shadow_container } from "./shadow_container";
import InputMask from "react-input-mask";
import {Button} from "./button"

export const MyAccount_Content = styled.div`

  background-color: #3a3f3e;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items:center;
  border-radius: 5px;
  color:white;
  font-family: 'Poppins',sans-serif;
  margin: auto;
  font-size: large;
  position: relative;
  text-align: center;
  box-shadow:  0px 0px 10px 6px #0000007d;
  height:${(props)=>props.className == "editUser" ? '450px' : '520px'};

label:not(:first-of-type){
margin-top:15px;
}

input{

  outline: none;
  width: 250px;
  height: 40px;
  margin-top:4px;
  border: none;
  font-size: large;
  text-align: center;
  background-color:  #5d3f6c;
  color: white;
  border-radius: 5px;
  font-family: 'Poppins',sans-serif;
  border:3px solid transparent;

.invalid{
    border: 3px solid #e63636
}


}

select{
  text-align: center;
  width: 255px;
  height: 40px;
  margin-top:5px;
  margin-bottom: 20px;
  border:none;
  font-size: 15px;
  background-color:  #5d3f6c;
  color: white;
}


#inputmatch {

color: #b33131;

}

`


export const My_Account = ({
    
    error,
    admin,
    name,
    handleChangeName,
    handleChangeNumber,
    number,
    handleChangePassword,
    handleChangePassword1,
    saveSettings,
    handleClose,
    HandleShadow,
    setAdmin,
    editUser,
    lockedButton

})=>{

    

return(
<Shadow_container funcao={(e)=>HandleShadow(e)}>

        <MyAccount_Content className={editUser && "editUser"}>
        <h3>DADOS PESSOAIS</h3>
    
        {error.fullname ?<label id="inputmatch" for="name">Nome Inválido</label>:<label for="name">Nome de Usuário</label>}
        <input className={error.fullname && "form-input invalid"} disabled={!lockedButton} name="name" defaultValue={name} onChange={handleChangeName}></input>


        {error.number || error.matchnumber ? <label id="inputmatch" for="number">Número Inválido</label>:<label for="number">Número Atual</label>}
        <InputMask className={error.number && 'form-input invalid'} disabled={!lockedButton} mask="(99) 99999-9999"  name="number" value={number}  onChange={handleChangeNumber}/>

         
        {editUser ? 
            <>
        <label for="admin">Administrador </label>
        <select  onChange={(e)=>(setAdmin(JSON.parse(e.target.value)))} value={admin}  type="select" name="admin">

        <option value={true}>SIM</option>
        <option value={false}>NÃO</option>

        </select>
        </>
          : 
        <>
            {error.password ?<label id="inputmatch" for="password">Mínimo 5 caracteres</label> :<label for="password">Nova Senha</label>}
            <input className={error.password && "form-input invalid"}  type="password"  name="password" onChange={handleChangePassword}></input>
    
    
            {error.password1 ? <label  id="inputmatch" for="password1">Senhas Diferentes</label>:<label for="password1">Confirme a Senha</label>}
            <input className={error.password1 && "form-input invalid"} type="password"  name="password1"  onChange={handleChangePassword1} ></input>
            </>
     
    
    }    

        <div className="editbuttons"> <Button my_account $cancel onClick={handleClose} type="reset" >CANCELAR</Button> <Button my_account  onClick={saveSettings}>SALVAR</Button ></div>


        </MyAccount_Content>

</Shadow_container>
)
}