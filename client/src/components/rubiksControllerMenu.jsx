import React from 'react';

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  shuffle(rubiksArray) {
    let newRubiksArray = rubiksArray.slice();
    const possibleMoves = ['F', 'B', 'L', 'R', 'D', 'U', 'Fi', 'Bi', 'Li', 'Ri', 'Di', 'Ui'];
    for (let x = 0; x < 20; x++) {
      let newMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
      this.props.handleRenderMove(this.props.makeMove(newMove, newRubiksArray))
    }
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
        <button className = "draw meet" onClick = {() => this.props.handleMove('F', this.props.rubiksArray)}>Front</button>
        <button className = "draw meet" onClick = {() => this.props.handleMove('Fi', this.props.rubiksArray)}>Front Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleMove('B', this.props.rubiksArray)}>Back</button>
        <button className = "draw meet" onClick = {() => this.props.handleMove('Bi', this.props.rubiksArray)}>Back Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleMove('L', this.props.rubiksArray)}>Left</button>
        <button className = "draw meet" onClick = {() => this.props.handleMove('Li', this.props.rubiksArray)}>Left Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleMove('R', this.props.rubiksArray)}>Right</button>
        <button className = "draw meet" onClick = {() => this.props.handleMove('Ri', this.props.rubiksArray)}>Right Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleMove('U', this.props.rubiksArray)}>Up</button>
        <button className = "draw meet" onClick = {() => this.props.handleMove('Ui', this.props.rubiksArray)}>Up Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleMove('D', this.props.rubiksArray)}>Down</button>
        <button className = "draw meet" onClick = {() => this.props.handleMove('Di', this.props.rubiksArray)}>Down Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.shuffle(this.props.rubiksArray)}>Shuffle</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleGetScore(this.props.rubiksArray)}>Get Score</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handlePrintState(this.props.rubiksArray)}>Print State</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleSolver()}>Handle Solver</button>
      </div>
    </div>
    );
  }
}

export default RubiksControllerMenu;