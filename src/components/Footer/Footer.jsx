import React from 'react'
import s from './Footer.module.css'
import Clock from "./Clock";



const Footer = (props) => {
    return (
        <div className={s.footer}>
            All Rights Reserved. 2021
            <div><Clock/></div>
        </div>
    )
}

export default Footer