import rubiks from './cube-functions.js';

const moves = ['F', 'Fi', 'B', 'Bi', 'L', 'Li', 'R', 'Ri', 'U', 'Ui', 'D', 'Di'];

let globalBestPath = [];
let solved = false;
const bestScore = {score: 0};
let currBestPath = [];
let currBestRubiksArray;

export const miniMaxSolver = (rubiksArray, cb, depth = 0, path = []) => {

  if (solved) {
    return globalBestPath;
  }

  for (let moveID = 0; moveID < moves.length; moveID++) {
    
    // Prevent redundant moves
    if (moveID % 2 === 0) {
      if (path[path.length-1] === moves[moveID+1]) {
        continue;
      }
    } else {
      if (path[path.length-1] === moves[moveID-1]) {
        continue;
      }
    }

    if (moves[moveID] === path[path.length-1] && moves[moveID] === path[path.length-2]) {
      continue;
    }

    // Make a move
    makeMove(moves[moveID], rubiksArray);
    path.push(moves[moveID]);
    let newScore1 = getScore(rubiksArray);
    
    if (newScore1 > bestScore.score) {
      bestScore.score = newScore1;
      currBestPath = path.slice();
      let newCurrBestRubiksArray = [];
      for (let face of rubiksArray) {
        newCurrBestRubiksArray.push(face.slice());
      }
      currBestRubiksArray = newCurrBestRubiksArray;
    } 

    if (newScore1 === 100) {
      solved = true;
      globalBestPath = globalBestPath.concat(currBestPath);
      cb(rubiksArray, globalBestPath);
      globalBestPath = [];
      solved = false;
      bestScore.score = 0;
      currBestPath = [];
      return true;
    }

    // Recurse with first move IF NOT DEEPER THAN 4 BRANCHES
    if (depth < 5) {
      let resultPath = miniMaxSolver(rubiksArray, cb, depth+1, path);
      if (resultPath) {
        return resultPath;
      };
    }
    
    // Backtrack
    if (moveID % 2 === 0) {
      makeMove(moves[moveID + 1], rubiksArray);
    } else {
      makeMove(moves[moveID - 1], rubiksArray)
    }

    path.pop();
  }

  if (depth === 0) {
    // recurse with best solution;
    globalBestPath = globalBestPath.concat(currBestPath);
    bestScore.score = 0;
    let copyArray = [];
    for (let face of currBestRubiksArray) {
      copyArray.push(face.slice());
    }
    cb(JSON.stringify(copyArray), globalBestPath.slice()).then((newSolutionState) => {miniMaxSolver(newSolutionState, cb)});
  }
}


export const getScore = (rubiksArray) => {
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

const makeMove = (magicString, rubiksArrayToTransform) => {
  if (magicString === 'F') {
    rubiks.handleRotateEdgesFrontClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceClockwise(0, rubiksArrayToTransform);
  } else if (magicString === 'Fi') {
    rubiks.handleRotateEdgesFrontCounterClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceCounterClockwise(0, rubiksArrayToTransform);
  } else if (magicString === 'B') {
    rubiks.handleRotateEdgesBackClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceClockwise(3, rubiksArrayToTransform);
  } else if (magicString === 'Bi') {
    rubiks.handleRotateEdgesBackCounterClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceCounterClockwise(3, rubiksArrayToTransform);
  } else if (magicString === 'L') {
    rubiks.handleRotateEdgesLeftClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceClockwise(4, rubiksArrayToTransform);
  } else if (magicString === 'Li') {
    rubiks.handleRotateEdgesLeftCounterClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceCounterClockwise(4, rubiksArrayToTransform);
  } else if (magicString === 'R') {
    rubiks.handleRotateEdgesRightClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceClockwise(2, rubiksArrayToTransform);
  } else if (magicString === 'Ri') {
    rubiks.handleRotateEdgesRightCounterClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceCounterClockwise(2, rubiksArrayToTransform);
  } else if (magicString === 'U') {
    rubiks.handleRotateEdgesUpClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceClockwise(1, rubiksArrayToTransform);
  } else if (magicString === 'Ui') {
    rubiks.handleRotateEdgesUpCounterClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceCounterClockwise(1, rubiksArrayToTransform);
  } else if (magicString === 'D') {
    rubiks.handleRotateEdgesDownClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceClockwise(5, rubiksArrayToTransform);
  } else if (magicString === 'Di') {
    rubiks.handleRotateEdgesDownCounterClockwise(rubiksArrayToTransform);
    rubiks.handleRotateCubeFaceCounterClockwise(5, rubiksArrayToTransform);
  };
  return rubiksArrayToTransform;
}