import React from 'react';

class RubiksLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div onClick = {() => {this.props.history.push('/visualize')}}>
      Hey
    </div>
    );
  }
}

export default RubiksLanding;