import React from 'react';

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMove(magicString, rubiksArray) {
    let newRubiksArray = [].concat(rubiksArray);
    if (magicString === 'FC') {
      this.handleRotateEdgesFrontClockwise(newRubiksArray);
      this.handleRotateCubeFaceClockwise(0, newRubiksArray);
    } else if (magicString === 'FCC') {
      this.handleRotateEdgesFrontCounterClockwise(newRubiksArray);
      this.handleRotateCubeFaceCounterClockwise(0, newRubiksArray);
    } else if (magicString === 'BC') {
      this.handleRotateEdgesFrontCounterClockwise(newRubiksArray);
      this.handleRotateCubeFaceCounterClockwise(3, newRubiksArray);
    } else if (magicString === 'BCC') {
      this.handleRotateEdgesBackCounterClockwise(newRubiksArray);
      this.handleRotateCubeFaceCounterClockwise(3, newRubiksArray);
    };
    this.props.handleRenderMove(newRubiksArray);
  }

  handleRotateEdgesFrontClockwise (rubiksArray) {
    let temp1 = rubiksArray[1][0];
    let temp2 = rubiksArray[1][1];
    let temp3 = rubiksArray[1][2];
    rubiksArray[1][0] = rubiksArray[4][6];
    rubiksArray[1][1] = rubiksArray[4][3];
    rubiksArray[1][2] = rubiksArray[4][0];
    rubiksArray[4][6] = rubiksArray[5][8];
    rubiksArray[4][3] = rubiksArray[5][7];
    rubiksArray[4][0] = rubiksArray[5][6];
    rubiksArray[5][8] = rubiksArray[2][2];
    rubiksArray[5][7] = rubiksArray[2][5];
    rubiksArray[5][6] = rubiksArray[2][8];
    rubiksArray[2][2] = temp1; 
    rubiksArray[2][5] = temp2; 
    rubiksArray[2][8] = temp3; 
  }

  handleRotateEdgesBackClockwise (rubiksArray) {
    let temp1 = rubiksArray[1][6];
    let temp2 = rubiksArray[1][7];
    let temp3 = rubiksArray[1][8];
    rubiksArray[1][6] = rubiksArray[4][8];
    rubiksArray[1][7] = rubiksArray[4][5];
    rubiksArray[1][8] = rubiksArray[4][2];
    rubiksArray[4][8] = rubiksArray[5][2];
    rubiksArray[4][5] = rubiksArray[5][1];
    rubiksArray[4][2] = rubiksArray[5][0];
    rubiksArray[5][8] = rubiksArray[2][0];
    rubiksArray[5][7] = rubiksArray[2][3];
    rubiksArray[5][6] = rubiksArray[2][6];
    rubiksArray[2][0] = temp1; 
    rubiksArray[2][3] = temp2; 
    rubiksArray[2][6] = temp3; 
  }

  handleRotateEdgesFrontCounterClockwise (rubiksArray) {
    let temp1 = rubiksArray[2][2];
    let temp2 = rubiksArray[2][5];
    let temp3 = rubiksArray[2][8];
    rubiksArray[2][2] = rubiksArray[1][0];
    rubiksArray[2][5] = rubiksArray[1][1];
    rubiksArray[2][8] = rubiksArray[1][2];
    rubiksArray[1][0] = rubiksArray[4][6];
    rubiksArray[1][1] = rubiksArray[4][3];
    rubiksArray[1][2] = rubiksArray[4][0];
    rubiksArray[4][6] = rubiksArray[5][8];
    rubiksArray[4][3] = rubiksArray[5][7];
    rubiksArray[4][0] = rubiksArray[5][6];
    rubiksArray[5][8] = temp1;
    rubiksArray[5][7] = temp2;
    rubiksArray[5][6] = temp3;
  }

  handleRotateEdgesBackCounterClockwise (rubiksArray) {
    let temp1 = rubiksArray[2][0];
    let temp2 = rubiksArray[2][3];
    let temp3 = rubiksArray[2][6];
    rubiksArray[2][0] = rubiksArray[1][6];
    rubiksArray[2][3] = rubiksArray[1][7];
    rubiksArray[2][6] = rubiksArray[1][8];
    rubiksArray[1][6] = rubiksArray[4][8];
    rubiksArray[1][7] = rubiksArray[4][5];
    rubiksArray[1][8] = rubiksArray[4][2];
    rubiksArray[4][8] = rubiksArray[5][2];
    rubiksArray[4][5] = rubiksArray[5][1];
    rubiksArray[4][2] = rubiksArray[5][0];
    rubiksArray[5][2] = temp1;
    rubiksArray[5][1] = temp2;
    rubiksArray[5][0] = temp3;
  }

  handleRotateCubeFaceClockwise (faceNum, rubiksArray) {
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

  handleRotateCubeFaceCounterClockwise (faceNum, rubiksArray) {
    console.log('should do right');
    var newRubiksArray = [].concat(rubiksArray);
    // ROTATE CROSS
    var tempCross = newRubiksArray[faceNum][3];
    newRubiksArray[faceNum][3] = newRubiksArray[faceNum][1];
    newRubiksArray[faceNum][1] = newRubiksArray[faceNum][5];
    newRubiksArray[faceNum][5] = newRubiksArray[faceNum][7];
    newRubiksArray[faceNum][7] = tempCross;
    // ROTATE DIAGONALS
    var tempDiagonal = newRubiksArray[faceNum][8];
    newRubiksArray[faceNum][8] = newRubiksArray[faceNum][6];
    newRubiksArray[faceNum][6] = newRubiksArray[faceNum][0];
    newRubiksArray[faceNum][0] = newRubiksArray[faceNum][2];
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
      <button onClick = {() => this.handleMove('FCC', this.props.rubiksArray)}>Front Counter Clockwise</button>
      <button onClick = {() => this.handleMove('BC', this.props.rubiksArray)}>Back Clockwise</button>
      <button onClick = {() => this.handleMove('BCC', this.props.rubiksArray)}>Back Counter Clockwise</button>
    </div>
    );
  }
}

export default RubiksControllerMenu;