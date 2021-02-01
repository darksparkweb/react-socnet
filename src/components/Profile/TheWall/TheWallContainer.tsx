import TheWallMemo, {DispatchPropsType, MapPropsType} from "./TheWall";
import {actions} from "../../../Redux/profileReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const TheWallContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator,
    deletePost: actions.deletePost
})(TheWallMemo)

export default TheWallContainer