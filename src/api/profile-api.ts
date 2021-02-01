import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

//TypeScript Profile
type SavePhotoResponseDataType = {
    photos: PhotosType
}
export const profileAPI = {
    getProfile(userID: number) {
        return instance.get<ProfileType>(`profile/` + userID).then(res=>res.data)
    },
    getStatus(userID: number) {
        return instance.get<string>(`profile/status/` + userID).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile/`, profile).then(res => res.data)
    }
}