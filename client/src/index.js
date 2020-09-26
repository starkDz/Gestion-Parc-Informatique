import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './connexion'
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from './defaults/default';
axios.defaults.baseURL = url;


const login = async e => {
    try{
        const cookie=new Cookies();
        const res = await axios.post('/api/auth',
        {'email':cookie.get('email'),
        'password':cookie.get('password')},
        {headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }});
        const token =res.data.token;
        cookie.set('token', token, { path: '/'/*, expires: d*/ });
        ReactDOM.render(<App />, document.getElementById('root'));}
        catch(err){
            ReactDOM.render(<Login />, document.getElementById('root'));
        }
}
const cookie=new Cookies();
if(!cookie.get('email') || !cookie.get('password'))
    ReactDOM.render(<Login />, document.getElementById('root'));
else {
      login();
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
