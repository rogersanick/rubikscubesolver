import React from 'react';
import * as firebaseui from 'firebaseui';
import firebase from '../firebaseConfig.js';

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