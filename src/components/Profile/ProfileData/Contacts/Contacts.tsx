import s from "../ProfileInfo.module.css";
import React from "react";

type PropsType = {
    contactTitle: string
    contactValue: string
}

const Contacts: React.FC<PropsType> = ({contactTitle, contactValue}) => {
    return <div>
        {(contactValue) &&
        <div className={s.text}>
            <a rel="noopener noreferrer" target="_blank"
                                   href={contactValue}>{contactTitle}</a>
        </div>}
    </div>
}

export default Contacts