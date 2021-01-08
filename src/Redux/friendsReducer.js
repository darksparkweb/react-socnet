import {friendsAPI} from "../api/api";

const SET_FRIENDS = "SET_FRIENDS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

let initialState = {
    friends: [],
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}


const friendsReducer = (state = initialState, action) => {
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

export const setFriends = (users) => {
    return {type: SET_FRIENDS, users}
};
export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};
export const setTotalUsersCount = (count) => {
    return {type: SET_TOTAL_USERS_COUNT, count}
};
export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
};

export const requestFriends = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await friendsAPI.getFriends(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setFriends(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

export default friendsReducer;
