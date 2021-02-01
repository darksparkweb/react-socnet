import React from 'react'
import styles from "./users.module.css";
import userPhoto from "../../img/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userID:number) => void
    follow: (userID:number) => void
    isAuth: boolean
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow, isAuth}) => {
    return (
        <div className={styles.userBar} key={user.id}>
                <span className={styles.grow}>
                    <div>
                        <NavLink to={"/Profile/" + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}
                             alt={user.name}/>
                        </NavLink>
                    </div>

                </span>
            <span className={styles.info + " " + styles.grow}>
                    <span className={styles.statusbar}>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.status}>{user.status}</div>
                    </span>
                </span>
            {isAuth &&
            <div className={styles.grow}>
                {user.followed
                    ? <button
                        className={styles.unfollow}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                    : <button
                        className={styles.follow}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                }
            </div>
            }
        </div>)
}


export default User