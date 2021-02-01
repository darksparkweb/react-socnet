import s from "./ProfileTextForm.module.css";
import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/formsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/formsControls.module.css";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>
const ProfileTextForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form className={s.userInfo} onSubmit={handleSubmit}>

            <div className={s.userText}>
                <div className={s.name}>{createField<ProfileTypeKeys>("Full name", "fullName", [], Input, 'text' )}</div>
                <div className={s.lfj}>Looking for a Job?{createField<ProfileTypeKeys>("LFJ", "lookingForAJob", [], Input,  'checkbox')}</div>
                <div className={s.text}>{createField<ProfileTypeKeys>("About Me", "aboutMe", [], Textarea, "text" )}</div>
                <div className={s.name}>{createField<ProfileTypeKeys>("My Skills", "lookingForAJobDescription", [], Textarea, "text" )}</div>
            </div>
            <div className={s.userText}>

                {Object.keys(profile.contacts).map(key => {
                    return <div>

                        {/*TODO: create some solution for embedded objects*/}

                        {createField(key, "contacts." + key, [], Input, "text" )}
                    </div>
                })}
                {error &&
                <div className={style.formError}>
                    {error}
                </div>
                }
            </div>
            <div className={s.button}><button>save</button></div>
        </form>
    )
}

const ProfileTextFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileTextForm)

export default ProfileTextFormReduxForm