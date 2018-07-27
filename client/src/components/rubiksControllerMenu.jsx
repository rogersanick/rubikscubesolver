import React from 'react';

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionImageCode: null
    }
  }

  handleImageChange(code) {
    console.log(code);
    if (!code) {
      this.setState({
        instructionImageCode: null
      })
    } else {
      this.setState({
        instructionImageCode: code
      });
    }
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
      <div className = "direction-image"> 
        {this.state.instructionImageCode ? <img src={require(`../images/rubiks_directions_${this.state.instructionImageCode}.png`)} alt="Logo" className="header__logo" /> : <div></div>}
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('F')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('F', this.props.rubiksArray)}>Front</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Fi')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Fi', this.props.rubiksArray)}>Front Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('B')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('B', this.props.rubiksArray)}>Back</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Bi')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Bi', this.props.rubiksArray)}>Back Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('L')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('L', this.props.rubiksArray)}>Left</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Li')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Li', this.props.rubiksArray)}>Left Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('R')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('R', this.props.rubiksArray)}>Right</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Ri')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Ri', this.props.rubiksArray)}>Right Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('U')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('U', this.props.rubiksArray)}>Up</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Ui')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Ui', this.props.rubiksArray)}>Up Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('D')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('D', this.props.rubiksArray)}>Down</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Di')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Di', this.props.rubiksArray)}>Down Inverse</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handlePrintState(this.props.rubiksArray)}>Print State</button>
        <button className = "draw meet" onClick = {() => this.props.handleGetScore(this.props.rubiksArray)}>Get Score</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('shuffle')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.shuffle(this.props.rubiksArray)}>Shuffle</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handleSolver()}>Solve</button>
      </div>
      <div className = "button-category"> 
        <button className = "draw meet" onClick = {() => this.props.handleReset()}>Reset</button>
        <button className = "draw meet" onClick = {() => this.props.handleMakeItPink()}>Pink</button>
        <button className = "draw meet" onClick = {() => this.props.handleMakeItBlue()}>Blue</button>
      </div>
      <div className = "button-category"> 
        <img className = "button-settings" src={require(`../images/settings_grey.png`)} alt="settings"/>
      </div>
    </div>
    );
  }
}

export default RubiksControllerMenu;