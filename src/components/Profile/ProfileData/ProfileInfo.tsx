import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.css'
import userPhoto from '../../../img/user.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileText from './ProfileText'
import ProfileTextFormReduxForm from './ProfileTextForm'
import {ProfileType} from '../../../types/types'
import {LoadingOutlined} from '@ant-design/icons'
import {Tooltip} from 'antd'

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({savePhoto, isOwner, profile, status, updateStatus, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <LoadingOutlined style={{fontSize: 58, display: "flex", justifyContent: "center", alignItems: "center", margin: ' 35vh auto'}}/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        //TODO Remove .then
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            <div className={s.profileInfo}>
                <div className={s.userBlocks}>
                    <label htmlFor="file"><Tooltip placement="bottomLeft" title={'Click to change photo'}>
                    <img
                        alt={profile.fullName}
                        src={profile.photos.large != null ? profile.photos.large : userPhoto}
                        className={s.ava}
                    /></Tooltip></label>
                    {isOwner &&
                    <input type={"file"} accept="image/png, .jpeg, .jpg, image/gif" id={"file"} className={s.inputImg}
                           onChange={onMainPhotoSelected}/>}
                </div>
                <div className={s.userBlocks}>
                    {editMode ?
                        <ProfileTextFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                        <ProfileText goToEditMode={() => {
                            setEditMode(true)
                        }} profile={profile} isOwner={isOwner}/>
                    }
                </div>

            </div>

        </div>
    )
}


export default ProfileInfo;