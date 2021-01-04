import React from 'react'
import s from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {

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
    handleFocus = (event) => event.target.select();
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
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
                    <input onChange={this.onStatusChange} className={s.input} autoFocus={true} onBlur={ this.deactivateEditMode } onFocus={this.handleFocus} value={this.state.status }></input>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;