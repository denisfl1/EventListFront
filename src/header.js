import React,{useState,useEffect,useContext} from "react";
import Menu from './menu'
import './App.css'
import img from './logos/logo.png'



function Header(props){


    return(
        <>
        <header className="header">
        
            <a href="https://spassosplash.com.br/"><img src={img} width={"150px"}></img></a>
            <Menu></Menu>
        </header>
        
        </>
    )

}

export default Header

