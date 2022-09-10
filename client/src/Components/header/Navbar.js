import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar=()=>{

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-custom-light pb-0">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink className={({isActive})=>isActive?"nav-link navlink-red":"nav-link"} to="/">home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive})=>isActive?"nav-link navlink-red":"nav-link"} to="/upload">upload</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive})=>isActive?"nav-link navlink-red":"nav-link"} to="/users">users</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;