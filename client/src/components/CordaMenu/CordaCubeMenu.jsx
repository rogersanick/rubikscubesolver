import React from 'react';
import axios from 'axios';
import CordaCubeTile from './CordaCubeTile.jsx';
import SaveSubmitMenu from '../RubiksMenu/SaveSubmitMenu.jsx';
import CordaInitializer from './CordaInitializer.jsx';
import CordaNodeConnectionMessage from './CordaNodeConnectionMessage.jsx'

export default class CordaCubeDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            cordaCubes: [],
            initialAttemptMade: false,
            loading: false,
            connected: false,
            connectionMessageOpen: false
        }
        this.retrieveCubes = this.retrieveCubes.bind(this)
        this.handleCloseConnectionMessage = this.handleCloseConnectionMessage.bind(this)
    }

    componentDidMount() {
        this.retrieveCubes()
    }

    retrieveCubes() {
        this.setState({loading: true}, () => {
            axios.get("http://localhost:10050/api/cube").then((result) => {
                setTimeout(() => {
                    result.data.forEach((cube) => {
                        cube.state = this.renderCubeState(cube.state)
                    })
                    this.setState({ 
                        cordaCubes: result.data,
                        loading: false,
                        connected: true,
                        connectionMessageOpen: true
                    }, () => {
                        this.props.handleSelectCube(result.data[0] ? result.data[0] : null)
                    })
                }, 2000)
            }).catch(err => { 
                setTimeout(() => this.setState({
                    loading: false,
                    connected: false,
                    connectionMessageOpen: true
                }), 2000)
            })
        })
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
        return translatedCubeState
    }

    handleCloseConnectionMessage() {
        this.setState({
            connectionMessageOpen: false
        })
    }

    render() {
        return (
            this.state.connected ? 
                // If successfully connected, return the full menu
                <div className = "side-nav-element">
                    <h2 className ="menu-title">Cube Menu</h2>
                    <div className = "cube-tile-container">
                        { this.state.cordaCubes && !this.state.loading ? this.state.cordaCubes.map((cube) => {
                            return (<CordaCubeTile
                                handleDelete = { (cubeId) => this.handleDelete(cubeId) }
                                selected = { this.props.selectedCube == cube.linearId }
                                handleClick = { () => { 
                                    this.props.handleSelectCube(cube)
                                    this.props.handleRenderMove(cube.state) 
                                } }
                                key = {cube.linearId}
                                issuer = {cube.issuer}
                                linearId = {cube.linearId}/>)}) : null }
                    </div>
                    { !this.state.loading && this.state.cordaCubes.length > 0 ? <SaveSubmitMenu
                        retrieveCubes = { this.retrieveCubes }
                        selectedCube = { this.props.selectedCube }
                        moveQueue = { this.props.moveQueue }  
                        rerenderCube = { () => { 
                            const selectedCubeState = this.state.cordaCubes.filter(ele => ele.linearId === this.props.selectedCube)
                            this.props.handleRenderMove(this.renderCubeState(selectedCubeState[0].state))
                            
                    }}/> : null }
                    { this.state.cordaCubes.length == 0 ? <CordaInitializer 
                            loading = {this.state.loading} 
                            buttonMessage = "Refresh" 
                            message = "No active corda cubes found." 
                            attemptConnect = { this.retrieveCubes }
                            enableAdd = {true}
                        /> : null }
                    <CordaNodeConnectionMessage
                        open = { this.state.connectionMessageOpen }
                        handleClose = { this.handleCloseConnectionMessage }
                        connected = { this.state.connected }
                    />
                </div> : 
                // If not connect, display the error message to the user
                <div className = "side-nav-element">
                    <h2 className ="menu-title">Cube Menu</h2>
                    <CordaInitializer 
                        loading = { this.state.loading } 
                        message = "Unable to connect to Corda node"
                        attemptConnect = { this.retrieveCubes }
                        buttonMessage = "Connect"/>
                    <CordaNodeConnectionMessage
                        open = { this.state.connectionMessageOpen }
                        handleClose = { this.handleCloseConnectionMessage }
                        connected = { this.state.connected }
                    />
                </div>
        )
    }
}