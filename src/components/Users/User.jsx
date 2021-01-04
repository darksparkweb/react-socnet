import React from 'react'
import styles from "./users.module.css";
import userPhoto from "../../img/user.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return <div className={styles.body}>

        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
        />
        {users.map(u => <div className={styles.userBar} key={u.id}>
                <span>
                    <div>
                        <NavLink to={"/Profile/" + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}
                             alt={u.name}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                            : <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                        }
                    </div>
                </span>
            <span>
                    <span className={styles.statusbar}>
                        <div>{u.name}</div>
                        <div className={styles.status}>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                        <div></div>
                    </span>
                </span>
        </div>)
        }
    </div>
}


export default Users