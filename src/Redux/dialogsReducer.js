const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {id: 1, name: "John Smith"},
        {id: 2, name: "Jim Carry"},
        {id: 3, name: "Angelina Jolly"},
        {id: 4, name: "Vasa Bell"},
        {id: 5, name: "Petia"},
    ],
    messages: [
        {id: 1, message: "yo"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "yo"},
        {id: 4, message: "When is your birthday?"},
        {id: 5, message: "yo"},
    ],
    newMessageText: ""
}

const dialogsReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
    messages: [ ...state.messages]
    };

    switch (action.type) {
        case SEND_MESSAGE: {
            let body = state.newMessageText;
            return {
                ...state,
                newMessageText: "",
                messages: [ ...state.messages, { id: 6, message: body}],

            }

        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
            ...state,
                newMessageText: action.body
            }


        }
        default:
            return state;

    }
}

export const sendMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    }
};
export const updateNewMessageTextActionCreator = (body) => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, body: body}
};

export default dialogsReducer;