import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    id: number
    name: string
}
export const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/Dialogs/" + props.id;

    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};