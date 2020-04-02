import React from 'react';
import MoveQueueVisualizer from '../Visualize/MoveQueueVisualizer.jsx';

function resetMoves(moveQueue, rerender) {
    moveQueue.movesMade = []
    moveQueue.movesQueued = []
    rerender()
}

const SaveSubmitMenu = ({ moveQueue, saveMoves, rerender }) => { 
    return (
        <div className="side-nav-element">
            <MoveQueueVisualizer moveQueue = { moveQueue }/>
            <button className ="draw meet" onClick = { saveMoves }>Save Moves</button>
            <button className ="draw meet" onClick = { () => { resetMoves(moveQueue, rerender) } }>Reset Moves</button>
        </div>
    )
}

export default SaveSubmitMenu