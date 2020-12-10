import React from "react";
import TheWall from "./TheWall";
import {
    addPostActionCreator,
    updateNewPostTextActionCreator,
} from "../../../Redux/profileReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost: () => {
            dispatch(addPostActionCreator());
    }
    }
}

const TheWallContainer = connect (mapStateToProps, mapDispatchToProps)(TheWall);

export default TheWallContainer;
