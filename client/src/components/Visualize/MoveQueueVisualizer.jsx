import React from 'react';

const MoveQueueVisualizer = ({ moveQueue }) => { 
    return (
        <div className="side-nav-element move-queue-visualizer">
            <div>{ JSON.stringify(moveQueue ? moveQueue.movesQueued : "Initializing...") }</div>
            <div>{ JSON.stringify(moveQueue ? moveQueue.movesMade : "Initializing...") }</div>
        </div>
    )
}

export default MoveQueueVisualizer