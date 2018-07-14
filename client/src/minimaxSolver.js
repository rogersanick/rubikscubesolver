import rubiks from './cube-functions.js';

const moves = ['F', 'Fi', 'B', 'Bi', 'L', 'Li', 'R', 'Ri', 'U', 'Ui', 'D', 'Di'];

let globalBestPath = [];
let solved = false;
const bestScore = {score: 0};
let currBestPath = [];

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
      globalBestPath = globalBestPath.concat(currBestPath);
      cb(rubiksArray, globalBestPath);
      return globalBestPath;
    }

    // Recurse with first move IF NOT DEEPER THAN 4 BRANCHES
    if (depth < 4) {
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
    globalBestPath = globalBestPath.concat(currBestPath);
    cb(rubiksArray, globalBestPath);
    miniMaxSolver(rubiksArray, cb);
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