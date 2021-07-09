import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import store from "./redux/store";
import "./index.css";
import App from './App'

let options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  type: "error",
  offset: '185px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <App/>
    </AlertProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
