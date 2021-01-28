import {connect} from "react-redux";
import {follow, requestUsers, unfollow} from "../../Redux/usersReducer";
import React from "react";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

// Types
type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    isAuth: boolean
    isFetching: boolean
    followingInProgress: Array<number>
}
type OwnPropsType = {
    pageTitle: string
}
type MapDispatchToPropsType = {
    unfollow: (userID:number) => void
    follow: (userID:number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type PropsType = MapStateToPropsType & OwnPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, getUsers} = this.props
        getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>

            <Users
                isAuth={this.props.isAuth}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                isFetching={this.props.isFetching}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth
    }
}


export default compose(
    // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,{follow, unfollow, getUsers: requestUsers})
)(UsersContainer)