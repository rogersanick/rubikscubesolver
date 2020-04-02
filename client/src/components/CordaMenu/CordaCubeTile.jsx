import React from 'react';

const CordaCubeFile = ({issuer, linearId, handleClick, selected }) => { 
    return (
        <div className = {"corda-cube-tile" + (selected ? " selected-cube" : "")} onClick = { handleClick }>
            <img className = "fit" src={require(`../../images/Rubiks_Logo_SMOL.png`)}></img>
            <div>Id: {linearId}</div>
            <div>Issued: {issuer.split(",")[0]}</div>
        </div>
    )
}

export default CordaCubeFile