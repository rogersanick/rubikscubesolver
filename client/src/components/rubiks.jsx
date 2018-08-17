import React from 'react';
import RubiksCube from './rubiksCube.jsx';
import RubiksControllerMenu from './rubiksControllerMenu.jsx';
import * as THREE from 'three';
import stateToCubesMapping from '../rubiksHelpers/cube-side-mapping.js';
import {getScore} from '../rubiksHelpers/minimaxSolver.js';
import rubiks from '../rubiksHelpers/cube-functions.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    // BUILD AN ARRAY OF CUBE POSITIONS IN 3D SPACE
    let cubePositions = [];
    for (let z = 1; z >= -1; z--) {
      for (let y = -1; y <= 1; y ++) {
        for (let x = 1; x >= -1; x --) {
          cubePositions.push([x, y, z]);
        }
      }
    }

    // SET UP A KEY LISTENER TO MOVE CUBE
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      let keyNum = parseInt(evt.keyCode);
      if (evt.keyCode == 37) {
        this.setState({
          spinLeft: true
        })
      } else if (evt.keyCode == 38) {
        this.setState({
          spinUp: true
        })
      } else if (evt.keyCode == 39) {
        this.setState({
          spinRight: true
        })
      } else if (evt.keyCode == 40) {
        this.setState({
          spinDown: true
        })
      } else if (evt.keyCode == 85) {
        this.handleReset();
      } else if (evt.keyCode == 16) {
        this.handleResetPosition();
      } else if ([81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86].indexOf(keyNum) !== -1) {
        let moveIndex = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86].indexOf(keyNum);
        let move = ['U', 'Ui', 'D', 'Di', 'L', 'Li', 'R', 'Ri', 'F', 'Fi', 'B', 'Bi'][moveIndex];
        this.handleMove(move, this.state.rubiksArray);
      }
    };

    document.onkeyup = (evt) => {
      evt = evt || window.event;
      if (evt.keyCode == 37) {
        this.setState({
          spinLeft: false
        })
      } else if (evt.keyCode == 38) {
        this.setState({
          spinUp: false
        })
      } else if (evt.keyCode == 39) {
        this.setState({
          spinRight: false
        })
      } else if (evt.keyCode == 40) {
        this.setState({
          spinDown: false
        })
      }
    };

    document.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
    }, false);

    // BUILD AN ARRAY OF ARRAYS CORRESPONDING TO CUBE POSITIONS
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      rubiksArray: [
                    Array(9).fill('O'), 
                    Array(9).fill('B'), 
                    Array(9).fill('W'),
                    Array(9).fill('R'), 
                    Array(9).fill('Y'),
                    Array(9).fill('G'),
                  ],
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
      // IF TRUE, WILL RENDER ANIMATION IN ANIMATION LOOP
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
    this.handleMakeItBlue = this.handleMakeItBlue.bind(this);
    this.handleMakeItPink = this.handleMakeItPink.bind(this);
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

    // ENABLE THE CANVAS TO RERENDER WHEN ADJUSTING SCREEN SIZE
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // CREATE A NEW 3D SCENE
    const scene = new THREE.Scene();

    // CREATE A NEW CAMERA
    const camera = new THREE.PerspectiveCamera(
      90,
      width / height,
      0.1,
      10000
    );

    // ADJUST CAMERA POSITION FOR BETTER VIEWING
    camera.position.z = 10
    camera.position.y = 3
    var cameraRotation = new THREE.Quaternion(this.state.camX, this.state.camY, this.state.camZ, this.state.camW);
    camera.setRotationFromQuaternion(cameraRotation);

    // DEFINE CONSTRUCTOR MATERIAL FOR INDIVIDUAL CUBES
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const material = new THREE.MeshBasicMaterial({ color:0xffffff, vertexColors: THREE.FaceColors})

    // CREATE A GROUP FOR ALL CUBES
    const groupCubes = new THREE.Group();
    const groupRotate = new THREE.Group();

    // ATTACH TO SELF TO MAKE ACCESSIBLE ELSEWHERE IN COMPONENT
    this.groupCubes = groupCubes;
    this.groupRotate = groupRotate;

    const cubes = {};
    const cubeGeometries = {};
    
    this.cubes = cubes;
    this.cubeGeometries = cubeGeometries;

    // CONSTRUCT ALL CUBES, STORE REFERENCES IN MEMORY
    for (let cubeNum = 0; cubeNum < 27; cubeNum++) {
      let aCubeMap = stateToCubesMapping[cubeNum];
      cubeGeometries[cubeNum] = new THREE.BoxGeometry(0.95, 0.95, 0.95);
      for ( let i = 0, c = 0; i < cubeGeometries[cubeNum].faces.length; i += 2, c++ ) {
        let hex;
        if (!!aCubeMap[c]) {
          let colorCode = this.state.rubiksArray[aCubeMap[c][0]][aCubeMap[c][1]];
          hex = this.state.colorCodes[colorCode];
        } else {
          hex = '0x000000';
        }

        cubeGeometries[cubeNum].faces[i].color.setHex( hex );
        cubeGeometries[cubeNum].faces[ i + 1 ].color.setHex( hex );
      }

      cubes[cubeNum] = new THREE.Mesh(cubeGeometries[cubeNum], material);

      this.groupCubes.add(cubes[cubeNum]);

    }

    this.groupCubes.add(groupRotate);

    // SET CUBE POSITIONS ACCORDING TO STATE OF CUBES IN SPACE
    for (let cubeNum in cubes) {
      cubes[cubeNum].position.set(...this.state.cubePositions[cubeNum]);
    }

    scene.add(this.groupCubes);

    this.groupCubes.rotation.x = 0.25;
    this.groupCubes.rotation.y = 0.75;

    renderer.setSize(width, height)

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cubes = cubes;
    this.cubeGeometries = cubeGeometries;
    this.count = 0;
    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  handleMakeItBlue() {
    this.setState({
      rubiksArray: Array(6).fill(Array(9).fill('B')), 
    }, this.handleRenderCubeColorPositions);
  }

  handleMakeItPink() {
    this.setState({
      rubiksArray: Array(6).fill(Array(9).fill('P')), 
    }, this.handleRenderCubeColorPositions);
  }

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

  handleResetPosition() {
    this.groupCubes.rotation.x = 0.25;
    this.groupCubes.rotation.y = 0.75;
  }

  handleMove(magicString, rubiksArray) {
    let newRubiksArray = rubiksArray.slice();
    this.handleRenderMove(this.makeMove(magicString, newRubiksArray));
  }

  makeMove(magicString, rubiksArray) {
    this.makeRotateGroup(magicString);
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
    return rubiksArray;
  }

  makeRotateGroup(face) {

    this.disolveRotateGroup();

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

      if (cubeNum >= 20 && cubeNum <= 26) {
        console.log((cubeNum-2) % 3);
      }

      if ((cubeNum <= 6 && cubeNum % 3 === 0 || (cubeNum >= 9 && cubeNum < 16 && cubeNum % 3 === 0) || (cubeNum >= 18 && cubeNum <= 24 && cubeNum % 3 === 0)) && (face === 'R' || face === 'Ri')) {
        this.groupRotate.add(this.cubes[cubeNum]);
      } else if (((cubeNum >= 2 && cubeNum < 9 && (cubeNum-2) % 3 === 0) || (cubeNum >= 11 && cubeNum < 18 && (cubeNum-2) % 3 === 0) || (cubeNum >= 20 && cubeNum < 27 && (cubeNum-2) % 3 === 0)) && (face === 'L' || face === 'Li')) {
        this.groupRotate.add(this.cubes[cubeNum]);
      }

    }

  }

  disolveRotateGroup() {
    for (let componentCube in this.cubes) {
      this.groupCubes.add(this.cubes[componentCube]);
    } 
  }

  handleRenderMove(newRubiksArray) {
    this.setState({ 
      rubiksArray: newRubiksArray
    }, () => {
      this.handleRenderCubeColorPositions()
    });
  }

  handleRenderMovePromise(newRubiksArray) {
    return new Promise ((resolve, reject) => {
      this.setState({ 
        rubiksArray: newRubiksArray
      }, () => {
        this.handleRenderCubeColorPositions()
        resolve();
      });
    })
  }

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

  componentWillMount() {
    let miniMaxSolverWorker = new Worker('minimaxSolver.bundle.js');

    miniMaxSolverWorker.addEventListener('message', (e) => {
      if (e.data.solved) {
        console.log('solved');
      }
      this.setState({
        globalBestPath: e.data.globalBestPath,
        solved: e.data.solved
      });
      this.handleRenderMove(e.data.copyArray);
    });

    this.miniMaxSolverWorker = miniMaxSolverWorker;

  }

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

    this.groupRotate.rotation.y -= 0.05;

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
    
  }

  handleSolver() {
    let rubiksWithCheck = this.state.rubiksArray.slice();
    rubiksWithCheck.check = true;
    this.miniMaxSolverWorker.postMessage(rubiksWithCheck);
  }

  handlePrintState() {
    console.log(JSON.stringify(this.state.rubiksArray));
  }

  handleGetScore() {
    let score = getScore(this.state.rubiksArray);
    console.log(score)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div className = "flex-container">
        <div className = "canvas" ref={(mount) => { this.mount = mount }}>
          <RubiksCube width = {this.state.width * 0.7} height = {this.state.height} rerender = {this.state.rerender}/>
        </div>
        <RubiksControllerMenu 
          rubiksArray = {this.state.rubiksArray} 
          handleSpinY = {this.handleSpinY} 
          handleSpinX = {this.handleSpinX} 
          handleMakeItPink = {this.handleMakeItPink} 
          handleMakeItBlue = {this.handleMakeItBlue} 
          handleToggleParty = {this.handleToggleParty}
          makeItParty = {this.makeItParty}
          handleReset = {this.handleReset} 
          handleResetPosition = {this.handleResetPosition}
          handleMove = {this.handleMove} 
          handleGetScore = {this.handleGetScore}
          handlePrintState = {this.handlePrintState}
          handleSolver = {this.handleSolver}
          handleRenderMove = {this.handleRenderMove}
          makeMove = {this.makeMove}
        />
      </div>
    );
  }
}

export default App;