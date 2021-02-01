import {maxLength, required} from "../../Utils/Validators/validators";
import s from "./Dialogs.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/formsControls";
import React from "react";
import {NewMessageFormValuesType} from "./Dialogs";

const maxLength300 = maxLength(300)
type NewMessageFormKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

export const SendMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.input}>
            {createField<NewMessageFormKeysType>('enter your message here...', "newMessageText", [required, maxLength300], Textarea, "")}

            <button className={s.button}>
                Send
            </button>
        </form>
    )
}
export const SendMessageRedux = reduxForm<NewMessageFormValuesType>({form: 'SendMessage'})(SendMessageForm)