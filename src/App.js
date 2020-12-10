import React from 'react';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import FriendsContainer from "./components/Friends/FriendsContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Route } from "react-router-dom";
import "./style.css";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

library.add(far);

const App = () => {

  return (
    
      <div className="sectionOne">
        <div className="myFirstApp">
          <Header />
          <div className="sidebar">
          <Navbar />
          <FriendsContainer />
          </div>
          <div className="app-content">
            <Route
              path="/dialogs"
              render={() => <DialogsContainer/>}
            />
            <Route
              path="/profile"
              render={() => <ProfileContainer/>}
            />
            <Route path="/users" render={() => <UsersContainer/>} />


            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
          </div>
        </div>
      </div>

  )
};

export default App;
