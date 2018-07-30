import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Async from 'react-code-splitting';

const Rubiks = (props) => <Async load = {import('./components/rubiks.jsx')} componentProps = {props}/>
const Landing = (props) => <Async load = {import('./components/landing.jsx')} componentProps = {props}/>
const Login = (props) => <Async load = {import('./components/login.jsx')} componentProps = {props}/>
const Dashboard = (props) => <Async load = {import('./components/dashboard.jsx')} componentProps = {props}/>

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
        <Route exact path = "/" render = {props => <Landing {...props} history = {this.props.history}></Landing>}></Route>
        <Route exact path = "/visualize" render = {props => <Rubiks {...props}></Rubiks>}></Route>
        <Route exact path = "/login" render = {props => <Login {...props}></Login>}></Route>
        <Route exact path = "/dashboard" render = {props => <Dashboard {...props}></Dashboard>}></Route>
      </div> 
    );
  }

}

export default withRouter(App);