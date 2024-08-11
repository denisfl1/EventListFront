import styled from "styled-components";
import { Shadow_container } from "./shadow_container";
import { Button } from "./button";


 const Participate_content = styled.div`

  display: flex;
  margin: auto;
  align-items:center;
  position: relative;
  width: 800px;
  height: 100px;
  background-color:#3a3f3e;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 6px #00000078;
  justify-content: center ;
  font-size: 18px;


input{
  width:200px;
  height: 30px;
  text-align: center;
  font-size: medium;
  margin: auto;
  border-radius: 4px;
  border: none;
  margin-left: 8px;

&:disabled{
    color:black;
    background-color: white;
}

}

select{
  width: 100px;
  height:35px ;
  text-align: center;
  border-radius: 4px;
  margin-right: 15px;
}

label{
  margin-right: 8px;
  margin-left: 5px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}

button{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;

&:hover{
    cursor: pointer;
}
}


`



export const Participate_form =({
    HandleShadow,
    useradmin,
    setNames,
    names,
    setFills,
    addNameandFill,
    fills,
    handleClose})=>{


return(
    <Shadow_container funcao={(e)=>HandleShadow(e)}>
    <Participate_content>
    <label for="names">Nome
    <input disabled={!useradmin} name={"names"}  type="text" onChange={(event)=> setNames(event.target.value)} value={names} ></input>
    </label>
    <label>Serviço Aux.?</label>
    <select  name={"fills"}  onChange={(event)=> setFills(event.target.value)} value={fills}>
    
    <option  value="-">NÃO</option>
    <option  value="SIM">SIM</option>
    
    </select>
    <div className="monitorsbuttons"><Button type="reset" onClick={handleClose} add_monitor $cancel>Cancelar</Button><Button onClick={addNameandFill} type="reset" add_monitor>Salvar</Button></div>
   
    </ Participate_content>
    </Shadow_container>
)


}





