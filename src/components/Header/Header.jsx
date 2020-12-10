import React from "react";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <img src="https://bower.io/img/bower-logo.png" className={s.image} />
      <div className={s.title}>Насвязи.com</div>
    </header>
  );
};

export default Header;
