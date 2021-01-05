import s from "../ProfileInfo.module.css";
import React from "react";

const Contacts = ({contactTitle, contactValue}) => {
    return <div>
        {(contactValue) &&
        <div className={s.text}><a rel="noopener noreferrer" target="_blank"
                                   href={"http://" + contactValue}>{contactTitle}</a></div>}
        {/*{(profile.contacts.vk) &&*/}
        {/*<div className={s.text}><a rel="noopener noreferrer" target="_blank"*/}
        {/*                           href={"http://" + profile.contacts.vk}><FontAwesomeIcon*/}
        {/*    icon={['fab', 'vk']}/></a></div>}*/}
        {/*{(profile.contacts.instagram) &&*/}
        {/*<div className={s.text}><a rel="noopener noreferrer" target="_blank"*/}
        {/*                           href={"http://" + profile.contacts.instagram}><FontAwesomeIcon*/}
        {/*    icon={['fab', 'instagram']}/></a></div>}*/}
        {/*{(profile.contacts.mainLink) &&*/}
        {/*<div className={s.text}><a rel="noopener noreferrer" target="_blank"*/}
        {/*                           href={"http://" + profile.contacts.mainLink}><FontAwesomeIcon*/}
        {/*    icon={['fab', 'linkedin']}/></a></div>}*/}
        {/*{(profile.contacts.youtube) &&*/}
        {/*<div className={s.text}><a rel="noopener noreferrer" target="_blank"*/}
        {/*                           href={"http://" + profile.contacts.youtube}><FontAwesomeIcon*/}
        {/*    icon={['fab', 'youtube']}/></a></div>}*/}
        {/*{(profile.contacts.twitter) &&*/}
        {/*<div className={s.text}><a rel="noopener noreferrer" target="_blank"*/}
        {/*                           href={"http://" + profile.contacts.twitter}><FontAwesomeIcon*/}
        {/*    icon={['fab', 'twitter']}/></a></div>}*/}
    </div>
}

export default Contacts