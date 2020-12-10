import s from "./PostHeader.module.css";



const PostHeader = (props) => {
  return (
    <div className={s.header}>
      <img
        src="https://images.r.cruisecritic.com/features/2016/06/tropic-hero.jpg"
        className={s.image}
      />
    </div>
  );
};

export default PostHeader;
