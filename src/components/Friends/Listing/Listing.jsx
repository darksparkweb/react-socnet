import React from 'react';
import s from './Listing.module.css';
import userPhoto from "../../../img/user.png"
import {NavLink} from "react-router-dom";

const Listing = (props) => {
    return (
            <div className={s.listing}>
                <NavLink to={"/Profile/" + props.store.id} className={s.navLink}>
                <div className={s.ava}><img src={props.store.photos.small ? props.store.photos.small : userPhoto} alt={props.store.name}/></div>
                <div className={s.name}>{props.store.name}</div>
                </NavLink>
            </div>
            
    )
}

export default Listing;