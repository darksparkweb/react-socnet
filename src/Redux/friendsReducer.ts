import {friendsAPI} from "../api/api";
import {ToggleIsFetchingType, UserType} from "../types/types";

const SET_FRIENDS = "SET_FRIENDS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

let initialState = {
    friends: [] as Array<UserType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}
type InitialStateType = typeof initialState

const friendsReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SET_FRIENDS: {
            return {...state, friends: action.users}
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
        default:
            return state;
    }
};
//Action Creators
export const setFriends = (users: Array<UserType>):SetFriendsType => {
    return {type: SET_FRIENDS, users}
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

// TypeScript Action Creators
type SetFriendsType = {
    type: typeof SET_FRIENDS
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

// Thunks
export const requestFriends = (page:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await friendsAPI.getFriends(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setFriends(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

export default friendsReducer;
