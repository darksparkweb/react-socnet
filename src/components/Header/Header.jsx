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
                    : <div>
                        <NavLink to={'/login'}>Login</NavLink> /
                        <a href='https://social-network.samuraijs.com/signUp' target="_blank" rel="noreferrer"> Register</a>

                    </div>}
            </div>
        </header>
    );
};

export default Header;
