import TheWall from "./TheWall";
import {addPostThunk, getUserProfile} from "../../../Redux/profileReducer";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class TheWallContainer extends React.Component {


    render() {
        return <TheWall addPost={this.props.addPostThunk} posts={this.props.posts}/>
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,

    }
}

export default compose(
    connect(mapStateToProps, {addPostThunk}),
    withRouter)(TheWallContainer);