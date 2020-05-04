import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css" 
import MoveVisualAssist from '../RubiksMenu/MoveVisualAssist.jsx';

export default class MoveQueueVisualizer extends React.Component { 
    constructor(props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        const moveQueue = this.props.moveQueueStorage[this.props.selectedCube]
        moveQueue.running ? moveQueue.stop() : moveQueue.start()
    }

    render() {
        const moveQueue = this.props.moveQueueStorage ? this.props.moveQueueStorage[this.props.selectedCube] : null
        if (moveQueue) { moveQueue.visualizer = this }
        return (
        <div className="side-nav-element">
            <div className ="move-queue-visualizer flex-container spread corda-underline">
                <h2 className ="menu-title">Move Queue</h2>
                <Toggle 
                    checked = { moveQueue ? moveQueue.running : false } 
                    onChange= { this.handleToggle }
                />
            </div>
            <div className ="move-queue-visualizer flex-container spread">
                <MoveVisualAssist instructionImageCode={ moveQueue ? moveQueue.currMove() : "NONE" }/>
                <div className="move-queue-visualizer-queue">
                    <div>{ JSON.stringify(moveQueue ? moveQueue.movesQueued : "Initializing...") }</div>
                    <div>{ JSON.stringify(moveQueue ? moveQueue.movesMade : "Initializing...") }</div>
                </div>
            </div>

        </div>
        )
    }

}