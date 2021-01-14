import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {Main} from "./Routing";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
      <Main />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
