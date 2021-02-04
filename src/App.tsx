import React, {ComponentType} from 'react'
import store, {AppStateType} from './Redux/redux-store'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {library} from '@fortawesome/fontawesome-svg-core'
import {far} from '@fortawesome/free-regular-svg-icons'
import 'antd/dist/antd.css'
import './style.css'
import {LoginPage} from './components/Login/loginPage'
import {compose} from 'redux'
import {initializeApp} from './Redux/app-reducer'
import Loader from './components/common/preloader'
import {withSuspense} from './Hoc/WithSuspense'
import {Users} from './components/Users/Users'
import Layout from 'antd/lib/layout'
import {AppHeader} from './components/Header/Header'

const {Content, Footer} = Layout

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

library.add(far)

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChat = withSuspense(ChatPage)

class App extends React.Component<StatePropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Loader/>
        }
        return (
            <Layout className="layout">
                <AppHeader/>
                <Content style={{padding: '0 50px', height: '100%'}}>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={'/profile'}/>}/>
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
                            <Route path="/chat"
                                   render={() => <SuspendedChat/>}/>
                            <Route path="*"
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>FriendHook ©2021 Created by Onium Web</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SocNetApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocNetApp