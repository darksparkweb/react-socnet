import loader from "../../img/load.svg";
import s from './preloader.module.css'
import React from "react";

let Loader: React.FC = (props) => {
    return <div className={s.loader}><img alt="loader" src={loader}/></div>
}


export default Loader;