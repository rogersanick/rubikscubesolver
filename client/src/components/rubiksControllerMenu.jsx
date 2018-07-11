import React from 'react';
import rubiks from '../cube-functions.js'

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMove(magicString, rubiksArray) {
    let newRubiksArray = rubiksArray.slice();
    if (magicString === 'F') {
      rubiks.handleRotateEdgesFrontClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceClockwise(0, newRubiksArray);
    } else if (magicString === 'Fi') {
      rubiks.handleRotateEdgesFrontCounterClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(0, newRubiksArray);
    } else if (magicString === 'B') {
      rubiks.handleRotateEdgesBackClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceClockwise(3, newRubiksArray);
    } else if (magicString === 'Bi') {
      rubiks.handleRotateEdgesBackCounterClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(3, newRubiksArray);
    } else if (magicString === 'L') {
      rubiks.handleRotateEdgesLeftClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceClockwise(4, newRubiksArray);
    } else if (magicString === 'Li') {
      rubiks.handleRotateEdgesLeftCounterClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(4, newRubiksArray);
    } else if (magicString === 'R') {
      rubiks.handleRotateEdgesRightClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(2, newRubiksArray);
    } else if (magicString === 'Ri') {
      rubiks.handleRotateEdgesRightCounterClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(2, newRubiksArray);
    } else if (magicString === 'U') {
      rubiks.handleRotateEdgesUpClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(1, newRubiksArray);
    } else if (magicString === 'Ui') {
      rubiks.handleRotateEdgesUpCounterClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(1, newRubiksArray);
    } else if (magicString === 'D') {
      rubiks.handleRotateEdgesDownClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(5, newRubiksArray);
    } else if (magicString === 'Di') {
      rubiks.handleRotateEdgesDownCounterClockwise(newRubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(5, newRubiksArray);
    };
    this.props.handleRenderMove(newRubiksArray);
  }

  render() {
    return (
    <div className = "rubiks-controller-menu">
      <button onClick = {() => this.props.handleReset()}>Reset</button>
      <button onClick = {() => this.props.handleMakeItPink()}>Pink</button>
      <button onClick = {() => this.props.handleMakeItBlue()}>Blue</button>
      <button onClick = {() => this.handleMove('F', this.props.rubiksArray)}>Front</button>
      <button onClick = {() => this.handleMove('Fi', this.props.rubiksArray)}>Front Inverse</button>
      <button onClick = {() => this.handleMove('B', this.props.rubiksArray)}>Back</button>
      <button onClick = {() => this.handleMove('Bi', this.props.rubiksArray)}>Back Inverse</button>
      <button onClick = {() => this.handleMove('L', this.props.rubiksArray)}>Left</button>
      <button onClick = {() => this.handleMove('Li', this.props.rubiksArray)}>Left Inverse</button>
      <button onClick = {() => this.handleMove('R', this.props.rubiksArray)}>Right</button>
      <button onClick = {() => this.handleMove('Ri', this.props.rubiksArray)}>Right Inverse</button>
      <button onClick = {() => this.handleMove('U', this.props.rubiksArray)}>Up</button>
      <button onClick = {() => this.handleMove('Ui', this.props.rubiksArray)}>Up Inverse</button>
      <button onClick = {() => this.handleMove('D', this.props.rubiksArray)}>Down</button>
      <button onClick = {() => this.handleMove('Di', this.props.rubiksArray)}>Down Inverse</button>
    </div>
    );
  }
}

export default RubiksControllerMenu;