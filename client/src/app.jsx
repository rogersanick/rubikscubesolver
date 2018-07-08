import React from 'react';
import RubiksCube from './components/rubiksCube.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return <RubiksCube/>
  }
}

export default App;