import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className={s.header}>
      <img alt="header" src="https://bower.io/img/bower-logo.png" className={s.image} />
      <div className={s.title}>Насвязи.com</div>
        <div className={s.loginBlock}>
            <NavLink to={'/login'}>Login</NavLink>
        </div>
    </header>
  );
};

export default Header;
