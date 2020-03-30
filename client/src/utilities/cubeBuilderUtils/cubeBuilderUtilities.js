const cleanCubeFaceState = () => {
    return [
        Array(9).fill('O'), 
        Array(9).fill('B'), 
        Array(9).fill('W'),
        Array(9).fill('R'), 
        Array(9).fill('Y'),
        Array(9).fill('G'),
    ]
}

const cleanComponentCubeState = () => {
    // BUILD AN ARRAY OF CUBE POSITIONS
    let cubePositions = [];
    for (let z = 1; z >= -1; z--) {
        for (let y = -1; y <= 1; y ++) {
            for (let x = 1; x >= -1; x --) {
                cubePositions.push([x, y, z]);
            }
        }
    }
    return cubePositions
}

export default { cleanCubeFaceState, cleanComponentCubeState }