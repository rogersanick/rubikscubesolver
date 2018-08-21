import React from 'react';
import Axios from 'axios';
import firebase from '../firebaseConfig.js';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      addCubeForm: false,
      cubes: [],
      title:'',
      userMessage: '',
      pass: '',
      retypePass: '',
      amount: '' 
    }
  }

  getCubesForUser(user) {
    Axios.get(`/cubes?userId=${user}`).then((response) => {
      this.setState({
        cubes: response.data
      });
    });
  }

  addCube({userId, title, pass, solution = 'Fi', cubeState = 'W', userMessage}) {
    return Axios.post('/cubes', {
      userId,
      title,
      pass,
      solution,
      cubeState,
      userMessage,
    });
  }

  deleteCube(e) {
    return Axios.delete(`/cubes?id=${e.target.id}`).then(() => {
      this.getCubesForUser(this.state.userId);
    });
  }

  handleCubeSubmit(e) {
    e.preventDefault();
    this.addCube(this.state).then(() => {
      this.getCubesForUser(this.state.userId);
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        userId: user.uid
      }, () => {
        this.getCubesForUser(this.state.userId);
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
            return(<li onClick = {(e) => this.deleteCube(e)} id = {cube.id} key = {cube.id}>{cube.id}</li>);
          })}
        </ul>
        <button onClick = {() => {this.setState({addCubeForm: !this.state.addCubeForm})}}>Add Cube</button>
        {this.state.addCubeForm ? 
        <div> 
          <div>Add Cube Form</div>
          <form onSubmit = {(e) => {this.handleCubeSubmit(e)}}>
            <input value = {this.state.title} id = 'title' placeholder = 'Title' onChange = {(e) => this.handleChange(e)}></input>
            <input value = {this.state.userMessage} id = 'userMessage' placeholder = 'User Message' onChange = {(e) => this.handleChange(e)}></input>
            <input value = {this.state.password} id = 'pass' type = 'password' placeholder = 'Password' onChange = {(e) => this.handleChange(e)}></input>
            <input value = {this.state.retypePass} id = 'retypePass' type = 'password' placeholder = 'Retype Password' onChange = {(e) => this.handleChange(e)}></input>
            <input value = {this.state.amount} id = 'amount' placeholder = 'Amount' onChange = {(e) => this.handleChange(e)}></input> 
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