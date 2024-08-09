import styled from "styled-components";


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


button{
  font-family: 'Poppins',sans-serif;
  background-color:  #3085d6;
  color: white;
  border: none;
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size:14px;
  font-weight: bold;


&:hover{
    background-color: #2674b9;
    transition: background 0.2s;
}
}

`

export const EventForm = ({ date, setDate, time, setTime, extrachange, setExtraChange, extratime, setExtraTime, enviar, handleCancelClick }) => {

    const CheckOption = (event)=>{
        
        const value = JSON.parse(event.target.value)
        setExtraChange(value)

        if(!value){
            setExtraTime("-")
        }

    }

    return (
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
                <button id="cancel" onClick={handleCancelClick}>CANCELAR</button>
                <button id="save" onClick={enviar}>ADICIONAR</button>
            </div>

        </Event_Content>
    );
};

export default EventForm;