import {styled,css} from "styled-components";

export const Button = styled.button`
font-family: 'Poppins',sans-serif;
border-radius: 5px;
color: white;
background-color: ${(props) => props.$cancel ? "#b33131" : 'rgb(7, 139, 139)'};  
cursor: pointer;


${props=>props.add_list && css`

  margin-top:15px;
  height: 40px;
  width: 110px;
  border:none;
  background-color:${(props)=>props.$cancel ? ' #c21313':'#0e78d4' };
  font-weight: bold;

&:hover{
background-color:${(props)=>props.$cancel ?' #a23636':'#075293' }
}

&:last-of-type{
margin-left:5px;
}

`}


${props=>props.my_account && css`

  margin-top:10px;
  height: 40px;
  width: 115px;
  border: none;
  font-size: 15px;
  font-weight: bold;

`}

${props=>props.token && css`

  height: 35px;
  width: 100px;
  margin-top: 15px;
  border: none;
  font-weight: bold;
  font-size: 15px;


&:last-of-type{
    margin-left:5px;
}

`}



`