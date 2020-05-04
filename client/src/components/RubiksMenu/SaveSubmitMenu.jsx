import React from 'react';

import CordaCubeFormContainer from '../CordaMenu/CordaCubeFormContainer.jsx';

const SaveSubmitMenu = ({ moveQueue, rerenderCube, selectedCube, retrieveCubes }) => { 
    return (
        <div className ="button-category">
            <button className ="draw meet" onClick = { () => { retrieveCubes() } }>Refresh</button>
            <CordaCubeFormContainer
                buttonMessage = "Save"
                formTitle = "Are you sure?"
                resetMoveQueue = { () => moveQueue.reset() }
                selectedCube = { selectedCube } 
                moveQueue = { moveQueue }/>
            <button className ="draw meet" onClick = { () => { moveQueue.reset(rerenderCube) } }>Reset</button>
        </div>
    )
}

export default SaveSubmitMenu