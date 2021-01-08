import React, {useState} from "react";
import s from "./TheWall.module.css";
import Post from "./Post/Post";
import {maxLength} from "../../../Utils/Validators/validators";

const maxLength100 = maxLength(100)

const TheWallWithHooks = (props) => {
    const [posts, setPosts] = useState([
        {id: 1, like: 15, dislike: 1, message: "My name is Valerian", userID: 13236},
        {id: 2, like: 22, dislike: 2, message: "And I wanna be a front-end developer", userID: 13236},
        {id: 3, like: 33, dislike: 3, message: "I really like it!", userID: 13236},
        {id: 4, like: 44, dislike: 4, message: "It's really cool!", userID: 13236},
        {id: 5, like: 55, dislike: 5, message: "Peace and Love", userID: 13236}
    ])

    const [postText, setPostText] = useState('')


    const addPost = event => {
        if (event.key === "Enter") {
            setPosts([
                ...posts,
                {
                    id: Date.now(),
                    like: 0,
                    dislike: 0,
                    message: postText,
                    userID: 13236
                }
            ])
            setPostText("")
        }
    }
    let TheWallElement = posts.map((posts) => (
        <Post key={posts.id} message={posts.message} like={posts.like} dislike={posts.dislike}/>));

    return (
        <div>
            <div className={s.lineName}>The WALL</div>
            <div className={s.input}>
                <textarea
                    className={s.textArea}
                    rows="4"
                    placeholder="Enter your post"
                    value={postText}
                    onChange={event => setPostText(event.target.value)}
                    onKeyPress={addPost}
                />
                <input className={s.button}
                    type='submit'
                />
            </div>
            {TheWallElement}
        </div>
    );
}


export default TheWallWithHooks;
