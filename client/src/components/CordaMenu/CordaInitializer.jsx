import React from 'react';
import CordaCubeFormContainer from './CordaCubeFormContainer.jsx'
import { BarLoader } from 'react-spinners'


const CordaInitializer = ({ message, loading, attemptConnect, buttonMessage, enableAdd }) => { 
    return (
        loading ? 
        <div className ="cube-initialize">
            <BarLoader color={"#ec1d24"} size={15}/> : 
        </div> :
        <div className ="cube-initialize">
            <div className="cube-initialize-loader">
                <h4 className="app-copy-block">{message}</h4>
            </div>
            <div className ="button-category">
                <button className="draw meet" onClick = {attemptConnect}>{buttonMessage}</button>
                {enableAdd ? <button className="draw meet" onClick = {attemptConnect}>Issue Cube</button> : null }
            </div>
        </div>
    )
}

export default CordaInitializer