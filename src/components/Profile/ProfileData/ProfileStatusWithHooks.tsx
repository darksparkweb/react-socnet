import React, {ChangeEvent, useEffect, useState} from 'react'
import s from "./ProfileStatus.module.css";


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
                <span onClick={activateEditMode} className={s.status}>{props.status || "Enter your status here"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input
                    // @ts-ignore
                    size={"70"}
                    placeholder={"Enter your status here"}
                    type={"text"}
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    className={s.input}
                    autoFocus={true}
                    value={status}>
                </input>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;