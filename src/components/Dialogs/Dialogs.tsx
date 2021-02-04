import React from 'react'
import s from './Dialogs.module.css'
import {InitialStateType} from '../../Redux/dialogsReducer'
import {Message} from './Message'
import {DialogItem} from './DialogItem'
import {SendMessageForm} from './SendMessageForm'

export type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
    newMessageText: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((dialogs) => (
        <DialogItem name={dialogs.name} key={dialogs.id} id={dialogs.id}/>
    ));
    let messagesElements = state.messages.map((messages) => (
        <Message message={messages.message} key={messages.id}/>
    ));

    let sendMessage = (values: {newMessageText:string}) => {
        props.sendMessage(values.newMessageText)
    };

    return (
        <div className={s.dialogs}>
            <div>{dialogsElements}</div>
            <div>
                {messagesElements}
                <SendMessageForm onSubmit={sendMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;
