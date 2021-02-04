import React from 'react'
import {Users} from './Users'

type UsersPagePropsType = {
    pageSize: any
}
const UsersPage: React.FC<UsersPagePropsType> = () => {

    return <>
        <Users />
    </>
}