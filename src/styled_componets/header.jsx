import styled from "styled-components";
import img from '../logos/loremipsumlogo.png'
import Menu from '../components/menu'

 const Header_content = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 11vh;
  background-color: #3e3e3e;
  color: white;



`

 const Header = ()=>{


return(
    <Header_content>
               
            <img src={img} width={"150px"}></img>
            <Menu></Menu>
         

    </Header_content>
)


}

export default Header

