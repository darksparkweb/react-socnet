import React from "react";
import s from "./TheWall.module.css";
import Post from "./Post/Post";
import {AddPostForm} from "./AddPostForm";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string)=> void
    deletePost: (id: number) => void
}


const TheWall:React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let TheWallElement = props.posts.map(p => (
        <Post deletePost={props.deletePost} userID={p.userID} key={p.id} id={p.id} message={p.message} like={p.like} />));

    const onSubmit = (values:any) => {
        props.addPost(values.newPostText)
    }
    return (
        <div>
            <div className={s.lineName}>The WALL</div>

            <AddPostForm onSubmit={onSubmit}/>
            {TheWallElement}
        </div>
    )
}

const TheWallMemo = React.memo(TheWall)

export default TheWallMemo;
