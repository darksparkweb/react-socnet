import React, {FC, useEffect} from 'react'
import styles from './users.module.css'
import User from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, follow, requestUsers, unfollow} from '../../Redux/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
    isUserAuth
} from '../../Redux/Selectors/users-selectors'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'
import {LoadingOutlined} from '@ant-design/icons'
import Space from 'antd/lib/space'
import Pagination from 'antd/lib/pagination'



type QueryParamsType = { term?: string, page?: string, friend?: string }


export const Users: FC = (props) => {
    /// -------------Hooks-------------------------------------///
    const totalUsersCount = useSelector(getTotalUsersCount)
    const users = useSelector(getUsers)
    const isAuth = useSelector(isUserAuth)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const isFetching = useSelector(getIsFetching)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })

    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onPageSizeChanged = (current: number, size: number) => {
        dispatch(requestUsers(current, size, filter))
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
    /// -------------------UI-------------------------///
    return <div className={styles.body}>
        <Space direction={'vertical'} align={'center'}>
            <Pagination
                onChange={onPageChanged}
                current={currentPage}
                total={totalUsersCount}
                pageSize={pageSize}
                onShowSizeChange={onPageSizeChanged}
            />
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            {isFetching ? <LoadingOutlined style={{
                    fontSize: 58,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: ' 35vh auto'
                }}/> :
                <div>
                    <Space direction={'vertical'}>
                        {users.map(u =>
                            <User user={u}
                                  isAuth={isAuth}
                                  followingInProgress={followingInProgress}
                                  follow={followUser}
                                  unfollow={unfollowUser}
                            />)
                        }
                    </Space>
                </div>}
            <Pagination
                onChange={onPageChanged}
                current={currentPage}
                total={totalUsersCount}
                pageSize={pageSize}
                onShowSizeChange={onPageSizeChanged}
            />
        </Space>

    </div>
}
