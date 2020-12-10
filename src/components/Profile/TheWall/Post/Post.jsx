import s from "./Post.module.css";
import Buttons from "./buttons/Buttons";

const Post = (props) => {
  return (
    <div>
      <div className={s.post}>
        <div className={s.avatar}></div>
        <div className={s.text}>{props.message}</div>
      </div>
      <Buttons likes={props.like} dislikes={props.dislike}/>
    </div>
  );
};

export default Post;
