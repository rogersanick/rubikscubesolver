import rubiks from './cube-functions.js';
// const {rubiks} = require('./cube-functions.js');

const testData = [["W","O","W","B","O","G","Y","O","Y"],["R","W","O","R","B","O","R","Y","O"],["G","G","G","W","W","W","B","B","B"],["Y","R","Y","B","R","G","W","R","W"],["G","G","G","Y","Y","Y","B","B","B"],["O","W","R","O","G","R","O","Y","R"]];

const moves = ['F', 'Fi', 'B', 'Bi', 'L', 'Li', 'R', 'Ri', 'U', 'Ui', 'D', 'Di'];

let globalBestPath = [];
let solved = false;
const bestScore = {score: 0};
let currBestPath = [];

// CURR BUG ==> making infinite front moves as that gives the best score everytime
// Transformation ==> Fi, Bi, Li, Ri yields Fi, Fi, L, R, F, B (LRFB is correct solution);
// Only recursing with best path and new cube --> results will be invalid
const miniMax = (rubiksArray, depth = 0, path = []) => {

  if (solved) {
    return globalBestPath;
  }

  for (let moveID = 0; moveID < moves.length; moveID++) {
    // Make a move
    makeMove(moves[moveID], rubiksArray);
    path.push(moves[moveID]);
    let newScore1 = getScore(rubiksArray);
    
    if (newScore1 > bestScore.score) {
      bestScore.score = newScore1;
      currBestPath = path.slice();
    } 

    if (newScore1 === 100) {
      solved = true;
      return currBestPath;
    }

    // Recurse with first move IF NOT DEEPER THAN 4 BRANCHES
    if (depth < 5) {
      let resultPath = miniMax(rubiksArray, depth+1, path);
      if (resultPath) {
        return resultPath;
      };
    }
    
    // Backtrack
    if (moveID % 2 === 0) {
      makeMove(moves[moveID] + 1, rubiksArray);
    } else {
      makeMove(moves[moveID] - 1, rubiksArray)
    }
    
    path.pop();
  }

  if (depth === 0) {
    console.log(globalBestPath);
    // recurse with best solution;
    globalBestPath = globalBestPath.concat(currBestPath);
    bestScore.score = 0;
    miniMax(rubiksArray);
  }
}

const getScore = (rubiksArray) => {
  let correctScore = 0;
  let maxScore = 54;
  let solution = [
    Array(9).fill('O'), 
    Array(9).fill('B'), 
    Array(9).fill('W'),
    Array(9).fill('R'), 
    Array(9).fill('Y'),
    Array(9).fill('G'),
  ];
  for (let face = 0; face < 6; face++) {
    for (let piece = 0; piece < 9; piece++) {
      if (solution[face][piece] === rubiksArray[face][piece]) {
        correctScore += 1;
      }
    }
  }
  return correctScore/maxScore*100;
}

const makeMove = (magicString, rubiksArray) => {
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

export default {miniMax, getScore};
// console.log(miniMax(testData));