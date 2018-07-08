import React from 'react';
import * as THREE from 'three';

class RubiksCube extends React.PureComponent {

  constructor(props) {
    super(props);
    
    let cubePositions = [];
    for (let x = -1; x <= 1; x ++) {
      for (let y = 0; y <= 2; y ++) {
        for (let z = -1; z <= 1; z ++) {
          cubePositions.push([x, y, z]);
        }
      }
    }

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
      colors: ['R', 'G', 'Y', 'W', 'B', 'O'],
      colorCodes: {
        R: '0xFF0000',
        G: '0x008000',
        Y: '0xFFFF00',
        O: '0xFFA500',
        B: '0x0000FF',
        W: '0xffffff'
      }
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    console.log('heyhey');

    console.log(this.mount);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      90,
      width / height,
      0.1,
      10000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(0.98, 0.98, 0.98)
    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 })

    const cubes = {};

    for (let cubeNum = 0; cubeNum < 27; cubeNum++) {
      for ( let i = 0, c = 0; i < geometry.faces.length; i += 2, c++) {
        var hex = this.state.colorCodes[this.state.colors[c]];
        geometry.faces[i].color.setHex( hex );
        geometry.faces[ i + 1 ].color.setHex( hex );
      }
      cubes[cubeNum] = new THREE.Mesh(geometry, material)
    }

    camera.position.z = 10
    camera.position.y = 5
    var cameraRotation = new THREE.Quaternion(this.state.camX, this.state.camY, this.state.camZ, this.state.camW);
    camera.setRotationFromQuaternion(cameraRotation);

    for (let cubeNum in cubes) {
      scene.add(cubes[cubeNum]);
      cubes[cubeNum].position.set(...this.state.cubePositions[cubeNum]);
    }

    renderer.setSize(width, height)

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cubes = cubes;

    this.mount.appendChild(this.renderer.domElement)
    this.start()

  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    console.log('hey');
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.forceUpdate();
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
    for (let cubeNum in this.cubes) {
      this.cubes[cubeNum].rotation.y += 0.005;
    }
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{width: this.state.width, height: this.state.height}}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }

}

export default RubiksCube;