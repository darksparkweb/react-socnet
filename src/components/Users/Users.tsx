import React, {FC, useEffect} from 'react'
import styles from './users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import Loader from '../common/preloader'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, requestUsers, follow, unfollow} from '../../Redux/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
    getUsersFilter, isUserAuth
} from '../../Redux/users-selectors'

type PropsType = {
}

export const Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const users = useSelector(getUsers)
    const isAuth = useSelector(isUserAuth)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const isFetching = useSelector(getIsFetching)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[])
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return <div className={styles.body}>

        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
        />
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        {isFetching ? <Loader/> :
            <div>
                {users.map(u =>
                    <User user={u}
                          isAuth={isAuth}
                          followingInProgress={followingInProgress}
                          follow={followUser}
                          unfollow={unfollowUser}
                    />)
                }
            </div>}
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
        />
    </div>
}
