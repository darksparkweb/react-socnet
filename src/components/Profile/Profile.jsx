import s from "./Profile.module.css";
import TheWallContainer from "./TheWall/TheWallContainer";
import ProfileInfo from "./ProfileInfo";
import PostHeader from "./PostHeader";
import React from "react";

const Profile = (props) => {

  return (
    <div className={s.content}>
      <PostHeader />
      <ProfileInfo profile={props.profile}/>
      <TheWallContainer/>
    </div>
  );
};

export default Profile;
