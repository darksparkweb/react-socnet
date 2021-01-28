import React, {ChangeEvent} from 'react'
import s from "./ProfileStatus.module.css";

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () =>  {

        this.setState({
            editMode:true
        })
    }
    deactivateEditMode = () =>  {

        this.setState({
            editMode:false
        })
        this.props.updateStatus(this.state.status)
    }
    handleFocus = (event: ChangeEvent<HTMLInputElement>) => event.target.select();
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                <div className={s.statusArea}>
                    <span className={s.status} onClick={ this.activateEditMode }>{this.props.status || "----"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} className={s.input} autoFocus={true} onBlur={ this.deactivateEditMode } onFocus={this.handleFocus} value={this.state.status }/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;