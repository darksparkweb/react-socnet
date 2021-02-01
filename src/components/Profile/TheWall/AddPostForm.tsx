import s from "./TheWall.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../common/FormsControls/formsControls";
import {maxLength, required} from "../../../Utils/Validators/validators";
import React from "react";

const maxLength100 = maxLength(70)

type PropsType = {

}
export type AddPostValuesType = {
    newPostText: string
}
type AddPostFormValuesKeysType = GetStringKeys<AddPostValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostValuesType, PropsType> & PropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={s.input}>
            {createField<AddPostFormValuesKeysType>('Enter your post', "newPostText", [required, maxLength100], Textarea, "")}
            <button className={s.button}>
                Add post
            </button>
        </form>
    )
}
export const AddPostReduxForm = reduxForm<AddPostValuesType, PropsType>({form: 'AddPost'})(AddPostForm)