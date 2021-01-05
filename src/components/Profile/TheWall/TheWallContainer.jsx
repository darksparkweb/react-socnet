import TheWall from "./TheWall";
import {addPostActionCreator} from "../../../Redux/profileReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (theWallPost) => {
            dispatch(addPostActionCreator(theWallPost));
    }
    }
}

const TheWallContainer = connect (mapStateToProps, mapDispatchToProps)(TheWall);

export default TheWallContainer;
