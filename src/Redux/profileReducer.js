const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
    posts: [
        {id: 1, like: 15, dislike: 1, message: "My name is Valerian"},
        {id: 2, like: 22, dislike: 2, message: "And I wanna be a front-end developer",},
        {id: 3, like: 33, dislike: 3, message: "I'm really like it!"},
        {id: 4, like: 44, dislike: 4, message: "It's really cool!"},
        {id: 5, like: 55, dislike: 5, message: "Peace and Love"},
    ],
    newPostText: "",
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                message: state.newPostText,
                like: 0,
                dislike: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };

        }
        case UPDATE_NEW_POST_TEXT: {return {...state, newPostText: action.newText}}
        case SET_USER_PROFILE: {return {...state, profile: action.profile};}
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
};
export const setUserProfile = (profile) => {return {type: SET_USER_PROFILE, profile }};
export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
};

export default profileReducer;
