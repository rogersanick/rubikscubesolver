import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css" 
import MoveVisualAssist from '../RubiksMenu/MoveVisualAssist.jsx';

export default class MoveQueueVisualizer extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            running: true
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        console.log("test")
        this.state.running ? this.props.moveQueue.stop() : this.props.moveQueue.start()
        this.setState({
            running: !this.state.running
        })
    }

    render() {
        const moveQueue = this.props.moveQueue
        return (
        <div className="side-nav-element">
            <h2 className ="menu-title">Move Queue</h2>
            <div className ="move-queue-visualizer flex-container spread">
                <MoveVisualAssist instructionImageCode={ moveQueue ? moveQueue.currMove() : "NONE" }/>
                <div>
                    <Toggle 
                        checked = { this.state.running } 
                        onChange= { this.handleToggle }
                    />
                </div>
            </div>
            <div className="move-queue-visualizer-queue">
                <div>{ JSON.stringify(moveQueue ? moveQueue.movesQueued : "Initializing...") }</div>
                <div>{ JSON.stringify(moveQueue ? moveQueue.movesMade : "Initializing...") }</div>
            </div>
        </div>
        )
    }

}