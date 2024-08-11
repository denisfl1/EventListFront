import styled from "styled-components";


const Footer_Contet = styled.div`

  margin-top: auto;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 95px;
  background-color: #3e3e3e;
  color: white;
  position: relative;   

li{

  list-style: none;
  margin-left: 100px;
  font-size: 13px;

}


`

 const Footer = ()=>{


return(

<Footer_Contet>

    <ul>
    <li>
    © 2024 Buffet. Todos os direitos reservados
    </li>
    </ul>


</Footer_Contet>


)


}

export default Footer 