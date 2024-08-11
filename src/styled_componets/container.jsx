import {css,styled} from "styled-components";


export const Table_Container = styled.div`

${props => props.participate && css`
  
  margin-top: 10px;
  min-height: 100vh;
  padding-bottom: 2rem;
  margin: auto;
  max-width: 70%;
 
 
  `}

${props => props.event_list && css`
  
  width: 70%;
  margin: auto;
  min-height: 100vh;
  padding-bottom: 2rem;
 
 
  `}


  `