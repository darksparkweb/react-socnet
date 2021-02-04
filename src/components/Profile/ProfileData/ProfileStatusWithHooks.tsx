import React, {ChangeEvent, useEffect, useState} from 'react'
import s from "./ProfileStatus.module.css";
import { Typography,  } from 'antd';
import { Input } from 'antd';
import {PlayCircleOutlined} from '@ant-design/icons'

const { Text } = Typography;
type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}


const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner &&
        setEditMode(true)

    }
    const deactivateEditMode = () => {

        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }



    return (
        <div>
            {!editMode &&
            <div className={s.statusArea}>
                {/*@ts-ignore*/}
                <PlayCircleOutlined style={{marginRight: 3}}/><Text mark onClick={activateEditMode} className={s.status}>{props.status || "Enter your status here"}</Text>
            </div>
            }
            {editMode &&
            <div>
                <Input
                    className={s.statusArea}
                    size="small"
                    placeholder="Enter your status here"
                    prefix={<PlayCircleOutlined />}
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    autoFocus={true}
                    value={status}
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;