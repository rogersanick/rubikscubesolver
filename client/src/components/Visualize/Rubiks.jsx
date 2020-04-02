import React from 'react';
import RubiksCube from './RubiksCube.jsx';
import RubiksControllerMenu from '../RubiksMenu/ControllerMenu.jsx';
import CordaCubeDashboard from '../CordaMenu/CordaCubeMenu.jsx';
import stateToCubesMapping from '../../rubiksHelpers/cube-side-mapping.js';
import {getScore} from '../../rubiksHelpers/minimaxSolver.js';
import rubiks from '../../rubiksHelpers/cube-functions.js';
import setupKeyListeners from '../../utilities/keyListenUtils/keyListeners.js'
import cubeUtilities from '../../utilities/cubeBuilderUtils/cubeBuilderUtilities.js'
import MoveQueue from '../../utilities/moveMakingUtils/MoveQueue.js'
import MoveQueueVisualizer from './MoveQueueVisualizer.jsx';
import createRubiksCubeVisualization from './RubiksVisualization.js';
import SaveSubmitMenu from '../RubiksMenu/SaveSubmitMenu.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);

    // BUILD AN ARRAY OF CUBE POSITIONS
    let cubePositions = cubeUtilities.cleanComponentCubeState()

    // DEFINE STATE FOR COMPONENT
    // BUILD AN ARRAY OF ARRAYS CORRESPONDING TO CUBE POSITIONSs
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      rubiksArray: cubeUtilities.cleanCubeFaceState(),
      cubePositions: cubePositions,

      // SET CAMERA POSITION
      camX: 0,
      camY: 0, 
      camZ: 0,
      camW: 0,
      
      // COLOR SHORT NAME AND HEX CODES FOR EACH COLOR ON A RUBIKS CUBE
      colorCodes: {
        R: 0xFF0000,
        G: 0x008000,
        Y: 0xFFFF00,
        O: 0xFFA500,
        B: 0x0000FF,
        W: 0xffffff,
        P: 0xFFC0CB,
        Pu: 0x9400D3,
        Ru: 0xA55D35,
        inside: 0xFFFFFF
      },
      rerender: false,
      // ANIMATION BOOLEANS - SEE ANIMATION LOOP
      spinLeft: false,
      spinUp: false,
      spinRight: false,
      spinDown: false,
      currMove: '',
      globalBestPath: '',
      solved: false,
      party: false
    };

    // FUNCTION BINDINGS
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.handleToggleParty = this.handleToggleParty.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleResetPosition = this.handleResetPosition.bind(this);
    this.handleRenderCubeColorPositions = this.handleRenderCubeColorPositions.bind(this);
    this.handleRenderMove = this.handleRenderMove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleGetScore = this.handleGetScore.bind(this);
    this.handlePrintState = this.handlePrintState.bind(this);
    this.handleSolver = this.handleSolver.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  componentDidMount() {

    // Create a visualization of the Rubiks cube
    createRubiksCubeVisualization.bind(this)()

    this.moveQueue = new MoveQueue((move) => {
      // this.setState({
      //   movesMade: this.state.movesMade.concat(move)
      // })
    });
    this.moveMaker = setInterval(() => {
      if (this.moveQueue.getLength()) {
        this.handleMove(this.moveQueue.dequeue(), this.state.rubiksArray)
      }
    }, 400)
    this.start()

    // SETUP KEY LISTENERS
    setupKeyListeners.bind(this)(document, (state) => this.setState(state), this.moveQueue)
  }

  // WINDOW RESIZING START
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight, rerender: true }, () => {
      setTimeout((() => {this.setState({rerender: false})}), 800);
      setTimeout((() => {this.setState({rerender: true})}), 800);
    });
  }

  // UPDATES CUBE STATE & RENDERS ANIMATION OF STATE CHANGE
  handleMove(magicString, rubiksArray) {
    return new Promise((resolve, reject) => {
      this.setState({
        currMove: magicString
      }, () => {
        this.makeRotateGroup(magicString).then(() => {
          setTimeout(() => {
            this.makeMove(magicString, rubiksArray).then((newRubiksArray) => this.handleRenderMove(newRubiksArray));
          }, 255);
        });
      });
      resolve();
    });
  }

  handleRenderMove(newRubiksArray) {
    this.setState({ 
      rubiksArray: newRubiksArray
    }, () => {
      this.handleRenderCubeColorPositions();
    });
  }

  // CALLS RUBIK'S HELPER FUNCTIONS TO TRANSFORM CURR RUBIKS ARRAY
  makeMove(magicString, rubiksArray) {
    return new Promise((resolve, reject) => {
      if (magicString === 'F') {
        rubiks.handleRotateEdgesFrontClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceClockwise(0, rubiksArray);
      } else if (magicString === 'Fi') {
        rubiks.handleRotateEdgesFrontCounterClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceCounterClockwise(0, rubiksArray);
      } else if (magicString === 'B') {
        rubiks.handleRotateEdgesBackClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceClockwise(3, rubiksArray);
      } else if (magicString === 'Bi') {
        rubiks.handleRotateEdgesBackCounterClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceCounterClockwise(3, rubiksArray);
      } else if (magicString === 'L') {
        rubiks.handleRotateEdgesLeftClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceClockwise(4, rubiksArray);
      } else if (magicString === 'Li') {
        rubiks.handleRotateEdgesLeftCounterClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceCounterClockwise(4, rubiksArray);
      } else if (magicString === 'R') {
        rubiks.handleRotateEdgesRightClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceClockwise(2, rubiksArray);
      } else if (magicString === 'Ri') {
        rubiks.handleRotateEdgesRightCounterClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceCounterClockwise(2, rubiksArray);
      } else if (magicString === 'U') {
        rubiks.handleRotateEdgesUpClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceClockwise(1, rubiksArray);
      } else if (magicString === 'Ui') {
        rubiks.handleRotateEdgesUpCounterClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceCounterClockwise(1, rubiksArray);
      } else if (magicString === 'D') {
        rubiks.handleRotateEdgesDownClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceClockwise(5, rubiksArray);
      } else if (magicString === 'Di') {
        rubiks.handleRotateEdgesDownCounterClockwise(rubiksArray);
        rubiks.handleRotateCubeFaceCounterClockwise(5, rubiksArray);
      };
      resolve(rubiksArray);
    });
  }

  // UPDATES COLOUR OF COMPONENT CUBES USING CUBE DATA IN STATE
  handleRenderCubeColorPositions() {
    for (let cubeNum = 0; cubeNum < 27; cubeNum++) {
      let aCubeMap = stateToCubesMapping[cubeNum];
      for ( let i = 0, c = 0; i < this.cubeGeometries[cubeNum].faces.length; i += 2, c++ ) {
        let hex;
        if (!!aCubeMap[c]) {
          let colorCode = this.state.rubiksArray[aCubeMap[c][0]][aCubeMap[c][1]];
          hex = this.state.colorCodes[colorCode];
        } else {
          hex = '0x000000';
        }
        this.cubeGeometries[cubeNum].faces[ i ].color.setHex( hex );
        this.cubeGeometries[cubeNum].faces[ i + 1 ].color.setHex( hex );
        this.cubes[cubeNum].geometry.colorsNeedUpdate = true;
      }
    }
    this.renderScene();
  }

  // CREATES GROUP OF CUBES TO ROTATE DURING ANIMATION
  makeRotateGroup(face) {
    this.disolveRotateGroup();
    return new Promise((resolve, reject) => {
      for (let cubeNum = 0; cubeNum < 27; cubeNum++) {
        if (cubeNum < 9 && (face === 'F' || face === 'Fi')) {
          this.groupRotate.add(this.cubes[cubeNum]);
        } else if (cubeNum >= 18 && cubeNum < 27  && (face === 'B' || face === 'Bi')) {
          this.groupRotate.add(this.cubes[cubeNum]);
        }
        if ((cubeNum < 3 || (cubeNum >= 9 && cubeNum < 12) || (cubeNum >= 18 && cubeNum < 21)) && (face === 'D' || face === 'Di')) {
          this.groupRotate.add(this.cubes[cubeNum]);
        } else if (((cubeNum >= 6 && cubeNum < 9) || (cubeNum >= 15 && cubeNum < 18) || (cubeNum >= 24 && cubeNum < 27)) && (face === 'U' || face === 'Ui') ) {
          this.groupRotate.add(this.cubes[cubeNum]);
        }
        if ((cubeNum <= 6 && cubeNum % 3 === 0 || (cubeNum >= 9 && cubeNum < 16 && cubeNum % 3 === 0) || (cubeNum >= 18 && cubeNum <= 24 && cubeNum % 3 === 0)) && (face === 'R' || face === 'Ri')) {
          this.groupRotate.add(this.cubes[cubeNum]);
        } else if (((cubeNum >= 2 && cubeNum < 9 && (cubeNum-2) % 3 === 0) || (cubeNum >= 11 && cubeNum < 18 && (cubeNum-2) % 3 === 0) || (cubeNum >= 20 && cubeNum < 27 && (cubeNum-2) % 3 === 0)) && (face === 'L' || face === 'Li')) {
          this.groupRotate.add(this.cubes[cubeNum]);
        }
      }
      resolve();
    });
  }

  // DISOLVES CUBE GROUP SO OTHER ANIMATIONS / ROTATIONS ARE UNAFFECTED
  disolveRotateGroup() {
    for (let componentCube in this.cubes) {
      this.groupCubes.add(this.cubes[componentCube]);
    } 
    this.groupRotate.rotation.x = 0;
    this.groupRotate.rotation.y = 0;
    this.groupRotate.rotation.z = 0;
    this.currRotate = 0;
  }

  // SOLVER FUNCTIONS START
  componentWillMount() {
    let miniMaxSolverWorker = new Worker('minimaxSolver.bundle.js');
    miniMaxSolverWorker.addEventListener('message', (e) => {
      let checkString = this.state.currBestPath ? this.state.currBestPath.join('') : '';
      if (e.data.solved) {
        console.log('solved');
      }
      this.setState({
        globalBestPath: e.data.globalBestPath,
        currBestPath: e.data.currBestPath,
        solved: e.data.solved,
      }, () => {
        if (this.state.currBestPath.join('') !== checkString) {
          this.moveQueue.enqueue(e.data.currBestPath);
        } else {
          return;
        }
      });
    });
    this.miniMaxSolverWorker = miniMaxSolverWorker;
  }

  // SENDS CURRENT STATE OF CUBE TO SOLVER
  handleSolver() {
    let rubiksWithCheck = this.state.rubiksArray.slice();
    rubiksWithCheck.check = true;
    this.miniMaxSolverWorker.postMessage(rubiksWithCheck);
  }

  //ANIMATION FUNCTIONS START
  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

    // SIMPLE ROTATE FUNCTION
    if (this.state.spinLeft) {
      this.groupCubes.rotation.y -= 0.05;
    }

    if (this.state.spinUp) {
      this.groupCubes.rotation.x -= 0.05;
    }

    if (this.state.spinRight) {
      this.groupCubes.rotation.y += 0.05;
    }

    if (this.state.spinDown) {
      this.groupCubes.rotation.x += 0.05;
    }

    if (this.state.party) {
      this.groupCubes.rotation.x += 0.06;
      this.groupCubes.rotation.y += 0.05;
    }

    if (this.currRotate > Math.PI / 2) {
      this.disolveRotateGroup();
    } else if (['F', 'Bi'].includes(this.state.currMove)) {
      this.groupRotate.rotation.z -= 0.12;
      this.currRotate += 0.12;
    } else if (['Fi', 'B'].includes(this.state.currMove)) {
      this.groupRotate.rotation.z += 0.12;
      this.currRotate += 0.12;
    } else if (['R', 'Li'].includes(this.state.currMove)) {
      this.groupRotate.rotation.x -= 0.12;
      this.currRotate += 0.12;
    } else if (['Ri', 'L'].includes(this.state.currMove)) {
      this.groupRotate.rotation.x += 0.12;
      this.currRotate += 0.12;
    } else if (['Ui', 'D'].includes(this.state.currMove)) {
      this.groupRotate.rotation.y += 0.12;
      this.currRotate += 0.12;
    } else if (['U', 'Di'].includes(this.state.currMove)) {
      this.groupRotate.rotation.y -= 0.12;
      this.currRotate += 0.12;
    }
  }

  // USER FUNCTIONS START

  // TOGGLE ANIMATION BOOLEANS TO MAKE IT PARTY
  handleToggleParty() {
    this.setState({
      party: !this.state.party
    }, () => {
      if (!this.state.party) {
        this.handleReset();
      } else {
        this.makeItParty();
      }
    })
  }

  // RENDERS PARTY EFFECT WHEN PARTY IN STATE IS TRUE
  makeItParty() {
    if (this.state.party === true) {
      let colors = ['O', 'B', 'W', 'R', 'Y', 'G'];
      let newState = [];
      for (let x = 0; x < 6; x ++) {
        let face = [];
        for (let x = 0; x < 9; x ++) {
          face.push(colors[Math.floor(Math.random()*colors.length)]);
        }
        newState.push(face);
      }
      this.setState({
        rubiksArray: newState, 
      }, () => {
        this.handleRenderCubeColorPositions();
        setTimeout(() => {this.makeItParty()}, 50);
      });
    }
  }

  // RESETS STATE AND CAUSES CUBE TO RERENDER
  handleReset() {
    this.setState({
      rubiksArray: [
        Array(9).fill('O'), 
        Array(9).fill('B'), 
        Array(9).fill('W'), 
        Array(9).fill('R'), 
        Array(9).fill('Y'),
        Array(9).fill('G'),
      ]
    }, () => {
      this.handleResetPosition();
      this.handleRenderCubeColorPositions();
    });
  }

  // RESETS POSITION
  handleResetPosition() {
    this.groupCubes.rotation.x = 0.25;
    this.groupCubes.rotation.y = 0.75;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  // UTILITY FUNCTION - PRINTS CUBE STATE TO CONSOLE
  handlePrintState() {
    console.log(JSON.stringify(this.state.rubiksArray));
  }

  // UTILITY FUNCTION - PRINTS SCORE OF CURRENT CUBE TO CONSOLE
  handleGetScore() {
    let score = getScore(this.state.rubiksArray);
    console.log(score)
  }

  render() {
    return (
      <div className = "flex-container">
        <div className = "canvas" ref={(mount) => { this.mount = mount }}>
          <RubiksCube width = {this.state.width * 0.7} height = {this.state.height} rerender = {this.state.rerender}/>
        </div>
        <div className = "side-nav">
          <CordaCubeDashboard handleRenderMove = { this.handleRenderMove }/>
          <SaveSubmitMenu 
            moveQueue = { this.moveQueue } 
            saveMoves = { () => console.log("test") } 
            rerender = { this.forceUpdate.bind(this) }/>
          <RubiksControllerMenu 
            rubiksArray = {this.state.rubiksArray} 
            handleSpinY = {this.handleSpinY} 
            handleSpinX = {this.handleSpinX} 
            handleToggleParty = {this.handleToggleParty}
            makeItParty = {this.makeItParty}
            handleReset = {this.handleReset} 
            handleResetPosition = {this.handleResetPosition}
            handleMove = {this.handleMove} 
            handleGetScore = {this.handleGetScore}
            handlePrintState = {this.handlePrintState}
            handleSolver = {this.handleSolver}
            handleRenderMove = {this.handleRenderMove}
            makeMove = {this.makeMove}/>
        </div>

      </div>
    );
  }
}

export default App;