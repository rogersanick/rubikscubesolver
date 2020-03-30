import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Async from 'react-code-splitting';

const Rubiks = (props) => <Async load = {import('./components/Visualize/Rubiks.jsx')} componentProps = {props}/>
const Landing = (props) => <Async load = {import('./components/Landing/Landing.jsx')} componentProps = {props}/>
const Login = (props) => <Async load = {import('./components/Login.jsx')} componentProps = {props}/>
const Dashboard = (props) => <Async load = {import('./components/Dashboard.jsx')} componentProps = {props}/>

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
        <Route exact path = "/" render = {props => <Landing {...props} history = {this.props.history}></Landing>}></Route>
        <Route exact path = "/visualize" render = {props => <Rubiks {...props} history = {this.props.history}></Rubiks>}></Route>
        <Route exact path = "/login" render = {props => <Login {...props}></Login>}></Route>
        <Route exact path = "/dashboard" render = {props => <Dashboard {...props} history = {this.props.history}></Dashboard>}></Route>
      </div> 
    );
  }

}

export default withRouter(App);