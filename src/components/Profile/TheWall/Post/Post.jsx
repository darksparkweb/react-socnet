import s from "./Post.module.css";
import Buttons from "./buttons/Buttons";
import React from "react";
import {NavLink} from "react-router-dom";

const Post = (props) => {return (
        <div>
            <div className={s.post}>
                <NavLink to={/profile/ + props.userID}><img className={s.avatar} src={"https://social-network.samuraijs.com/activecontent/images/users/" + props.userID + "/user.jpg?v=6"} alt={props.key}/></NavLink>
                <div className={s.text}>{props.message}</div>
            </div>
            <Buttons likes={props.like} dislikes={props.dislike}/>
        </div>
    );
};

export default Post;
