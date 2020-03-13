import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div id = "auth-container" className = "auth-container">
          <h1 className = 'heading-primary--main'>Sign-in</h1>
          <h3 className = 'heading-primary--sub center'>Login to manage your cubes</h3>
          <div> 
            <button className="btn btn--grey btn--animated">Login</button>
          </div>
          <h3 className = 'heading-primary--sub center'>Sign up to get started.</h3>
          <div> 
            <button className="btn btn--grey btn--animated">Sign up</button>
          </div>
        </div>
      )
  }
}

export default Login;