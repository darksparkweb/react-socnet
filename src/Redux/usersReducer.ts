import {UserType} from '../types/types'
import {BaseThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'
import {usersAPI} from '../api/users-api'
import {APIResponseType} from '../api/api'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of userId
    filter: {
        term: "",
        friend: null as null | boolean
    }
}



const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/users/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'SN/users/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SN/users/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/users/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/users/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'SN/users/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        }
        case 'SN/users/SET_FILTER': {
            return {...state, filter: action.payload}
        }
        default:
            return state
    }
}

//ActionCreators
export const actions = {
    followSuccess: (userID: number) => ({type: 'SN/users/FOLLOW', userID} as const),
    unfollowSuccess: (userID: number) => ({type: 'SN/users/UNFOLLOW', userID} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/users/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (count: number) => ({type: 'SN/users/SET_TOTAL_USERS_COUNT', count} as const),
    setFilter: (filter: FilterType) => ({type: "SN/users/SET_FILTER", payload: filter} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userID: number) => ({
        type: 'SN/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userID
    } as const)

}

//Thunks
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userID: number, apiMethod: (userId:number)=> Promise<APIResponseType>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userID))
    let data = await apiMethod(userID)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.toggleFollowingProgress(false, userID))
}
export const follow = (userID: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userID, usersAPI.followUser, actions.followSuccess)
    }
}
export const unfollow = (userID: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userID, usersAPI.unFollowUser, actions.unfollowSuccess)
    }
}

export default usersReducer

// TypeScript
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>