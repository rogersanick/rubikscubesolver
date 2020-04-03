import React from 'react';
import MoveQueueVisualizer from '../Visualize/MoveQueueVisualizer.jsx';

function resetMoves(moveQueue, rerenderCube) {
    moveQueue.stop()
    moveQueue.movesMade = []
    moveQueue.movesQueued = []
    rerenderCube()
    moveQueue.start()
}

const SaveSubmitMenu = ({ moveQueue, saveMoves, rerenderCube }) => { 
    return (
        <div>
            <button className ="draw meet" onClick = { saveMoves }>Save Moves</button>
            <button className ="draw meet" onClick = { () => { resetMoves(moveQueue, rerenderCube) } }>Reset Moves</button>
        </div>
    )
}

export default SaveSubmitMenu