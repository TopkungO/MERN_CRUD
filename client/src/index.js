import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Redux
import { createStore } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/index"


// Route
import { BrowserRouter } from "react-router-dom";

const store =createStore(rootReducer,composeWithDevTools());


ReactDOM.render(
  
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

