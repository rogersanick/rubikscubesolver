import * as THREE from 'three';
import stateToCubesMapping from '../../rubiksHelpers/cube-side-mapping.js';

export default function createRubiksCubeVisualization() {
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
    this.cubes = cubes;

    const cubeGeometries = {};
    this.cubeGeometries = cubeGeometries;

    // CONSTRUCT ALL CUBES USING CUBE COORDINATES IN STATE, STORE REFERENCES IN MEMORY
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

    // ADD THE CUBE GROUP TO THE SCENE
    scene.add(this.groupCubes);

    // SET INITIAL ROTATION FOR AESTHETICS
    this.groupCubes.rotation.x = 0.25;
    this.groupCubes.rotation.y = 0.75;
    renderer.setSize(width, height)

    this.currRotate = 0;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cubes = cubes;
    this.cubeGeometries = cubeGeometries;
    this.count = 0;
    this.mount.appendChild(this.renderer.domElement)
}
    