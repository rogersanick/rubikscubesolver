import React from 'react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

var config = {
  apiKey: "AIzaSyCv5PskVEXnR7FHNj0faz-wIOezT8OvW-I",
  authDomain: "ether-cube.firebaseapp.com",
  databaseURL: "https://ether-cube.firebaseio.com",
  projectId: "ether-cube",
  storageBucket: "ether-cube.appspot.com",
  messagingSenderId: "688509177020"
};

firebase.initializeApp(config);

var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: "popup"
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
      return (
        <div id="auth-container">
          <div>
            <div id="firebaseui-auth-container">Login</div>
          </div>
        </div>
      )
  }
}

export default Login;