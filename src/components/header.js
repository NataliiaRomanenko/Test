import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../public/img/logo.svg"

const Header =(props)=>{
    return ( <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <div className="loginBlock">
                    <NavLink to={'/login'}>Login</NavLink>
            </div>
        </header>

    )
}
export default Header;
