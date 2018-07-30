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

  addCube() {
    Axios.post('/cubes', {
      userId: this.state.userId, 
      pass: 'testpass',
      solution: 'Li L Li L', 
      cubeState: 'Random State', 
      etherContractId: 'W.H.O.K.N.O.W.S',
      title: 'fakeTitle',
      userMessage: 'THIS IS A FAKE MESSAGE'
    }).then((data) => console.log(data));
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
          <div>let's add a cube</div>
          <button onClick = {() => {this.addCube()}}>Submit</button>
        </div> 
        : ''}
      </div>
    );
  }
}

export default Dashboard;