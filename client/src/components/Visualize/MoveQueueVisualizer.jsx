import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css" 
import MoveQueue from '../../utilities/moveMakingUtils/MoveQueue';

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
            <div className="side-nav-element move-queue-visualizer flex-container spread">
                <div className="move-queue-visualizer-queue">
                    <div>{ JSON.stringify(moveQueue ? moveQueue.movesQueued : "Initializing...") }</div>
                    <div>{ JSON.stringify(moveQueue ? moveQueue.movesMade : "Initializing...") }</div>
                </div>
                <div>
                    <Toggle 
                        checked = { this.state.running } 
                        onChange= { this.handleToggle }
                    />
                </div>
            </div>
        )
    }

}