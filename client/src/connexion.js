import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SignIn from './FormLogin';

import Alert from './layout/alert0';
export default function Login(){

  return(
    <Provider store={store}>
        <Alert/>
        <SignIn/>
    </Provider>
  )
}
