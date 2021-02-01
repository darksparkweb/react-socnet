import {InferActionsType} from "./redux-store";

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

const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/dialogs/SEND-MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, {id: Date.now(), message: action.newMessageText}]
            }
        }
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (newMessageText: string) => {
        return {
            type: 'SN/dialogs/SEND-MESSAGE',
            newMessageText
        }
    }
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>