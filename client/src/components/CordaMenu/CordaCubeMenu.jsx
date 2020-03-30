import React from 'react';
import axios from 'axios';
import CordaCubeTile from './CordaCubeTile.jsx';
import CordaCubeFormContainer from './CordaCubeFormContainer.jsx';

export default class CordaCubeMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cordaCubes: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:10050/api/cubes").then((result) => {
            console.log(result.data)
            result.data.forEach((cube) => {
                cube.state = this.renderCubeState(cube.state)
            })
            this.setState({ cordaCubes: result.data })
        }).catch(err => console.log(err))
    }

    renderCubeState(cubeState) {
        const translatedCubeState = []
        for (const face in cubeState) {
            const translatedFaceState = []
            for (const faceTile in cubeState[face]) {
                translatedFaceState.push(cubeState[face][faceTile][0])
            }
            translatedCubeState.push(translatedFaceState)
        }
        return translatedCubeState
    }

    render() {
        return (
            <div className = "corda-side-nav-element">
                <div>Distributed Ledger Cubes</div>
                <div className = "cube-tile-container">
                { this.state.cordaCubes ? this.state.cordaCubes.map((cube) => {
                    return (<CordaCubeTile
                        handleRenderCordaCube = { () => { 
                            this.props.handleRenderCordaCube(this.renderCubeState(cube.state)) 
                        } }
                        key = {cube.linearId}
                        issuer = {cube.issuer}
                        linearId = {cube.linearId.slice(0, 6)}
                    />)
                }) : "No cubes to display" }
                </div>
                <CordaCubeFormContainer/>

            </div>
        )
    }
}