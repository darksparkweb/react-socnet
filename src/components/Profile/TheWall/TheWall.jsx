import React from "react";
import s from "./TheWall.module.css";
import Post from "./Post/Post";

const TheWall = (props) => {

  let TheWallElement = props.profilePage.posts.map((posts) => (<Post key={posts.id} message={posts.message} like={posts.like} dislike={posts.dislike} /> ));
  let newPostElement = React.createRef();
  let addPost = () => { props.addPost(); };
  let onPostChange = () => {

    let text = newPostElement.current.value;
    props.updateNewPostText(text);

  };

  return (
    <div>
      <div className={s.lineName}>The WALL</div>
      <div className={s.input}>
        <textarea
          onChange={onPostChange}
          placeholder="Enter your post"
          ref={newPostElement}
          className={s.ta}
          value={props.profilePage.newPostText}
          cols="62"
          rows="6"
        />
        <button className={s.button} onClick={addPost}>
          Add post
        </button>
      </div>
      {TheWallElement}
    </div>
  );
};

export default TheWall;
