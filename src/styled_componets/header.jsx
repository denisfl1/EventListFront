import styled from "styled-components";

export const Header_content = styled.header`

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 11vh;
  background-color: #3e3e3e;
  color: white;



`

 const Header = ({children})=>{


return(
    <Header_content>

            {children}

    </Header_content>
)


}

export default Header