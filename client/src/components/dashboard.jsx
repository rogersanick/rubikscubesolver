import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubes: {
        hasCubes: false
      }
    }
  }

  render() {
    return (
      <div>
        <div>These are the cubes you have dude</div>
      </div>
    );
  }
}

export default Dashboard;