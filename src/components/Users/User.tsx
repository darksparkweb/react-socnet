import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../img/user.png'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../types/types'
import {MinusOutlined, PlusOutlined} from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import Paragraph from 'antd/lib/typography/Paragraph'
import Card from 'antd/lib/card'
import Space from 'antd/lib/space'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    isAuth: boolean
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow, isAuth}) => {

    return (

        <div className="site-card-border-less-wrapper">

            <Card size={'small'} bordered={true}>
                <div className={styles.card} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Space>
                        <NavLink to={'/Profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                 className={styles.userPhoto}
                                 alt={user.name}/>
                        </NavLink>
                        <div>
                            <Paragraph className={styles.userName}>{user.name}</Paragraph>
                            <Text className={styles.status} style={{}} ellipsis={true}>{user.status}</Text>
                        </div>
                    </Space>
                    {isAuth ? (user.followed
                        ? <button
                            className={styles.unfollow}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}><MinusOutlined /></button>
                        : <button
                            className={styles.follow}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}><PlusOutlined /></button>) : null
                    }
                </div>
            </Card>
        </div>

    )
}


export default User