import s from "./Buttons.module.css";
import Like from "./Like";
import Dislike from "./Dislike";

const Buttons = (props) => {
  return (
    <div className={s.but}>
      <Like count={props.likes} />
      <Dislike count={props.dislikes}/>
    </div>
  );
};

export default Buttons;
