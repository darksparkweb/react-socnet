import {instance, APIResponseType, UsersAPIType} from "./api";



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100, term: string = "", friend: null | boolean = null) {
        return instance.get<UsersAPIType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    followUser(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`).then(res => res.data)
    },
    unFollowUser(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponseType>
    },
}