import s from "./ProfileTextForm.module.css";
import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/formsControls";
import {reduxForm} from "redux-form";
import style from "../../common/FormsControls/formsControls.module.css";

const ProfileTextForm = ({handleSubmit, profile, error}) => {
    return (
        <form className={s.userInfo} onSubmit={handleSubmit}>

            <div className={s.userText}>
                <div className={s.name}>{createField("Full name", "fullName", [], Input )}</div>
                <div className={s.lfj}>Looking for a Job?{createField("LFJ", "lookingForAJob", [], Input,  'checkbox')}</div>
                <div className={s.text}>{createField("About Me", "aboutMe", [], Textarea, "text" )}</div>
                <div className={s.name}>{createField("My Skills", "lookingForAJobDescription", [], Textarea, "text" )}</div>
            </div>
            <div className={s.userText}>

                {Object.keys(profile.contacts).map(key => {
                    return <div>
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

const ProfileTextFormReduxForm = reduxForm ({form: 'edit-profile'})(ProfileTextForm)

export default ProfileTextFormReduxForm