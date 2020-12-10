import React from 'react'
import s from "./ProfileInfo.module.css";
import Loader from "../common/preloader";
import lfj from "../../img/lfj.png";
import working from "../../img/working.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Loader/>
    }


    return (
        <div className={s.profileInfo}>
            <img
                alt={props.profile.userId}
                src={props.profile.photos.small}
                className={s.ava}
            />
            <div className={s.userInfo}>
                <div className={s.name}>{props.profile.fullName}</div>
                <div className={s.text}>{props.profile.aboutMe}</div>
                <div className={s.text}>L'viv</div>
                <div className={s.lfj}><img alt={props.profile.userId} className={s.job} src={props.profile.lookingForAJob ? lfj : working}/><div>{props.profile.lookingForAJobDescription}</div></div>
                <div className={s.text}><a href={props.profile.contacts.website}>{props.profile.contacts.website}</a></div>
            </div>
            <div className={s.smicon}>
                <div className={s.text}><a rel="noopener noreferrer" target="_blank" href={"http://" + props.profile.contacts.facebook}><FontAwesomeIcon icon={['fab', 'facebook']} /></a></div>
                <div className={s.text}><a rel="noopener noreferrer" target="_blank" href={"http://" + props.profile.contacts.vk}><FontAwesomeIcon icon={['fab', 'vk']} /></a></div>
                <div className={s.text}><a rel="noopener noreferrer" target="_blank" href={"http://" + props.profile.contacts.instagram}><FontAwesomeIcon icon={['fab', 'instagram']} /></a></div>
                <div className={s.text}><a rel="noopener noreferrer" target="_blank" href={"http://" + props.profile.contacts.mainLink}><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></div>
            </div>
        </div>
    )
}

export default ProfileInfo;