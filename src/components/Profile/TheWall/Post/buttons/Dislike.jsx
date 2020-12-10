import s from "./Dislike.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dislike = (props) => {
  return (
    <div className={s.dislike}>
      <FontAwesomeIcon icon={['far', 'thumbs-down']} /> <b>{props.count}</b>  
    </div>
  );
};

export default Dislike;
