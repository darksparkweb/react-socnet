import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";


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
    <DialogItem name={dialogs.name} key ={dialogs.id} id={dialogs.id} />
  ));
  let messagesElements = state.messages.map((messages) => (
    <Message message={messages.message} key={messages.id} />
  ));

  let newMessageBody = state.newMessageText;

  let sendMessage = () => {
    props.sendMessage();
    
  };

  let onMTextChange = (e) => {
    let body = e.target.value;
    props.onMTextChange(body);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogName}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <div className={s.input}>
          <textarea
            placeholder='enter your message here...'
            onChange={onMTextChange}
            value={newMessageBody}
            className={s.textarea}
            cols="49"
            rows="4"
          />
          <button className={s.button} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
