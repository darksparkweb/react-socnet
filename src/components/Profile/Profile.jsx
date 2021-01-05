import s from "./Profile.module.css";
import TheWallContainer from "./TheWall/TheWallContainer";
import ProfileInfo from "./ProfileData/ProfileInfo";
import React from "react";

const Profile = (props) => {

  return (
    <div className={s.content}>
      <ProfileInfo
          saveProfile={props.saveProfile}
          savePhoto={props.savePhoto}
          isOwner={props.isOwner}
          profile={props.profile}
          status={props.status}
          updateStatus={props.updateStatus}/>
      <TheWallContainer/>
    </div>
  );
};

export default Profile;
