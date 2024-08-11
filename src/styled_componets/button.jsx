import {styled,css} from "styled-components";

export const Button = styled.button`
font-family: 'Poppins',sans-serif;
border:none;
border-radius: 5px;
color: white;
background-color: ${(props) => props.$cancel ? "#b33131" : 'rgb(7, 139, 139)'};  
cursor: pointer;


${props=>props.add_event && css`

  height: 50px;
  width: 150px;
  border-radius: 5px;
  background-color: #2989de;
  font-size:medium;
  font-weight: bolder;


&:hover{
    background-color: #2674b9;
 
}
&:disabled{
background-color:#a3a3a3
}

`}


${props=>props.add_list && css`

  margin-top:15px;
  height: 40px;
  width: 110px;
  background-color:${(props)=>props.$cancel ? ' #c21313':'#0e78d4'};
  font-weight: bold;


&:hover{
background-color:${(props)=>props.$cancel ?' #a23636':'#075293'};


}

&:last-of-type{
margin-left:5px;
}

`}


${props=>props.my_account && css`

  margin-top:10px;
  height: 40px;
  width: 115px;
  font-size: 15px;
  font-weight: bold;

`}

${props=>props.token && css`

  height: 35px;
  width: 100px;
  margin-top: 15px;
  font-weight: bold;
  font-size: 15px;


&:last-of-type{
    margin-left:5px;
}

`}


${props=>props.add_monitor && css`

  background-color:${(props)=>props.$cancel ? '#b33131' : '#065092'};
  height: 35px;
  width: 100px;

&:last-of-type{
margin-left:5px;
}

`}

${props=>props.delete_users && css`

  background-color: rgb(178, 68, 79);
  padding: 5px;
  width: 90px;
  font-weight: bold ;

&:disabled{
  background-color: #adb2b7;

}


`}



`