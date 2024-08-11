import styled from "styled-components";


const Table_Style = styled.table`

  text-align: center;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  background-color: #fff;
  border-collapse: collapse;
  margin: auto;
  position: relative;
  border-radius: 10px;


/* Estilo das células de cabeçalho */
 th{
  vertical-align: bottom;
}


 td,th {
  padding: 0.75rem;
  vertical-align: top;
  border-bottom: 1px solid #ddd;
}

/* Estilo das células de cabeçalho do primeiro nível */
thead > tr > th {
  border-bottom-width: 3px;
  font-weight: 500;
}

 > th{
  background-color: #f2f2f2;
}

/* Estilo das células de dados listradas */
 tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}


`

export const Table = ({children})=>{

return(

    <Table_Style >


            {children}


    </Table_Style>
)
}