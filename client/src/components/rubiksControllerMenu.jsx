import React from 'react';

class RubiksControllerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionImageCode: null,
      settingsOpen: false,
      magicString:''
    }
  }

  handleOpenSettings() {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    });
  }

  handleImageChange(code) {
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
      let newMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      this.props.makeMove(newMove, rubiksArray).then((newRubiksArray) => {this.props.handleRenderMove(rubiksArray)});
    }
  }

  render() {
    return (
    <div className = "rubiks-controller-menu">
      <div className = "direction-image"> 
        {this.state.instructionImageCode ? <img src={require(`../images/rubiks_directions_${this.state.instructionImageCode}.png`)} alt="Logo" className="header__logo" /> : <div></div>}
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('F')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('F', this.props.rubiksArray)}>Front (F)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Fi')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Fi', this.props.rubiksArray)}>Front Inverse (Fi)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('B')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('B', this.props.rubiksArray)}>Back (B)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Bi')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Bi', this.props.rubiksArray)}>Back Inverse (Bi)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('L')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('L', this.props.rubiksArray)}>Left (L)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Li')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Li', this.props.rubiksArray)}>Left Inverse (Li)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('R')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('R', this.props.rubiksArray)}>Right (R)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Ri')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Ri', this.props.rubiksArray)}>Right Inverse (Ri)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('U')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('U', this.props.rubiksArray)}>Up (U)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Ui')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Ui', this.props.rubiksArray)}>Up Inverse (Ui)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('D')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('D', this.props.rubiksArray)}>Down (D)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Di')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.handleMove('Di', this.props.rubiksArray)}>Down Inverse (Di)</button>
      </div>
      <div className = "button-category"> 
        <img onClick = {() => {this.handleOpenSettings()}} className = "button-settings" src={require(`../images/settings_grey.png`)} alt="settings"/>
      </div>
      {this.state.settingsOpen ? <div> 
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
          <button className = "draw meet" onClick = {() => this.props.handleResetPosition()}>Reset Position</button>
        </div>
        <div className = "button-category"> 
          <button className = "draw meet" onClick = {() => this.props.handleToggleParty()}>Party Cube</button>
        </div>
      </div> : ''}
    </div>
    );
  }
}

export default RubiksControllerMenu;