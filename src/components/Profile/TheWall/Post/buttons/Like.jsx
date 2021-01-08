import React from 'react'
import s from "./Like.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = (props) => {
  return (
    <div className={s.like}>
    <FontAwesomeIcon icon={['far', 'hand-spock']} onClick={props.count + 1}/> <b>{props.count}</b>
  </div>
  );
};

export default Like;
