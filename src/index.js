import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./redux/store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./Layout/ScrollToTop/ScrollToTop";
import { loadingEvents } from "./redux/Event/EventAction";

store.dispatch(loadingEvents());

const root = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop/>
        <App />
      </BrowserRouter>
    </Provider>,
    root
  );
};

if (module.hot) {
  module.hot.accept("./App", function () {
    setTimeout(render);
  });
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
