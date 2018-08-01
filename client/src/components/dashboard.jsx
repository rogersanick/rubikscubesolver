import React from 'react';
import Axios from 'axios';
import firebase from '../firebaseConfig.js';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      addCubeForm: false,
      cubes: []
    }
  }

  addCube({pass, solution, cubeState, etherContractId, title, userMessage}) {
    Axios.post('/cubes', {
      userId: this.state.userId, 
      pass,
      solution, 
      cubeState, 
      etherContractId,
      title,
      userMessage
    }).then((data) => console.log(data));
  }

  handleCubeSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        userId: user.uid
      });
      Axios.get(`/cubes?userId=${user.uid}`).then((response) => {
        this.setState({
          cubes: response.data
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ether Cube Dashboard</h1>
        <div>Your Cubes</div>
        <ul> 
          {this.state.cubes.map((cube) => {
            return(<li key = {cube.id}>{cube.id}</li>);
          })}
        </ul>
        <button onClick = {() => {this.setState({addCubeForm: !this.state.addCubeForm})}}>Add Cube</button>
        {this.state.addCubeForm ? 
        <div> 
          <div>Add Cube Form</div>
          <form onSubmit = {(e) => {this.handleCubeSubmit(e)}}>
            <input placeholder = 'Title'></input>
            <input placeholder = 'User Message'></input>
            <input type = 'password' placeholder = 'Password'></input>
            <input type = 'password' placeholder = 'Retype Password'></input>
            <input placeholder = 'Amount'></input> 
            <button>Add Cube</button>
          </form>
          <button onClick = {() => {this.addCube()}}>Buy Eth</button>
          <button onClick = {() => {this.addCube()}}>Load Eth</button>
        </div> 
        : ''}
      </div>
    );
  }
}

export default Dashboard;