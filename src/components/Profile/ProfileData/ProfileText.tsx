import lfj from "../../../img/lfj.png";
import working from "../../../img/working.png";
import React from "react";
import s from "./ProfileInfo.module.css";
import Contacts from "./Contacts/Contacts";
import {ContactsType, ProfileType} from "../../../types/types";


type ProfileTextType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: ()=> void
}
const ProfileText: React.FC<ProfileTextType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.userInfo}>
            <div className={s.userText}>
                <div className={s.name}>{profile.fullName}</div>
                <div className={s.text}>{profile.aboutMe}</div>
                <div className={s.lfj}><img alt={profile.aboutMe} className={s.job}
                                            src={profile.lookingForAJob ? lfj : working}/>
                    {profile.lookingForAJob ? <div>{profile.lookingForAJobDescription}</div> : <div>Already Working</div>}
                </div>
            </div>
            <div className={s.userText}>
                {Object.keys(profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>
            <div className={s.button}>{isOwner && <button onClick={goToEditMode}>Edit</button>}</div>
        </div>
    )
}

export default ProfileText