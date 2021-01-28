import s from "./Post.module.css";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import dltButton from "../../../../img/deletePost.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Post = (props) => {
    const [likesCount, setLikesCount] = useState(props.like);
    useEffect(() => {
        props.likePost(props.id)
    });
    return (
        <div className={s.postContainer}>
            <div className={s.post}>
                <NavLink to={/profile/ + props.userID}>
                    <img className={s.avatar}
                         src={"https://social-network.samuraijs.com/activecontent/images/users/" + props.userID + "/user.jpg?v=6"}
                         alt={props.key}/>
                </NavLink>
                <div className={s.text}>{props.message}</div>
                <div className={s.buttons}>
                    <img onClick={() => {props.deletePost(props.id)}} className={s.delete} src={dltButton} alt={'delete'}/>
                </div>
            </div>
            <div onClick={() => setLikesCount(likesCount + 1)} className={s.like}><b>{likesCount} </b><FontAwesomeIcon icon={['far', 'thumbs-up']}/></div>
        </div>
    );
};
//onClick={() => setLikesCount(likesCount + 1)}
export default Post;
