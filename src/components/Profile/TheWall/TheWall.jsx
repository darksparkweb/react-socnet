import React from "react";
import s from "./TheWall.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../Utils/Validators/validators";
import {Textarea} from "../../common/FormsControls/formsControls";

const maxLength10 = maxLength(100)

const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={s.input}>
            <Field
                component={Textarea}
                validate={[required, maxLength10]}
                name={"theWallPost"}
                placeholder="Enter your post"
                rows="5"
            />
            <button className={s.button}>
                Add post
            </button>
        </form>
    )
}

const AddPostReduxForm = reduxForm({form: 'AddPost'})(AddPostForm)


const TheWall = React.memo((props) => {
    let TheWallElement = props.posts.map((posts) => (
        <Post userID={posts.userID} key={posts.id} message={posts.message} like={posts.like} dislike={posts.dislike}/>));

    const onSubmit = (values) => {
        props.addPost(values.theWallPost)
    }

    return (
        <div>
            <div className={s.lineName}>The WALL</div>

            <AddPostReduxForm onSubmit={onSubmit}/>
            {TheWallElement}
        </div>
    );
})

export default TheWall;
