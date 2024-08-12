import styled from "styled-components";
import { Button } from "./button";
import { Shadow_container } from "./shadow_container";


export const Token_content = styled.div`

  color: white;
  background-color: #3a3f3e;
  width: 300px;
  height: 180px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items:center;
  margin: auto;
  font-family: 'Poppins',sans-serif;
  border-radius: 5px  ;
  box-shadow:  0px 0px 10px 6px #0000007d;
  text-align: center;


input{
  width: 70%;
  height: 35px;
  text-align: center;
  font-size: 25px;
  background-color:  #5d3f6c;
  color: white;
  border: none;

&:focus-visible {
  outline: none;
 }


}



`

export const Token_gen = ({token,genToken,shadowcontainer,HandleShadow})=>{


return(

    <Shadow_container funcao={(e)=>HandleShadow(e)}>
    <Token_content>
    <h3>Novo Token</h3>

    <input defaultValue={token ? token : ""} value={token ? token : ""}></input>

    <div>

     <Button token $cancel onClick={()=>shadowcontainer.token = false}>FECHAR</Button>
     <Button token  onClick={genToken}>GERAR</Button>
        
    </div>

    </Token_content>
    </Shadow_container>

)


}