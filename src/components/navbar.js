import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar =(props)=>{
    return (<nav className="navbar">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/login">Messages</NavLink>
        </nav>

    )
}
export default Navbar;
