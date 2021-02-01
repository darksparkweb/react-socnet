import usersReducer, {actions, InitialStateType} from './usersReducer'

let state: InitialStateType;

beforeEach(()=> {
    state = {
        users: [
            {id: 0, name: "Dimych1", followed: false, photos: {small: null, large: null}, status: 'status1'},
            {id: 1, name: "Dimych2", followed: false, photos: {small: null, large: null}, status: 'status2'},
            {id: 2, name: "Dimych3", followed: true, photos: {small: null, large: null}, status: 'status3'},
            {id: 3, name: "Dimych4", followed: true, photos: {small: null, large: null}, status: 'status4'},
        ],
        pageSize: 30,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('followSuccess', () => {
    //userReducer

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollowSuccess', () => {
    //userReducer

    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()

})