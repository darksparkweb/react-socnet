import React from "react";
import StoreContext from "../../StoreContext";
import Friends from "./Friends";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        list: state.friendsPage
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             dispatch(updateNewPostTextActionCreator(text))
//         },
//         addPost: () => {
//             dispatch(addPostActionCreator());
//         }
//     }
// }

const FriendsContainer = connect (mapStateToProps)(Friends);

export default FriendsContainer;
