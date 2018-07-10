import React from 'react';

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEdgesClockwise (faceNum, rubiksArray) {

  }

  handleCubeFaceClockwise (faceNum, rubiksArray) {
    var newRubiksArray = [].concat(rubiksArray);
    // ROTATE CROSS
    var tempCross = newRubiksArray[faceNum][1];
    newRubiksArray[faceNum][1] = newRubiksArray[faceNum][3];
    newRubiksArray[faceNum][3] = newRubiksArray[faceNum][7];
    newRubiksArray[faceNum][7] = newRubiksArray[faceNum][5];
    newRubiksArray[faceNum][5] = tempCross;
    // ROTATE DIAGONALS
    var tempDiagonal = newRubiksArray[faceNum][0];
    newRubiksArray[faceNum][0] = newRubiksArray[faceNum][6];
    newRubiksArray[faceNum][6] = newRubiksArray[faceNum][8];
    newRubiksArray[faceNum][8] = newRubiksArray[faceNum][2];
    newRubiksArray[faceNum][2] = tempDiagonal;
  }

  handleCubeFaceCounterClockwise (faceNum, rubiksArray) {
    var newRubiksArray = [].concat(rubiksArray);
    // ROTATE CROSS
    var tempCross = newRubiksArray[faceNum][5];
    newRubiksArray[faceNum][3] = newRubiksArray[faceNum][1];
    newRubiksArray[faceNum][7] = newRubiksArray[faceNum][3];
    newRubiksArray[faceNum][5] = newRubiksArray[faceNum][7];
    newRubiksArray[faceNum][1] = tempCross;
    // ROTATE DIAGONALS
    var tempDiagonal = newRubiksArray[faceNum][0];
    newRubiksArray[faceNum][6] = newRubiksArray[faceNum][0];
    newRubiksArray[faceNum][8] = newRubiksArray[faceNum][6];
    newRubiksArray[faceNum][2] = newRubiksArray[faceNum][8];
    newRubiksArray[faceNum][2] = tempDiagonal;
  }

  render() {
    return (
    <div className = "rubiks-controller-menu">
      <button onClick = {() => this.props.handleSpin()}>Spin Cube</button>
      <button onClick = {() => this.props.handleReset()}>Reset</button>
      <button onClick = {() => this.props.handleMakeItPink()}>Pink</button>
      <button onClick = {() => this.props.handleMakeItBlue()}>Blue</button>
      <button onClick = {() => this.handleFrontClockwise('FC', this.props.rubiksArray)}>Front Clockwise</button>
    </div>
    );
  }
}

export default RubiksControllerMenu;