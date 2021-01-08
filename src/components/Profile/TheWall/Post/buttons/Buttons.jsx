import s from "./Buttons.module.css";
import Like from "./Like";
import Dislike from "./Dislike";
import React from 'react'

const Buttons = (props) => {
  return (
    <div className={s.but}>
      <Like count={props.likes} />
      <Dislike count={props.dislikes}/>
    </div>
  );
};

export default Buttons;
