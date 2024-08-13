import styled from "styled-components";
import InputMask from "react-input-mask";
import img from '../logos/loremipsumlogo1.png';
import img1 from '../logos/wallpapperlorem.jpg';
import { Button } from "./button";
import {Link} from 'react-router-dom'
import { Table_Container } from "./container";


const Login_content = styled.div`

  margin: auto;
  margin-top: 100px;
  padding: 90px;
  width: 250px;
  background-color: #3e3e3ef8;
  text-align: center;
  border-radius:10px;
  position: relative;

form{
display:flex;
flex-direction:column;
align-items:center;
}

input{
  outline: none;
  padding: 15px;
  width: 200px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: none;
  color:rgb(227, 227, 227);
  background-color: #5d3f6c;
  font-size: 15px;


&::placeholder{
    color:rgb(200, 200, 200)
}

}


.labelerror{
  color: #e63636;
  font-size: 12px;
}

.errorEmail{
  color: #e63636;
 
}

.form-input.invalid {
  
  border: 3px solid #e63636
}

span{
    margin-left:7px;
}

`


export const Login_form = ({
    
    handleChangeNumber,
    numberCheck,
    loginlock,
    error,
    handleSubmit,
    handleChangePassword,
    handleChangeName,
    handleChangeToken,
    register,


})=>{


return(

    <Table_Container login>


    <Login_content>
            
            <img className="spasso-picture" src={img} ></img>

            <form >

            {register ? 

            <>
            <input className={error.fullname || numberCheck.empty ? 'form-input invalid' : 'form-input' } 
            name={"name"} onChange={handleChangeName}
            placeholder="Nome e Sobrenome" ></input>
            <label className="labelerror">{numberCheck.empty ? "" : error.fullname ? "Nome Inválido *":" " }  
            </label>

            <InputMask className={error.number|| numberCheck.login || numberCheck.empty ? 'form-input invalid' : 'form-input '} mask="(99) 99999-9999" id="telefone" name="telefone" placeholder="Número de Celular" onChange={handleChangeNumber}/>
             <label className="labelerror">{numberCheck.login || numberCheck.empty ? "" :error.number ? "Número Inválido *" : "  "} 
             {numberCheck.login ? "Número Já Cadastrado *" : "  "  } 
             </label>

             <input className={error.password || numberCheck.empty ? 'form-input invalid' : 'form-input'} 
            name={"password"} onChange={handleChangePassword}  type="password"
             placeholder="Digite sua Senha" ></input>
            <label className="labelerror">{numberCheck.empty ? "" : error.password ? "Mínimo 5 Caracteres *":" "}
            </label>

            <input  className={error.token || numberCheck.empty ? 'form-input invalid' :'form-input'} name={"token"} onChange={handleChangeToken} placeholder="Token de Autenticação"></input>
            <label  className="labelerror">{error.token ? "Token Inválido *":" "} {numberCheck.empty ?"Campos Obrigatórios *" : " "} </label>
             

            </>
                :
            <>
                <InputMask className={error.number|| numberCheck.login || numberCheck.empty ? 'form-input invalid' : 'form-input '} mask="(99) 99999-9999" id="telefone" name="telefone" placeholder="Número de Celular" onChange={handleChangeNumber}/>   
                
                <input className={error.password ? 'form-input invalid' : 'form-input '} name={"password"} onChange={handleChangePassword}  type="password" placeholder="Digite sua Senha" ></input>
                <label className="labelerror">{numberCheck.empty ? "Campos Obrigatórios *" : " "}
                {numberCheck.login ? "Número ou Senha Incorretos *" : " "}
                </label>
            
            
            </>}


            <Button login disabled={loginlock} type="submit" onClick={handleSubmit}>{register ?"Cadastrar":"LOGIN"}</Button>

            {!register && <span>Não possui conta?<Link className="registerclass" to="/register">Registre-se</Link></span>}
             
            </form>
        
        </Login_content >

            <img className="elementor-video" src={img1}></img>

        </Table_Container>


)


    
}