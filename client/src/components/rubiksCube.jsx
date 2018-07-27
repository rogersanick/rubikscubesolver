import React from 'react'
class RubiksCube extends React.PureComponent {

  constructor(props) {
    super(props); 
  }

  render() {
    console.log(this.props.width);
    return (
      this.props.rerender ? <div></div> :
        <div
        style={{width: this.props.width, height: this.props.height}}
        ref={(mount) => { this.mount = mount }}/>
    );
  }

}

export default RubiksCube;