import React from "react"
import Header, {PropsType, DispatchPropsType} from "./Header"
import {connect} from "react-redux"
import {logout} from "../../Redux/auth-reducer"
import {AppStateType} from "../../Redux/redux-store"

class HeaderContainer extends React.Component<PropsType & DispatchPropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
    logout: () => {
    }
})
export default connect<PropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);
