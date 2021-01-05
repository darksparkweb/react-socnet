import React from 'react';
import s from './Listing.module.css';


const Listing = (props) => {
    return (
            <div className={s.listing}>
                <div className={s.ava}><img src={props.store.ava} alt={props.store.name}/></div>
                <div className={s.name}>{props.store.name}</div>
            </div>
            
    )
}

export default Listing;