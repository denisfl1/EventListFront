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

export const Table = ({
    th1,
    th2,
    th3,
    th4,
    th5,
    th6,
    th7,
    th8,
    lockedButton,
    children})=>{

return(

    <Table_Style >
        <thead>
            <tr>
            {<th>{th1}</th>}
            {<th>{th2}</th>}
            {<th>{th3}</th>}
            {<th>{th4}</th>}
            {<th>{th5}</th>}
            {<th hidden={!lockedButton}>{th6}</th>}
            {<th hidden={!lockedButton}>{th7}</th>}
            {<th hidden={!lockedButton}>{th8}</th>}

            </tr>
        </thead>

            {children}


    </Table_Style>
)
}