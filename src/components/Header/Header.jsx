import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logo from "../../img/logo.png"

const Header = (props) => {
    return (
        <header className={s.header}>
            <img alt="header" src={logo} className={s.image}/>
            <div className={s.title}>Насвязи.com</div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logout} className={s.logout}>Logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;
