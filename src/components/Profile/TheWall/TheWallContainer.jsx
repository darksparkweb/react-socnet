import TheWall from "./TheWall";
import {addLike, addPostThunk, deletePost} from "../../../Redux/profileReducer";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class TheWallContainer extends React.Component {


    render() {
        return <TheWall  addLike={addLike} addPost={this.props.addPostThunk} deletePost={this.props.deletePost} addLike={this.props.addLike} posts={this.props.posts}/>
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

export default compose(
    connect(mapStateToProps, {addPostThunk, deletePost, addLike }),
    withRouter)(TheWallContainer);