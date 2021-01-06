import React from "react";
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/formsControls";
import {maxLength, required} from "../../Utils/Validators/validators";


const DialogItem = (props) => {
    let path = "/Dialogs/" + props.id;

    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};

const Message = (props) => {
    return <div className={s.message}>{props.message}</div>;
};

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((dialogs) => (
        <DialogItem name={dialogs.name} key={dialogs.id} id={dialogs.id}/>
    ));
    let messagesElements = state.messages.map((messages) => (
        <Message message={messages.message} key={messages.id}/>
    ));

    let sendMessage = (values) => {
        props.sendMessage(values.newMessageText);
    };

    return (
        <div className={s.dialogs}>
            <div>{dialogsElements}</div>
            <div>
                {messagesElements}
                <SendMessageRedux onSubmit={sendMessage}/>
            </div>
        </div>
    );
};
const maxLength300 = maxLength(300)

const SendMessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={s.input}>
            {/*<div className={s.field}>*/}
            <Field
                component={Textarea}
                validate={[required, maxLength300]}
                name={"newMessageText"}
                placeholder='enter your message here...'
                className={s.textarea}
                cols="44"
                rows="4"
            />
            <button className={s.button}>
                Send
            </button>
            {/*</div>*/}
        </form>
    )
}

const SendMessageRedux = reduxForm({form: 'SendMessage'})(SendMessageForm)

export default Dialogs;
