import {profileAPI} from "../api/api";
import {stopSubmit, reset} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const LIKE_POST = "LIKED_POST"

// TypeScript Initial State
export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {id: 0, like: 15, dislike: 1, message: "My name is Valerian", userID: 13236},
        {id: 1, like: 22, dislike: 2, message: "And I wanna be a front-end developer", userID: 13236},
        {id: 2, like: 33, dislike: 3, message: "I really like it! It's really cool!", userID: 13236},
        {id: 3, like: 55, dislike: 5, message: "The Wall will work correctly when the server allows it. sorry", userID: 13236},
        {id: 4, like: 666, dislike: 0, message: "Yeah, bro! I'll make this Wall better soon!", userID: 2},
        {id: 5, like: 39, dislike: 0, message: "Wow, nice work, man!", userID: 13684}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
}



const profileReducer = (state = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                like: 0,
                dislike: 0,
                message: action.theWallPost,
                userID: 13236
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((posts) => posts.id !== action.id )
            }
        case LIKE_POST:
            return {
            ...state, posts: state.posts.map((post) => {
                if (post.id === action.id) {
                    return Object.assign({}, post, { like: post.like+1 }) }
                return post
            })}

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }

        default:
            return state;
    }
};
//TypeScript Action Creators
type AddPostActionCreatorType = {
    type: typeof ADD_POST
    theWallPost: string
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
type DeletePostType = {
    type: typeof DELETE_POST
    id: number
}
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}


export const addPostActionCreator = (theWallPost: string):AddPostActionCreatorType => ({type: ADD_POST, theWallPost})
export const deletePost = (id: number):DeletePostType => ({type: DELETE_POST, id})
export const addLike = (id: number) => ({type: LIKE_POST, id})
export const setUserProfile = (profile: ProfileType):SetUserProfileType => ({type: SET_USER_PROFILE, profile })
export const setStatus = (status: string):SetStatusType => ({type: SET_STATUS, status })
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos })

export const addPostThunk = (theWallPost: string) => (dispatch: any) => {
    dispatch(addPostActionCreator(theWallPost));
    dispatch(reset('AddPost'));
}

export const getUserProfile = (userID: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userID)
        dispatch(setUserProfile(response.data))
};
export const getStatus = (userID: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userID)
        dispatch(setStatus(response.data))
};
export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
};
export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userID = getState().auth.id
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userID))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
};

export default profileReducer;
