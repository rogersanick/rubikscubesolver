import React from 'react';
import MoveVisualAssist from './MoveVisualAssist.jsx'

class ControllerMenu extends React.Component {
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

  shuffle() {
    const possibleMoves = ['F', 'B', 'L', 'R', 'D', 'U', 'Fi', 'Bi', 'Li', 'Ri', 'Di', 'Ui'];
    const randomMoves = Array(20).fill(null).map(ele => possibleMoves[Math.floor(Math.random() * possibleMoves.length)])
    this.props.moveQueue.enqueue(randomMoves)
  }

  render() {
    return this.state.settingsOpen ? 
    <div className = "side-nav-element">
      <div className ="flex-container spread corda-underline">
        <h2 className = "menu-title">Setting + Extras</h2>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onClick = {() => this.props.handlePrintState(this.props.rubiksArray)}>Print State</button>
        <button className = "draw meet" onClick = {() => this.props.handleGetScore(this.props.rubiksArray)}>Get Score</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('shuffle')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.shuffle()}>Shuffle</button>
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
      <div className = "button-category"> 
        <img onClick = {() => {this.handleOpenSettings()}} className = "button-settings" src={require(`../../images/settings_grey.png`)} alt="settings"/>
      </div>
    </div> :
    <div className = "side-nav-element">
      <div className ="flex-container spread corda-underline">
        <h2 className = "menu-title">Cube Controller</h2>
      </div>
      <MoveVisualAssist instructionImageCode = { this.state.instructionImageCode }/>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('F')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('F')}>Front (F)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Fi')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('Fi')}>Front Inverse (Fi)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('B')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('B')}>Back (B)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Bi')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('Bi')}>Back Inverse (Bi)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('L')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('L')}>Left (L)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Li')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('Li')}>Left Inverse (Li)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('R')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('R')}>Right (R)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Ri')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('Ri')}>Right Inverse (Ri)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('U')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('U')}>Up (U)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Ui')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('Ui')}>Up Inverse (Ui)</button>
      </div>
      <div className = "button-category">
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('D')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('D')}>Down (D)</button>
        <button className = "draw meet" onMouseEnter = {() => {this.handleImageChange('Di')}} onMouseLeave = {() => {this.handleImageChange()}} onClick = {() => this.props.moveQueue.enqueue('Di')}>Down Inverse (Di)</button>
      </div>
      <div className = "button-category"> 
        <img onClick = {() => {this.handleOpenSettings()}} className = "button-settings" src={require(`../../images/settings_grey.png`)} alt="settings"/>
      </div>
    </div>
  }
}

export default ControllerMenu;