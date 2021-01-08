import React from 'react';
import s from './Friends.module.css';
import Listing from './Listing/Listing';
import Loader from "../common/preloader";


const Friends = (props) => {

    let friendsElements = props.friends.map(friends => <Listing store={friends} key={friends.id}/>);

    return (
        <div className={s.body}>
            <h4 className={s.title}>Friends</h4>
            <div className={s.friends}>
                {props.isFetching ? Loader : props.isAuth && friendsElements}
            </div>
        </div>

    )
}

export default Friends