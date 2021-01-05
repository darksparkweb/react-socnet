import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import {Provider} from "react-redux";

  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>,
    document.getElementById("root")
  )


