import React from 'react';

const MoveQueueVisualizer = ({ moveQueue }) => { 
    return (
        <div className="move-queue-visualizer">
            <div>{ JSON.stringify(moveQueue ? moveQueue.movesQueued : "Initializing...") }</div>
            <div>{ JSON.stringify(moveQueue ? moveQueue.movesMade : "Initializing...") }</div>
        </div>
    )
}

export default MoveQueueVisualizer