import {getAuthUserData} from "./auth-reducer";
import {InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
}

//TypeScript
//type ThunkType = BaseThunkType<ActionsType>
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

// Actions
export const actions = {
    initializedSuccess: () => ({type: "SN/APP/INITIALIZED_SUCCESS"} as const)
}

// Thunks
export const initializeApp = () => (dispatch: any) => {

    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer;
