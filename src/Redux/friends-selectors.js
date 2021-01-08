export const getFriends = (state) => {
    return state.friendsPage.friends
}

export const getPageSize = (state) => {
    return state.friendsPage.pageSize
}

export const getTotalFriendsCount = (state) => {
    return state.friendsPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.friendsPage.currentPage
}

export const getIsFetching = (state) => {
    return state.friendsPage.isFetching
}

// export const getFollowingInProgress = (state) => {
//     return state.friendsPage.followingInProgress
// }

