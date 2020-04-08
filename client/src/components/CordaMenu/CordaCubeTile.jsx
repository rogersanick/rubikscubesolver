import React from 'react';

const CordaCubeFile = ({issuer, linearId, handleClick, selected, handleDelete }) => { 
    return (
        <div className = {"corda-cube-tile" + (selected ? " selected-cube" : "")} onClick = { handleClick }>
            <div onClick = { () => { handleDelete(linearId) } }>x</div>
            <img className = "fit" src={require(`../../images/Rubiks_Logo_SMOL.png`)}></img>
            <div>Id: {linearId.slice(0, 6)}</div>
            <div>Issued: {issuer.split(",")[0]}</div>
        </div>
    )
}

export default CordaCubeFile