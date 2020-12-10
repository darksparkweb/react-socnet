import React from 'react'
import styles from "./users.module.css";
import userPhoto from "../../img/user.png";
import {NavLink} from "react-router-dom";
import {unFollow} from "../../Redux/usersReducer";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div>
        <div className={styles.pagesCount}>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => {
                        props.onPageChanged(p)
                    }}>{p}
                    </span>
            })}

        </div>
        {
            props.users.map(u => <div className={styles.userBar} key={u.id}>
                <span>
                    <div>
                        <NavLink to={"/Profile/" + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}
                             alt={u.name}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
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