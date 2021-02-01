import s from "./Profile.module.css";
import ProfileInfo from "./ProfileData/ProfileInfo";
import React from "react";
import TheWallContainer from "./TheWall/TheWallContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo {...props}
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}/>
            <TheWallContainer />
        </div>
    );
};

export default Profile;
