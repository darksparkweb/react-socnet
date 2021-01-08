import {profileAPI} from "../api/api";
import {stopSubmit, reset} from "redux-form";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
    posts: [
        {id: 1, like: 15, dislike: 1, message: "My name is Valerian", userID: 13236},
        {id: 2, like: 22, dislike: 2, message: "And I wanna be a front-end developer", userID: 13236},
        {id: 3, like: 33, dislike: 3, message: "I really like it! It's really cool!", userID: 13236},
        {id: 5, like: 55, dislike: 5, message: "The Wall will work correctly when the server allows it. sorry", userID: 13236},
        {id: 6, like: 666, dislike: 0, message: "Yeah, bro! I'll make this Wall better soon!", userID: 2},
        {id: 7, like: 39, dislike: 0, message: "Wow, nice work, man!", userID: 13684}
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                like: 0,
                dislike: 0,
                message: action.theWallPost,

            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };

        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }

        default:
            return state;
    }
};

export const addPostActionCreator = (theWallPost) => ({type: ADD_POST, theWallPost})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos })

export const addPostThunk = (theWallPost) => (dispatch) => {
    dispatch(addPostActionCreator(theWallPost));
    dispatch(reset('AddPost'));
}
export const getUserProfile = (userID) => async (dispatch) => {
    const response = await profileAPI.getProfile(userID)
        dispatch(setUserProfile(response.data))
};
export const getStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
        dispatch(setStatus(response.data))
};
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
};
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
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
