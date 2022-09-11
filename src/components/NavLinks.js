import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const NavLinks = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue-grey lighten-1" style={{padding: '0 2rem'}}>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать пользователя</NavLink></li>
                    <li><NavLink to="/update">Редактировать пользователя</NavLink></li>
                    {auth.isAuthenticated? <li><a href="/create" onClick={logoutHandler}>Выйти</a></li> : ''}

                </ul>
            </div>
        </nav>
    );
};

export default NavLinks;