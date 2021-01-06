import React from 'react'
import styles from "./users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import Loader from "../common/preloader";

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, isAuth, users, ...props}) => {

    return <div className={styles.body}>

        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
        />
        {props.isFetching ? <Loader/> :
        <div>
            {users.map(u =>
                <User user={u}
                      isAuth={isAuth}
                      followingInProgress={props.followingInProgress}
                      follow={props.follow}
                      unfollow={props.unfollow}
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


export default Users