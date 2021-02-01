import s from "./Post.module.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import dltButton from "../../../../img/deletePost.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type PropsType = {
    userID: number | null
    message: string
    deletePost: (id: number) => void
    like: number
    id: number
}

const Post: React.FC<PropsType> = (props) => {
    const [likesCount, setLikesCount] = useState(props.like);

    const {userID} = props;

    return (
        <div className={s.postContainer}>
            <div className={s.post}>
                 {/*@ts-ignore*/}
                <NavLink to={/profile/ + userID}>
                    <img className={s.avatar}
                         src={"https://social-network.samuraijs.com/activecontent/images/users/" + props.userID + "/user.jpg?v=6"}
                         alt={"avatar"}/>
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
export default Post;
