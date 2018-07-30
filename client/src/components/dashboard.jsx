import React from 'react';
import Axios from 'axios';
import firebase from '../firebaseConfig.js';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      cubes: []
    }
  }

  componentDidMount() {

    Axios.get('/cubes?userId=1').then((response) => {
      this.setState({
        cubes: response.data
      });
    });

  }

  render() {
    return (
      <div>
        <h1>Ether Cube Dashboard</h1>
        <div>Your Cubes</div>
        <button onClick = {() => {console.log('making a new one')}}>New Cube</button>
        <ul> 
          {this.state.cubes.map((cube) => {
            return(<li key = {cube.id}>{cube.userid}</li>);
          })}
        </ul>
      </div>
    );
  }
}

export default Dashboard;