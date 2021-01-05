import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "32a514d0-8ff7-42c9-aa72-0aa539678439"}
    }
)

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unFollowUser(userID) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
    followUser(userID) {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userID) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userID)
    }
}
export const profileAPI = {
    getProfile(userID) {
        return instance.get(`profile/` + userID)
    },
    getStatus(userID) {
        return instance.get(`profile/status/` + userID)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile/`, profile)
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`, {})
    }

}


