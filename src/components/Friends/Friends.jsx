import React from 'react';
import s from './Friends.module.css';
import Listing from './Listing/Listing';


 const Friends = (props) => {

    let friendsElements = props.list.friends.map( friends => <Listing store={friends} key={friends.id} />);

    return (
        <div className={s.friends}>
           {friendsElements} 
        </div>
    )
}

export default Friends