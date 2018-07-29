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
  signInSuccessUrl: '/dashboard',
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
        <div id = "auth-container" className = "auth-container">
          <h1 className = 'heading-primary--main'>Sign-in</h1>
          <h3 className = 'heading-primary--sub center'>Login to manage your cubes</h3>
          <div>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      )
  }
}

export default Login;