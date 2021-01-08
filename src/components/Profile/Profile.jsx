import s from "./Profile.module.css";
import ProfileInfo from "./ProfileData/ProfileInfo";
import React from "react";
import TheWallContainer from "./TheWall/TheWallContainer";

const Profile = (props) => {

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
