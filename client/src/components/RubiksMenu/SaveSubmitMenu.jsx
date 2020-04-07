import React from 'react';

import CordaCubeFormContainer from '../CordaMenu/CordaCubeFormContainer.jsx';

const SaveSubmitMenu = ({ moveQueue, rerenderCube, selectedCube }) => { 
    return (
        <div>
            <CordaCubeFormContainer 
                resetMoveQueue = { () => moveQueue.reset() }
                selectedCube = { selectedCube } 
                moveQueue = { moveQueue }/>
            <button className ="draw meet" onClick = { () => { moveQueue.reset(rerenderCube) } }>Reset Moves</button>
        </div>
    )
}

export default SaveSubmitMenu