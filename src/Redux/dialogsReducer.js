const SEND_MESSAGE = 'SEND-MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.newMessageText}]
            }
        }
        default:
            return state;

    }
}

export const sendMessageActionCreator = (newMessageText) => {
    return {
        type: SEND_MESSAGE,
        newMessageText
    }
};

export default dialogsReducer;