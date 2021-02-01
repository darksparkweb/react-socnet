import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logo from "../../img/logo.png"

export type PropsType = {
    isAuth: boolean
    login: string | null
    id: number | null
}
export type DispatchPropsType = {
    logout: ()=>void

}
const Header: React.FC<PropsType & DispatchPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img alt="header" src={logo} className={s.image}/>
            <div className={s.title}>Насвязи.com</div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div className={s.log}>
                        <img className={s.ava} src={"https://social-network.samuraijs.com/activecontent/images/users/" + props.id + "/user.jpg?v=6"} alt={"ava"}/>
                        <span>{props.login}</span>
                        <button onClick={props.logout} className={s.logout}>Logout</button>
                      </div>
                    : <div>
                        <NavLink to={'/login'}>Login</NavLink> /
                        <a href='https://social-network.samuraijs.com/signUp' target="_blank"
                           rel="noreferrer"> Register</a>

                    </div>}
            </div>
        </header>
    );
};

export default Header;
