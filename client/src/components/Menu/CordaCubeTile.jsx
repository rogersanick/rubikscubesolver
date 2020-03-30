import React from 'react';

const CordaCubeFile = ({issuer, linearId, handleRenderCordaCube }) => { 
    return (
        <div className = "corda-cube-tile" onClick = { handleRenderCordaCube }>
            <img className = "fit" src={require(`../../images/Rubiks_Logo_SMOL.png`)}></img>
            <div>Id: {linearId}</div>
            <div>Issued by: {issuer.split(",")[0]}</div>
        </div>
    )
}

export default CordaCubeFile