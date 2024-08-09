import styled from "styled-components";

export function Element_Shadow_Container ({className,funcao,children}){
    

    return(
        <div id={"shadow_container"} className={className} onClick={funcao}>
            {children}
        </div>
    )
     
    }



export const Shadow_container = styled(Element_Shadow_Container)`

min-width:100%;
min-height:100vh;
background-color: rgba(0,0,0,0.2);
top:0;
left:0;
position:fixed;
display:flex;
z-index:1;


`


