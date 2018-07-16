const rubiks = {};

// ROTATE FRONT FACE EDGES
rubiks.handleRotateEdgesFrontClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][0];
  let temp2 = rubiksArray[1][1];
  let temp3 = rubiksArray[1][2];
  rubiksArray[1][0] = rubiksArray[4][6];
  rubiksArray[1][1] = rubiksArray[4][3];
  rubiksArray[1][2] = rubiksArray[4][0];
  rubiksArray[4][6] = rubiksArray[5][8];
  rubiksArray[4][3] = rubiksArray[5][7];
  rubiksArray[4][0] = rubiksArray[5][6];
  rubiksArray[5][8] = rubiksArray[2][2];
  rubiksArray[5][7] = rubiksArray[2][5];
  rubiksArray[5][6] = rubiksArray[2][8];
  rubiksArray[2][2] = temp1; 
  rubiksArray[2][5] = temp2; 
  rubiksArray[2][8] = temp3; 
}

rubiks.handleRotateEdgesFrontCounterClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][0];
  let temp2 = rubiksArray[1][1];
  let temp3 = rubiksArray[1][2];
  rubiksArray[1][0] = rubiksArray[2][2];
  rubiksArray[1][1] = rubiksArray[2][5];
  rubiksArray[1][2] = rubiksArray[2][8];
  rubiksArray[2][2] = rubiksArray[5][8];
  rubiksArray[2][5] = rubiksArray[5][7];
  rubiksArray[2][8] = rubiksArray[5][6];
  rubiksArray[5][8] = rubiksArray[4][6];
  rubiksArray[5][7] = rubiksArray[4][3];
  rubiksArray[5][6] = rubiksArray[4][0];
  rubiksArray[4][6] = temp1;
  rubiksArray[4][3] = temp2;
  rubiksArray[4][0] = temp3;
}

// ROTATE BACK FACE EDGES

rubiks.handleRotateEdgesBackClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][6];
  let temp2 = rubiksArray[1][7];
  let temp3 = rubiksArray[1][8];
  rubiksArray[1][6] = rubiksArray[2][0];
  rubiksArray[1][7] = rubiksArray[2][3];
  rubiksArray[1][8] = rubiksArray[2][6];
  rubiksArray[2][0] = rubiksArray[5][2];
  rubiksArray[2][3] = rubiksArray[5][1];
  rubiksArray[2][6] = rubiksArray[5][0];
  rubiksArray[5][2] = rubiksArray[4][8];
  rubiksArray[5][1] = rubiksArray[4][5];
  rubiksArray[5][0] = rubiksArray[4][2];
  rubiksArray[4][8] = temp1; 
  rubiksArray[4][5] = temp2; 
  rubiksArray[4][2] = temp3; 
}

rubiks.handleRotateEdgesBackCounterClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[2][0];
  let temp2 = rubiksArray[2][3];
  let temp3 = rubiksArray[2][6];
  rubiksArray[2][0] = rubiksArray[1][6];
  rubiksArray[2][3] = rubiksArray[1][7];
  rubiksArray[2][6] = rubiksArray[1][8];
  rubiksArray[1][6] = rubiksArray[4][8];
  rubiksArray[1][7] = rubiksArray[4][5];
  rubiksArray[1][8] = rubiksArray[4][2];
  rubiksArray[4][8] = rubiksArray[5][2];
  rubiksArray[4][5] = rubiksArray[5][1];
  rubiksArray[4][2] = rubiksArray[5][0];
  rubiksArray[5][2] = temp1;
  rubiksArray[5][1] = temp2;
  rubiksArray[5][0] = temp3;
}

// ROTATE LEFT FACE EDGES
rubiks.handleRotateEdgesLeftClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][2];
  let temp2 = rubiksArray[1][5];
  let temp3 = rubiksArray[1][8];
  rubiksArray[1][2] = rubiksArray[3][6];
  rubiksArray[1][5] = rubiksArray[3][3];
  rubiksArray[1][8] = rubiksArray[3][0];
  rubiksArray[3][6] = rubiksArray[5][2];
  rubiksArray[3][3] = rubiksArray[5][5];
  rubiksArray[3][0] = rubiksArray[5][8];
  rubiksArray[5][2] = rubiksArray[0][2];
  rubiksArray[5][5] = rubiksArray[0][5];
  rubiksArray[5][8] = rubiksArray[0][8];
  rubiksArray[0][2] = temp1; 
  rubiksArray[0][5] = temp2; 
  rubiksArray[0][8] = temp3; 
}

rubiks.handleRotateEdgesLeftCounterClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][2];
  let temp2 = rubiksArray[1][5];
  let temp3 = rubiksArray[1][8];
  rubiksArray[1][2] = rubiksArray[0][2];
  rubiksArray[1][5] = rubiksArray[0][5];
  rubiksArray[1][8] = rubiksArray[0][8];
  rubiksArray[0][2] = rubiksArray[5][2];
  rubiksArray[0][5] = rubiksArray[5][5];
  rubiksArray[0][8] = rubiksArray[5][8];
  rubiksArray[5][2] = rubiksArray[3][6];
  rubiksArray[5][5] = rubiksArray[3][3];
  rubiksArray[5][8] = rubiksArray[3][0];
  rubiksArray[3][6] = temp1;
  rubiksArray[3][3] = temp2;
  rubiksArray[3][0] = temp3;
}

// ROTATE RIGHT FACE EDGES
rubiks.handleRotateEdgesRightClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][0];
  let temp2 = rubiksArray[1][3];
  let temp3 = rubiksArray[1][6];
  rubiksArray[1][0] = rubiksArray[0][0];
  rubiksArray[1][3] = rubiksArray[0][3];
  rubiksArray[1][6] = rubiksArray[0][6];
  rubiksArray[0][0] = rubiksArray[5][0];
  rubiksArray[0][3] = rubiksArray[5][3];
  rubiksArray[0][6] = rubiksArray[5][6];
  rubiksArray[5][0] = rubiksArray[3][8];
  rubiksArray[5][3] = rubiksArray[3][5];
  rubiksArray[5][6] = rubiksArray[3][2];
  rubiksArray[3][8] = temp1; 
  rubiksArray[3][5] = temp2; 
  rubiksArray[3][2] = temp3; 
}

rubiks.handleRotateEdgesRightCounterClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[1][6];
  let temp2 = rubiksArray[1][3];
  let temp3 = rubiksArray[1][0];
  rubiksArray[1][6] = rubiksArray[3][2];
  rubiksArray[1][3] = rubiksArray[3][5];
  rubiksArray[1][0] = rubiksArray[3][8];
  rubiksArray[3][2] = rubiksArray[5][6];
  rubiksArray[3][5] = rubiksArray[5][3];
  rubiksArray[3][8] = rubiksArray[5][0];
  rubiksArray[5][6] = rubiksArray[0][6];
  rubiksArray[5][3] = rubiksArray[0][3];
  rubiksArray[5][0] = rubiksArray[0][0];
  rubiksArray[0][6] = temp1;
  rubiksArray[0][3] = temp2;
  rubiksArray[0][0] = temp3;
}

// ROTATE TOP FACE EDGES
rubiks.handleRotateEdgesUpClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[0][8];
  let temp2 = rubiksArray[0][7];
  let temp3 = rubiksArray[0][6];
  rubiksArray[0][8] = rubiksArray[2][8];
  rubiksArray[0][7] = rubiksArray[2][7];
  rubiksArray[0][6] = rubiksArray[2][6];
  rubiksArray[2][8] = rubiksArray[3][8];
  rubiksArray[2][7] = rubiksArray[3][7];
  rubiksArray[2][6] = rubiksArray[3][6];
  rubiksArray[3][8] = rubiksArray[4][8];
  rubiksArray[3][7] = rubiksArray[4][7];
  rubiksArray[3][6] = rubiksArray[4][6];
  rubiksArray[4][8] = temp1; 
  rubiksArray[4][7] = temp2; 
  rubiksArray[4][6] = temp3; 
}

rubiks.handleRotateEdgesUpCounterClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[0][8];
  let temp2 = rubiksArray[0][7];
  let temp3 = rubiksArray[0][6];
  rubiksArray[0][8] = rubiksArray[4][8];
  rubiksArray[0][7] = rubiksArray[4][7];
  rubiksArray[0][6] = rubiksArray[4][6];
  rubiksArray[4][8] = rubiksArray[3][8];
  rubiksArray[4][7] = rubiksArray[3][7];
  rubiksArray[4][6] = rubiksArray[3][6];
  rubiksArray[3][8] = rubiksArray[2][8];
  rubiksArray[3][7] = rubiksArray[2][7];
  rubiksArray[3][6] = rubiksArray[2][6];
  rubiksArray[2][8] = temp1;
  rubiksArray[2][7] = temp2;
  rubiksArray[2][6] = temp3;
}

// ROTATE BOTTOM FACE EDGES

rubiks.handleRotateEdgesDownClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[0][2];
  let temp2 = rubiksArray[0][1];
  let temp3 = rubiksArray[0][0];
  rubiksArray[0][2] = rubiksArray[4][2];
  rubiksArray[0][1] = rubiksArray[4][1];
  rubiksArray[0][0] = rubiksArray[4][0];
  rubiksArray[4][2] = rubiksArray[3][2];
  rubiksArray[4][1] = rubiksArray[3][1];
  rubiksArray[4][0] = rubiksArray[3][0];
  rubiksArray[3][2] = rubiksArray[2][2];
  rubiksArray[3][1] = rubiksArray[2][1];
  rubiksArray[3][0] = rubiksArray[2][0];
  rubiksArray[2][2] = temp1;
  rubiksArray[2][1] = temp2;
  rubiksArray[2][0] = temp3;
}


rubiks.handleRotateEdgesDownCounterClockwise = (rubiksArray) => {
  let temp1 = rubiksArray[0][2];
  let temp2 = rubiksArray[0][1];
  let temp3 = rubiksArray[0][0];
  rubiksArray[0][2] = rubiksArray[2][2];
  rubiksArray[0][1] = rubiksArray[2][1];
  rubiksArray[0][0] = rubiksArray[2][0];
  rubiksArray[2][2] = rubiksArray[3][2];
  rubiksArray[2][1] = rubiksArray[3][1];
  rubiksArray[2][0] = rubiksArray[3][0];
  rubiksArray[3][2] = rubiksArray[4][2];
  rubiksArray[3][1] = rubiksArray[4][1];
  rubiksArray[3][0] = rubiksArray[4][0];
  rubiksArray[4][2] = temp1; 
  rubiksArray[4][1] = temp2; 
  rubiksArray[4][0] = temp3; 
}

// ROTATE ALL OF THE FRONT FACE OF ANY CUBE
rubiks.handleRotateCubeFaceClockwise = (faceNum, rubiksArray) => {
  // ROTATE CROSS
  var tempCross = rubiksArray[faceNum][1];
  rubiksArray[faceNum][1] = rubiksArray[faceNum][3];
  rubiksArray[faceNum][3] = rubiksArray[faceNum][7];
  rubiksArray[faceNum][7] = rubiksArray[faceNum][5];
  rubiksArray[faceNum][5] = tempCross;
  // ROTATE DIAGONALS
  var tempDiagonal = rubiksArray[faceNum][0];
  rubiksArray[faceNum][0] = rubiksArray[faceNum][6];
  rubiksArray[faceNum][6] = rubiksArray[faceNum][8];
  rubiksArray[faceNum][8] = rubiksArray[faceNum][2];
  rubiksArray[faceNum][2] = tempDiagonal;
}

rubiks.handleRotateCubeFaceCounterClockwise = (faceNum, rubiksArray) => {
  // ROTATE CROSS
  var tempCross = rubiksArray[faceNum][3];
  rubiksArray[faceNum][3] = rubiksArray[faceNum][1];
  rubiksArray[faceNum][1] = rubiksArray[faceNum][5];
  rubiksArray[faceNum][5] = rubiksArray[faceNum][7];
  rubiksArray[faceNum][7] = tempCross;
  // ROTATE DIAGONALS
  var tempDiagonal = rubiksArray[faceNum][8];
  rubiksArray[faceNum][8] = rubiksArray[faceNum][6];
  rubiksArray[faceNum][6] = rubiksArray[faceNum][0];
  rubiksArray[faceNum][0] = rubiksArray[faceNum][2];
  rubiksArray[faceNum][2] = tempDiagonal;
}

// exports.rubiks = rubiks;
export default rubiks;