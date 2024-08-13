import {css,styled} from "styled-components";


export const Table_Container = styled.div`

margin: auto;


${props => props.login && css`

min-height: 75vh;

`}

${props => props.participate && css`
  
  margin-top: 10px;
  min-height: 100vh;
  padding-bottom: 2rem;
  max-width: 70%;
 
 
  `}

${props => props.event_list && css`
  
  width: 70%;
  min-height: 100vh;
  padding-bottom: 2rem;
 
 
  `}




  `