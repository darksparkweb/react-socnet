import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {requestFriends, setCurrentPage} from "../../Redux/friendsReducer";
import {login} from "../../Redux/auth-reducer";
import {
    getCurrentPage,
    getFriends,
    getIsFetching,
    getPageSize,
    getTotalFriendsCount
} from "../../Redux/friends-selectors";
import Friends from "./Friends";

class FriendsContainer extends React.Component {

    getFriendsList = () => {
        this.props.getFriends(this.props.currentPage, this.props.pageSize);
    }
    componentDidMount() {
        this.getFriendsList()
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.totalUsersCount !== prevProps.totalUsersCount) {
    //         this.getFriendsList()
    //     }
    // }

    render() {
        return <>

            <Friends
                isAuth={this.props.isAuth}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                friends={this.props.friends}
                isFetching={this.props.isFetching}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: getIsFetching(state),
        friends: getFriends(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalFriendsCount(state),
        currentPage: getCurrentPage(state),
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect(mapStateToProps,
        {setCurrentPage, getFriends: requestFriends,login})
)(FriendsContainer);
