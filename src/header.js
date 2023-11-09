import React from "react";
import Menu from './menu'
import './App.css'
import img from './logos/loremipsumlogo.png'



function Header(props){


    return(
        <>
        <header className="header">
        
            <img src={img} width={"150px"}></img>
            <Menu></Menu>
        </header>
        
        </>
    )

}

export default Header

