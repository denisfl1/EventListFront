import styled from "styled-components";
import { Shadow_container } from "./shadow_container";
import { Button } from "./button";


const Event_Content = styled.div`

  position: relative;
  width: 380px;
  height: 490px;
  align-items: center;
  background-color:#3a3f3e;;
  border-radius: 5px;
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  font-size:18px;
  font-family:'Poppins',sans-serif;
  color:white;
  box-shadow:  0px 0px 10px 6px #00000078;  


input{

  width: 250px;
  height: 40px;
  text-align: center;
  margin-top: 2px;
  border-radius: 5px;
  font-size: 18px;
  border: none; 
}

select{

  width: 250px;
  margin-top: 2px;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  border: none;
}

label{
    margin-top: 12px;
}




`

export const EventForm = ({
    HandleShadow, 
    date, 
    setDate, 
    time, 
    setTime, 
    extrachange, 
    setExtraChange, 
    extratime,
    setExtraTime, 
    enviar, 
    handleClose }) => {

    const CheckOption = (event)=>{
        
        const value = JSON.parse(event.target.value)
        setExtraChange(value)

        if(!value)return setExtraTime("-")
        

    }

    return (
        <Shadow_container funcao={(e)=>HandleShadow(e)}>
        <Event_Content>
            <h3>ADICIONE UM EVENTO</h3>

            <label htmlFor="date">Data do Evento</label>
            <input
                type='date' 
                name="date" 
                onChange={(event) => setDate(event.target.value)}
                value={date}
            />

            <label htmlFor="time">Horário</label>
            <input
                type='time' 
                name="time" 
                onChange={(event) => setTime(event.target.value)}
                value={time}
            />

            <label>Hora Extra</label>
            <select  
                name="extrachange" 
                onChange={(event) => CheckOption(event)} 
                value={extrachange}
            >      
                <option value={false}>NÃO</option>
                <option value={true}>SIM</option>
            </select>

            <label>Horas a Mais</label>
            <input
                name="extratime" 
                disabled={!extrachange} 
                type='time' 
                onChange={(event) => setExtraTime(event.target.value)} 
                value={extratime}
            />

            <div>

                <Button add_list $cancel onClick={handleClose}>CANCELAR</Button>
                <Button add_list onClick={enviar}>ADICIONAR</Button>
         
            </div>

        </Event_Content>

        </Shadow_container>
    );
};

export default EventForm;