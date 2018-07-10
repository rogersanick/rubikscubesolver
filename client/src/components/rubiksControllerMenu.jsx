import React from 'react';

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMove(magicString, rubiksArray) {
    let newRubiksArray = [].concat(rubiksArray);
    if (magicString = 'FC') {
      this.handleEdgesFrontClockwise(newRubiksArray);
      this.handleCubeFaceClockwise(0, newRubiksArray);
    }
    this.props.handleRenderMove(newRubiksArray);
  }

  handleEdgesFrontClockwise (rubiksArray) {
    let temp1 = rubiksArray[1][0];
    let temp2 = rubiksArray[1][1];
    let temp3 = rubiksArray[1][2];
    rubiksArray[1][0] = rubiksArray[2][2];
    rubiksArray[1][1] = rubiksArray[2][5];
    rubiksArray[1][2] = rubiksArray[2][8];
    rubiksArray[2][2] = rubiksArray[5][8];
    rubiksArray[2][5] = rubiksArray[5][7];
    rubiksArray[2][8] = rubiksArray[5][6];
    rubiksArray[5][8] = rubiksArray[4][6];
    rubiksArray[5][7] = rubiksArray[4][3];
    rubiksArray[5][6] = rubiksArray[4][0];
    rubiksArray[4][6] = temp1;
    rubiksArray[4][3] = temp2;
    rubiksArray[4][0] = temp3;

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
      <button onClick = {() => this.handleMove('FC', this.props.rubiksArray)}>Front Clockwise</button>
    </div>
    );
  }
}

export default RubiksControllerMenu;