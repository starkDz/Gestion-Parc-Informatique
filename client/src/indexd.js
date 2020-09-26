import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './LogIn'
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from './defaults/default';
axios.defaults.baseURL = url;


    ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
