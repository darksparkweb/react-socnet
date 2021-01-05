import React, {useState} from 'react'
import s from "./ProfileInfo.module.css";
import Loader from "../../common/preloader";
import userPhoto from "../../../img/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileText from "./ProfileText";
import ProfileTextFormReduxForm from "./ProfileTextForm";

const ProfileInfo = ({savePhoto, isOwner, profile, status, updateStatus, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Loader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
        setEditMode (false);
    }

    return (
        <div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            <div className={s.profileInfo}>
                <div className={s.userBlocks}>
                    <label htmlFor="file"><img
                        alt={profile.userId}
                        src={profile.photos.large != null ? profile.photos.large : userPhoto}
                        className={s.ava}
                    /></label>
                    {isOwner &&
                    <input type={"file"} accept="image/png, .jpeg, .jpg, image/gif" id={"file"} className={s.inputImg}
                           onChange={onMainPhotoSelected}/>}
                </div>
                <div className={s.userBlocks}>
                    { editMode ? <ProfileTextFormReduxForm initialValues={profile} onSubmit={onSubmit}/> :
                    <ProfileText goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>
                    }
                </div>

            </div>

        </div>
    )
}


export default ProfileInfo;