import React from 'react';
import axios from 'axios';
import CordaCubeTile from './CordaCubeTile.jsx';
import SaveSubmitMenu from '../RubiksMenu/SaveSubmitMenu.jsx';

export default class CordaCubeDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cordaCubes: [],
        }
    }

    componentDidMount() {
        this.retrieveCubes()
    }

    retrieveCubes() {
        axios.get("http://localhost:10050/api/cube").then((result) => {
            result.data.forEach((cube) => {
                cube.state = this.renderCubeState(cube.state)
            })
            this.setState({ 
                cordaCubes: result.data 
            }, () => {
                this.props.handleSelectCube(result.data[0] ? result.data[0] : null)
            })
        }).catch(err => console.log(err))
    }

    handleDelete(cubeId) {
        axios.delete("http://localhost:10050/api/cube" + "/" + cubeId).then((result) => {
            this.retrieveCubes()
        }).catch(err => console.log(err))
    }

    renderCubeState(cubeState) {
        console.log(cubeState)
        const translatedCubeState = []
        for (const face in cubeState) {
            const translatedFaceState = []
            for (const faceTile in cubeState[face]) {
                translatedFaceState.push(cubeState[face][faceTile][0])
            }
            translatedCubeState.push(translatedFaceState)
        }
        console.log(translatedCubeState)
        return translatedCubeState
    }

    render() {
        const shouldRender = this.state.cordaCubes && this.state.cordaCubes.length > 0
        return (
            shouldRender ? 
            <div className = "side-nav-element">
                <div>Distributed Ledger Cubes</div>
                <div className = "cube-tile-container">
                    { this.state.cordaCubes ? this.state.cordaCubes.map((cube) => {
                        return (<CordaCubeTile
                            handleDelete = { (cubeId) => this.handleDelete(cubeId) }
                            selected = { this.props.selectedCube == cube.linearId }
                            handleClick = { () => { 
                                this.props.handleSelectCube(cube)
                                this.props.handleRenderMove(cube.state) 
                            } }
                            key = {cube.linearId}
                            issuer = {cube.issuer}
                            linearId = {cube.linearId}/>)}) : "No cubes to display" }
                </div>
                <SaveSubmitMenu
                    selectedCube = { this.props.selectedCube }
                    moveQueue = { this.props.moveQueue }  
                    rerenderCube = { () => { 
                        const selectedCubeState = this.state.cordaCubes.filter(ele => ele.linearId === this.props.selectedCube)
                        this.props.handleRenderMove(this.renderCubeState(selectedCubeState[0].state))
                        
                    }}/>
            </div> : <h3 className = "side-nav-element">No Corda Node Connected</h3>
        )
    }
}