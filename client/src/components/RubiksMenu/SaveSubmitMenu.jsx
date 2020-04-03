import React from 'react';

import CordaCubeFormContainer from '../CordaMenu/CordaCubeFormContainer.jsx';

function resetMoves(moveQueue, rerenderCube) {
    moveQueue.stop(() => {
        moveQueue.movesMade = []
        moveQueue.movesQueued = []
        rerenderCube()
    })
}

const SaveSubmitMenu = ({ moveQueue, rerenderCube }) => { 
    return (
        <div>
            <CordaCubeFormContainer moveQueue = { moveQueue }/>
            <button className ="draw meet" onClick = { () => { resetMoves(moveQueue, rerenderCube) } }>Reset Moves</button>
        </div>
    )
}

export default SaveSubmitMenu