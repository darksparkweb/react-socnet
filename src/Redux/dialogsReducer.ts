const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "John Smith"},
        {id: 2, name: "Jim Carry"},
        {id: 3, name: "Angelina Jolly"},
        {id: 4, name: "Vasa Bell"},
        {id: 5, name: "Petia"},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "yo"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "yo"},
        {id: 4, message: "When is your birthday?"},
        {id: 5, message: "yo"},
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialStateType => {
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

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageText: string
}
export const sendMessageActionCreator = (newMessageText: string):SendMessageActionCreatorType => {
    return {
        type: SEND_MESSAGE,
        newMessageText
    }
};

export default dialogsReducer;