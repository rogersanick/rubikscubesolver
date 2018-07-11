import React from 'react';
import rubiks from '../cube-functions.js'

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  shuffle(rubiksArray) {
    let newRubiksArray = rubiksArray.slice();
    const possibleMoves = ['F', 'B', 'L', 'R', 'D', 'U', 'Fi', 'Bi', 'Li', 'Ri', 'Di', 'Ui']
    for (let x = 0; x < 20; x++) {
      let newMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
      console.log(newMove);
      this.props.handleRenderMove(this.makeMove(newMove, newRubiksArray))
    }
  }

  handleMove(magicString, rubiksArray) {
    let newRubiksArray = rubiksArray.slice();
    this.props.handleRenderMove(this.makeMove(magicString, newRubiksArray));
  }

  makeMove(magicString, rubiksArray) {
    if (magicString === 'F') {
      rubiks.handleRotateEdgesFrontClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceClockwise(0, rubiksArray);
    } else if (magicString === 'Fi') {
      rubiks.handleRotateEdgesFrontCounterClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(0, rubiksArray);
    } else if (magicString === 'B') {
      rubiks.handleRotateEdgesBackClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceClockwise(3, rubiksArray);
    } else if (magicString === 'Bi') {
      rubiks.handleRotateEdgesBackCounterClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(3, rubiksArray);
    } else if (magicString === 'L') {
      rubiks.handleRotateEdgesLeftClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceClockwise(4, rubiksArray);
    } else if (magicString === 'Li') {
      rubiks.handleRotateEdgesLeftCounterClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(4, rubiksArray);
    } else if (magicString === 'R') {
      rubiks.handleRotateEdgesRightClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(2, rubiksArray);
    } else if (magicString === 'Ri') {
      rubiks.handleRotateEdgesRightCounterClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(2, rubiksArray);
    } else if (magicString === 'U') {
      rubiks.handleRotateEdgesUpClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(1, rubiksArray);
    } else if (magicString === 'Ui') {
      rubiks.handleRotateEdgesUpCounterClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(1, rubiksArray);
    } else if (magicString === 'D') {
      rubiks.handleRotateEdgesDownClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(5, rubiksArray);
    } else if (magicString === 'Di') {
      rubiks.handleRotateEdgesDownCounterClockwise(rubiksArray);
      rubiks.handleRotateCubeFaceCounterClockwise(5, rubiksArray);
    };
    return rubiksArray;
  }

  render() {
    return (
    <div className = "rubiks-controller-menu">
      <div className = "button-category"> 
        <button className = "draw meet" onClick = {() => this.props.handleReset()}>Reset</button>
        <button className = "draw meet" onClick = {() => this.props.handleMakeItPink()}>Pink</button>
        <button className = "draw meet" onClick = {() => this.props.handleMakeItBlue()}>Blue</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.handleMove('F', this.props.rubiksArray)}>Front</button>
        <button className = "draw meet" onClick = {() => this.handleMove('Fi', this.props.rubiksArray)}>Front Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.handleMove('B', this.props.rubiksArray)}>Back</button>
        <button className = "draw meet" onClick = {() => this.handleMove('Bi', this.props.rubiksArray)}>Back Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.handleMove('L', this.props.rubiksArray)}>Left</button>
        <button className = "draw meet" onClick = {() => this.handleMove('Li', this.props.rubiksArray)}>Left Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.handleMove('R', this.props.rubiksArray)}>Right</button>
        <button className = "draw meet" onClick = {() => this.handleMove('Ri', this.props.rubiksArray)}>Right Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.handleMove('U', this.props.rubiksArray)}>Up</button>
        <button className = "draw meet" onClick = {() => this.handleMove('Ui', this.props.rubiksArray)}>Up Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.handleMove('D', this.props.rubiksArray)}>Down</button>
        <button className = "draw meet" onClick = {() => this.handleMove('Di', this.props.rubiksArray)}>Down Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.shuffle(this.props.rubiksArray)}>Shuffle</button>
      </div>
    </div>
    );
  }
}

export default RubiksControllerMenu;