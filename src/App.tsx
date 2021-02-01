import React, {ComponentType} from 'react'
import store, {AppStateType} from './Redux/redux-store'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {library} from '@fortawesome/fontawesome-svg-core'
import {far} from '@fortawesome/free-regular-svg-icons'
import './style.css'
import HeaderContainer from './components/Header/HeaderContainer'
import {LoginPage} from './components/Login/loginPage'
import {compose} from 'redux'
import {initializeApp} from './Redux/app-reducer'
import Loader from './components/common/preloader'
import {withSuspense} from './Hoc/WithSuspense'
import {Users} from './components/Users/Users'


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

library.add(far);

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<StatePropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <div className="loader"><Loader/></div>
        }
        return (

            <div className="sectionOne">
                <div className="myFirstApp">
                    <HeaderContainer/>
                    <div className="sidebar">
                        <Navbar/>
                    </div>
                    <div className="app-content">
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/dialogs"
                                   render={() => <SuspendedDialogs/>}/>
                            <Route path="/profile/:userID?"
                                   render={() => <SuspendedProfile/>}/>
                            <Route path="/users"
                                   render={() => <Users/>}/>
                            <Route path="/news"
                                   render={() => <News/>}/>
                            <Route path="/music"
                                   render={() => <Music/>}/>
                            <Route path="/settings"
                                   render={() => <Settings/>}/>
                            <Route path="/login"
                                   render={() => <LoginPage/>}/>
                            <Route path="*"
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocNetApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocNetApp