import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import FriendsContainer from "./components/Friends/FriendsContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {Route, withRouter} from "react-router-dom";
import "./style.css";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import Loader from "./components/common/preloader";
import {withSuspense} from "./Hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


library.add(far);

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Loader/>
        }
        return (

            <div className="sectionOne">
                <div className="myFirstApp">
                    <HeaderContainer/>
                    <div className="sidebar">
                        <Navbar/>
                        <FriendsContainer/>
                    </div>
                    <div className="app-content">
                        <Route
                            path="/dialogs"
                            render={withSuspense(DialogsContainer)}
                        />
                        <Route
                            path="/profile/:userID?"
                            render={withSuspense(ProfileContainer)}
                        />
                        <Route
                            path="/users"
                            render={() => <UsersContainer/>}/>
                        <Route
                            path="/news"
                            render={() => <News/>}/>
                        <Route
                            path="/music"
                            render={() => <Music/>}/>
                        <Route
                            path="/settings"
                            render={() => <Settings/>}/>
                        <Route
                            path="/login"
                            render={() => <Login/>}/>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
