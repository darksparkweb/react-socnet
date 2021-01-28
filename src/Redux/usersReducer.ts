import {usersAPI} from "../api/api";
import {ToggleIsFetchingType, UserType} from "../types/types";


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of userId
}

//TypeScript InitialState
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        }
        default:
            return state;
    }
}
//ActionCreators
export const followSuccess = (userID:number):FollowSuccessType => {
    return {type: FOLLOW, userID}
};
export const unfollowSuccess = (userID:number):UnfollowSuccessType => {
    return {type: UNFOLLOW, userID}
};
export const setUsers = (users: Array<UserType>):SetUsersType => {
    return {type: SET_USERS, users}
};
export const setCurrentPage = (currentPage:number):SetCurrentPageType => {
    return {type: SET_CURRENT_PAGE, currentPage}
};
export const setTotalUsersCount = (count:number):SetTotalUsersCountType => {
    return {type: SET_TOTAL_USERS_COUNT, count}
};
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};
export const toggleFollowingProgress = (isFetching:boolean, userID:number):ToggleFollowingProgressType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID}
};
// TypeScript of ActionCreators
type FollowSuccessType = {
    type: typeof FOLLOW
    userID: number
}
type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userID: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number
}

//Thunks
export const requestUsers = (page:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
const followUnfollowFlow = async(dispatch:any, userID:number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userID))
    let data = await apiMethod(userID)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}
export const follow = (userID:number) => {
    return async (dispatch:any) => {
        await followUnfollowFlow(dispatch, userID, usersAPI.followUser, followSuccess)
    }
}
export const unfollow = (userID:number) => {
    return async (dispatch:any) => {
        await followUnfollowFlow(dispatch, userID, usersAPI.unFollowUser, unfollowSuccess)
    }
}

export default usersReducer