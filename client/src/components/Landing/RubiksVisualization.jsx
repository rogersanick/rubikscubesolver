import React from 'react';
import RubiksCube from '../Visualize/RubiksCube.jsx';
import cubeUtilities from '../../utilities/cubeBuilderUtils/cubeBuilderUtilities.js'
import rubiksCubeVisualizationFactory from '../Visualize/RubiksVisualization.js';

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
      spinRight: true,
      spinDown: false,
      currMove: '',
      globalBestPath: '',
      solved: false,
      party: false,
      selectedCube: "JUST_FOR_FUN"
    };

    // FUNCTION BINDINGS
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    // Create a visualization of the Rubiks cube
    this.rubiksCubeVisualizationFactory = rubiksCubeVisualizationFactory.bind(this)
    this.rubiksCubeVisualizationFactory(true)
    this.start()
  }

  // WINDOW RESIZING START
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // TODO: This is broken. Visualization does not resize accordingly. Will likely have
  // to refact rubiksVisualization factory
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight, rerender: true }, () => {
        this.setState({rerender: false}, () => {
          setTimeout((() => {
            this.setState({rerender: true})
          }), 200)
        })
    });
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

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div className = "flex-container">
        <div className = "canvas" ref={(mount) => { this.mount = mount }}>
          <RubiksCube width = {this.state.width * 0.2} height = {this.state.height * 0.2} rerender = {this.state.rerender}/>
        </div>
      </div>
    );
  }
}

export default App;