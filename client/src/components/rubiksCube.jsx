import React from 'react';
import * as THREE from 'three';
import stateMapping from '../cube-side-mapping'

class RubiksCube extends React.PureComponent {

  constructor(props) {
    super(props);
    
    // BUILD AN ARRAY OF CUBE POSITIONS IN 3D SPACE
    let cubePositions = [];
    for (let x = 1; x >= -1; x--) {
      for (let y = -1; y <= 1; y ++) {
        for (let z = 1; z >= -1; z --) {
          cubePositions.push([x, y, z]);
        }
      }
    }

    // BUILD AN ARRAY OF ARRAYS CORRESPONDING TO CUBE POSITIONS
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      rubiksArray: [
                    Array(9).fill('R'), 
                    Array(9).fill('G'), 
                    Array(9).fill('Y'), 
                    Array(9).fill('O'), 
                    Array(9).fill('B'),
                    Array(9).fill('W'),
                  ],
      cubePositions: cubePositions,
      camX: 0,
      camY: 0, 
      camZ: 0,
      camW: 0,
      // COLOR SHORT NAME AND HEX CODES FOR EACH COLOR ON A RUBIKS CUBE
      colors: ['R', 'G', 'Y', 'W', 'B', 'O'],
      colorCodes: {
        R: '0xFF0000',
        G: '0x008000',
        Y: '0xFFFF00',
        O: '0xFFA500',
        B: '0x0000FF',
        W: '0xffffff'
      },
      rerender: false
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
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
    const geometry = new THREE.BoxGeometry(0.98, 0.98, 0.98)
    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 })

    const groupCubes = new THREE.Group();
    
    const subVerticalParentGroup = new THREE.Group();
    const subHorizontalParentGroup = new THREE.Group();

    const allSubVerticals = {
      groupVertical1: new THREE.Group(),
      groupVertical2: new THREE.Group(),
      groupVertical3: new THREE.Group(),
    }
    
    const allSubHorizontals = {
      groupHorizontal1: new THREE.Group(),
      groupHorizontal2: new THREE.Group(),
      groupHorizontal3: new THREE.Group(),
    }

    for (let cubeGroup in allSubVerticals) {
      subVerticalParentGroup.add(allSubVerticals[cubeGroup]);
    }

    for (let cubeGroup in allSubHorizontals) {
      subHorizontalParentGroup.add(allSubHorizontals[cubeGroup]);
    }

    groupCubes.add(subHorizontalParentGroup);
    groupCubes.add(subVerticalParentGroup);

    this.groupCubes = groupCubes;
    this.subHorizontalParentGroup = subHorizontalParentGroup;
    this.subVerticalParentGroup = subVerticalParentGroup;
    this.allSubHorizontals = allSubHorizontals;
    this.allSubVerticals = allSubVerticals;

    const cubes = {};

    // CONSTRUCT ALL CUBES, STORE REFERENCES IN MEMORY
    for (let cubeNum = 0; cubeNum < 27; cubeNum++) {
      
      for ( let i = 0; i < geometry.faces.length; i += 2) {
        var hex = this.state.colorCodes[this.state.colors[]];
        geometry.faces[i].color.setHex( hex );
        geometry.faces[ i + 1 ].color.setHex( hex );
      }
      cubes[cubeNum] = new THREE.Mesh(geometry, material);

      if (cubeNum < 9) {
        this.allSubVerticals.groupVertical1.add(cubes[cubeNum]);
      } else if (cubeNum >= 9 && cubeNum < 18) {
        this.allSubVerticals.groupVertical2.add(cubes[cubeNum]);
      } else if (cubeNum >= 18 && cubeNum < 27) {
        this.allSubVerticals.groupVertical3.add(cubes[cubeNum]);
      }
      
      // BUG* CUBES ARE BEING REMOVED FROM VERTICAL GROUPS WHEN INSERTED INTO HORIZONTAL GROUPS
      if (cubeNum < 3 || (cubeNum >= 9 && cubeNum < 12) || (cubeNum >= 18 && cubeNum < 21)) {
        this.allSubHorizontals.groupHorizontal1.add(cubes[cubeNum]);
      } else if ((cubeNum >= 3 && cubeNum < 6) || (cubeNum >= 12 && cubeNum < 15) || (cubeNum >= 21 && cubeNum < 24)) {
        this.allSubHorizontals.groupHorizontal2.add(cubes[cubeNum]);
      } else if ((cubeNum >= 6 && cubeNum < 9) || (cubeNum >= 15 && cubeNum < 18) || (cubeNum >= 24 && cubeNum < 27)) {
        this.allSubHorizontals.groupHorizontal3.add(cubes[cubeNum]);
      }

    }

    // SET CUBE POSITIONS ACCORDING TO STATE OF CUBES IN SPACE
    for (let cubeNum in cubes) {
      cubes[cubeNum].position.set(...this.state.cubePositions[cubeNum]);
    }

    scene.add(this.groupCubes);

    renderer.setSize(width, height)

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cubes = cubes;

    this.mount.appendChild(this.renderer.domElement)
    this.start()
    console.log(this.groupCubes);

  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight, rerender: true }, () => {
      setTimeout((() => {this.setState({rerender: false})}), 1000);
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
    // ROTATE EACH INDIVIDUAL CUBE
    // for (let cubeNum in this.cubes) {
    //   this.cubes[cubeNum].rotation.y += 0.005;
    // }
    // this.groupCubes.rotation.y += 0.01;
    this.groupCubes.rotation.y += 0.01;
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      this.state.rerender ? <div></div> : <div
        style={{width: this.state.width*0.8, height: this.state.height}}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }

}

export default RubiksCube;