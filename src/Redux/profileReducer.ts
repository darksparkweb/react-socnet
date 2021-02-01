import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {profileAPI} from "../api/profile-api";

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
    status: "",
    theWallPost: ""
}



const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case "SN/profile/ADD-POST": {
            let newPost = {
                id: Date.now(),
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
        case "SN/profile/DELETE_POST": {
            return {
                ...state,
                posts: state.posts.filter((posts) => posts.id !== action.id)
            }
        }
        case "SN/profile/SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SN/profile/SET_STATUS": {
            return {...state, status: action.status}
        }
        case "SN/profile/SAVE_PHOTO_SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }

        default:
            return state;
    }
};

export const actions = {
    addPostActionCreator: (theWallPost: string) => ({type: "SN/profile/ADD-POST", theWallPost} as const),
    deletePost: (id: number) => ({type: "SN/profile/DELETE_POST", id} as const),
    setUserProfile: (profile: ProfileType) => ({type: "SN/profile/SET_USER_PROFILE", profile } as const),
    setStatus: (status: string) => ({type: "SN/profile/SET_STATUS", status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: "SN/profile/SAVE_PHOTO_SUCCESS", photos } as const),
}

//Thunks
//@ts-ignore
// export const addPostThunk = (theWallPost: string):ThunkType => (dispatch) => {
//     dispatch(actions.addPostActionCreator(theWallPost));
//     dispatch (<ActionsType>reset('AddPost'));
// }
export const getUserProfile = (userID: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userID)
        dispatch(actions.setUserProfile(data))
};
export const getStatus = (userID: number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userID)
        dispatch(actions.setStatus(data))
};
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
};
export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
};
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    const userID = getState().auth.id
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (typeof userID === "number") {
            await dispatch(getUserProfile(userID))
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
        return Promise.reject(data.messages[0])
    }
};

export default profileReducer;

// TypeScript Thunks
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
