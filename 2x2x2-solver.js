const FRONT = 1;
const UP = 2;
const RIGHT = 3;
const FRONT_PRIME = 4;
const UP_PRIME = 5;
const RIGHT_PRIME = 6;
const FRONT2 = 7;
const UP2 = 8;
const RIGHT2 = 9;


function optimalSolve () {
	
	let shuffledCube = convertCube();

	let solvedCube = {
		front: 0xF00000,
		up: 0x0F0000,
		right: 0x00F000,
		back: 0x000F00,
		bottom: 0x0000F0,
		left: 0x00000F,
		moves: 0,
		movesPtr: 0
	};
	
	console.log('Solving cube...');
	
	let moves = [FRONT2, UP2, RIGHT2, FRONT, UP, RIGHT,
				 FRONT_PRIME, UP_PRIME, RIGHT_PRIME];
				 
	let frontStates = [];
	let backStates = [];
	
	frontStates.push(shuffledCube);
	backStates.push(solvedCube);
	
	while (true) {
		let frontState = frontStates.shift();
		let backState = backStates.shift();
		
		for (let i = 0; i < frontStates.length; i++) {
			for (let j = 0; j < backStates.length; j++) {
				if (frontStates[i].front == backStates[j].front &&
					frontStates[i].right == backStates[j].right &&
					frontStates[i].up == backStates[j].up &&
					frontStates[i].back == backStates[j].back &&
					frontStates[i].bottom == backStates[j].bottom &&
					frontStates[i].left == backStates[j].left) {
					   
					displaySolution(frontStates[i].moves, backStates[j].moves);
					return;
				}
			}
		}
		
		let frontPrevMove = frontState.moves;
		let backPrevMove = backState.moves;
		
		if (frontPrevMove & 0xF != 0) {
			while (frontPrevMove & 0xF0 != 0) {
				frontPrevMove >>= 4;
			}
		}
		
		if (backPrevMove & 0xF != 0) {
			while (backPrevMove & 0xF0 != 0) {
				backPrevMove >>= 4;
			}
		}
		
		for (let i = 0; i < moves.length; i++) {
			let nextFront = turnCube(frontState.front, frontState.up, frontState.right, frontState.back, frontState.bottom,
									 frontState.left, frontState.moves, frontState.movesPtr, frontPrevMove, moves[i]);
			frontStates.push(nextFront);
		}

		for (let i = 0; i < moves.length; i++) {
			let nextBack = turnCube(backState.front, backState.up, backState.right, backState.back, backState.bottom,
									backState.left, backState.moves, backState.movesPtr, backPrevMove, moves[i]);
			backStates.push(nextBack);
		}
	}
}

function turnCube(front, up, right, back, bottom, left, moves, movesPtr, prevMove, currentMove) {
			
	switch (prevMove) {
		
	case FRONT:
	case FRONT_PRIME:
	case FRONT2:
	
		switch (currentMove) {
		case UP: return turnUp(front, up, right, back, bottom, left, moves, movesPtr);
		case UP_PRIME: return turnUpPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case UP2: return turnUp2(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT: return turnRight(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT_PRIME: return turnRightPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT2: return turnRight2(front, up, right, back, bottom, left, moves, movesPtr);
		}
		
	case UP:
	case UP_PRIME:
	case UP2:
	
		switch (currentMove) {
		case FRONT: return turnFront(front, up, right, back, bottom, left, moves, movesPtr);
		case FRONT_PRIME: return turnFrontPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case FRONT2: return turnFront2(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT: return turnRight(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT_PRIME: return turnRightPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT2: return turnRight2(front, up, right, back, bottom, left, moves, movesPtr);
		}
		
	case RIGHT:
	case RIGHT_PRIME:
	case RIGHT2:
	
		switch (currentMove) {
		case FRONT: return turnFront(front, up, right, back, bottom, left, moves, movesPtr);
		case FRONT_PRIME: return turnFrontPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case FRONT2: return turnFront2(front, up, right, back, bottom, left, moves, movesPtr);
		case UP: return turnUp(front, up, right, back, bottom, left, moves, movesPtr);
		case UP_PRIME: return turnUpPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case UP2: return turnUp2(front, up, right, back, bottom, left, moves, movesPtr);
		}
	
	default:
	
		switch (currentMove) {
		case FRONT: return turnFront(front, up, right, back, bottom, left, moves, movesPtr);
		case FRONT_PRIME: return turnFrontPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case FRONT2: return turnFront2(front, up, right, back, bottom, left, moves, movesPtr);
		case UP: return turnUp(front, up, right, back, bottom, left, moves, movesPtr);
		case UP_PRIME: return turnUpPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case UP2: return turnUp2(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT: return turnRight(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT_PRIME: return turnRightPrime(front, up, right, back, bottom, left, moves, movesPtr);
		case RIGHT2: return turnRight2(front, up, right, back, bottom, left, moves, movesPtr);
		default:
			return cube;
		}
	}
}

function displaySolution(frontMoves, backMoves) {

    console.log("Solve: ");
        
    let pointer = 0xF;
	
	let solution = []

    for (let i = 0; i < 7; i++) {
        let shiftAmount = i * 4;
        let move = (frontMoves & pointer << shiftAmount) >> shiftAmount;
        
        switch (move) {
		case FRONT:
			solution.push("F ");
			break;
		case UP:
			solution.push("U ");
			break;
		case RIGHT:
			solution.push("R ");
			break;
		case FRONT_PRIME:
			solution.push("F' ");
			break;
		case UP_PRIME:
			solution.push("U' ");
			break;
		case RIGHT_PRIME:
			solution.push("R' ");
			break;
		case FRONT2:
			solution.push("F2 ");
			break;
		case UP2:
			solution.push("U2 ");
			break;
		case RIGHT2:
			solution.push("R2 ");
			break;
        }
    }

    for (let i = 0; i < 7; i++) {
        let shiftAmount = (6-i) * 4;
        let move = (backMoves & pointer << shiftAmount) >> shiftAmount;
        
        switch (move) {
		case FRONT:
			solution.push("F' ");
			break;
		case UP:
			solution.push("U' ");
			break;
		case RIGHT:
			solution.push("R' ");
			break;
		case FRONT_PRIME:
			solution.push("F ");
			break;
		case UP_PRIME:
			solution.push("U ");
			break;
		case RIGHT_PRIME:
			solution.push("R ");
			break;
		case FRONT2:
			solution.push("F2 ");
			break;
		case UP2:
			solution.push("U2 ");
			break;
		case RIGHT2:
			solution.push("R2 ");
			break;
        }
    }

    document.writeln(solution.join(' '));
}

function execAlgorithm(cube, algorithm) {
	
	symbols = algorithm.split(' ');
	
	symbols.forEach(function(symbol) {
		switch (symbol) {
		case 'F':
			cube = turnFront(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case 'U':
			cube = turnUp(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case 'R':
			cube = turnRight(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case "F'":
			cube = turnFrontPrime(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case "U'":
			cube = turnUpPrime(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case "R'":
			cube = turnRightPrime(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case 'F2':
			cube = turnFront2(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case 'U2':
			cube = turnUp2(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		case 'R2':
			cube = turnRight2(cube.front, cube.up, cube.right, cube.back, cube.bottom, cube.left, cube.moves, cube.movesPtr);
			break;
		}
	});
	
	return cube;
}


function rotateFaceRight(num) {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    return 	(nibble0 >> 1 | nibble0 << 3) & 0xF00000 |
			(nibble1 >> 1 | nibble1 << 3) & 0x0F0000 |
			(nibble2 >> 1 | nibble2 << 3) & 0x00F000 |
			(nibble3 >> 1 | nibble3 << 3) & 0x000F00 |
			(nibble4 >> 1 | nibble4 << 3) & 0x0000F0 |
			(nibble5 >> 1 | nibble5 << 3) & 0x00000F;
}

function rotateFaceLeft(num) {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    return 	(nibble0 << 1 | nibble0 >> 3) & 0xF00000 |
			(nibble1 << 1 | nibble1 >> 3) & 0x0F0000 |
			(nibble2 << 1 | nibble2 >> 3) & 0x00F000 |
			(nibble3 << 1 | nibble3 >> 3) & 0x000F00 |
			(nibble4 << 1 | nibble4 >> 3) & 0x0000F0 |
			(nibble5 << 1 | nibble5 >> 3) & 0x00000F;
}

function rotateFace2(num) {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    return 	(nibble0 << 2 | nibble0 >> 2) & 0xF00000 |
			(nibble1 << 2 | nibble1 >> 2) & 0x0F0000 |
			(nibble2 << 2 | nibble2 >> 2) & 0x00F000 |
			(nibble3 << 2 | nibble3 >> 2) & 0x000F00 |
			(nibble4 << 2 | nibble4 >> 2) & 0x0000F0 |
			(nibble5 << 2 | nibble5 >> 2) & 0x00000F;
}

function turnFront(front, up, right, back, bottom, left, moves, movesPtr) {

    front = rotateFaceRight(front);

    let tempUp = up;

    up = up & 0xCCCCCC | (left & 0x666666) >> 1;
    left = left & 0x999999 | (bottom & 0xCCCCCC) >> 1;
    bottom = bottom & 0x333333 | (right & 0x888888) >> 1 | (right & 0x111111) << 3;
    right = right & 0x666666 | (tempUp & 0x111111) << 3 | (tempUp & 0x222222) >> 1;

    moves |= FRONT << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnUp(front, up, right, back, bottom, left, moves, movesPtr) {

    up = rotateFaceRight(up);

    let tempFront = front;

    front = front & 0x333333 | right & 0xCCCCCC;
    right = right & 0x333333 | back & 0xCCCCCC;
    back = back & 0x333333 | left & 0xCCCCCC;
    left = left & 0x333333 | tempFront & 0xCCCCCC;

    moves |= UP << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnRight(front, up, right, back, bottom, left, moves, movesPtr) {

    right = rotateFaceRight(right);

    let tempFront = front;

    front = front & 0x999999 | bottom & 0x666666;
    bottom = bottom & 0x999999 | (back & 0x888888) >> 2 | (back & 0x111111) << 2;
    back = back & 0x666666 | (up & 0x444444) >> 2 | (up & 0x222222) << 2;
    up = up & 0x999999 | tempFront & 0x666666;

    moves |= RIGHT << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnFrontPrime(front, up, right, back, bottom, left, moves, movesPtr) {

    front = rotateFaceLeft(front);

    let tempUp = up;

    up = up & 0xCCCCCC | (right & 0x888888) >> 3 | (right & 0x111111) << 1;
    right = right & 0x666666 | (bottom & 0x888888) >> 3 | (bottom & 0x444444) << 1;
    bottom = bottom & 0x333333 | (left & 0x666666) << 1;
    left = left & 0x999999 | (tempUp & 0x333333) << 1;

    moves |= FRONT_PRIME << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnUpPrime(front, up, right, back, bottom, left, moves, movesPtr) {

    up = rotateFaceLeft(up);

    let tempFront = front;

    front = front & 0x333333 | left & 0xCCCCCC;
    left = left & 0x333333 | back & 0xCCCCCC;
    back = back & 0x333333 | right & 0xCCCCCC;
    right = right & 0x333333 | tempFront & 0xCCCCCC;

    moves |= UP_PRIME << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnRightPrime(front, up, right, back, bottom, left, moves, movesPtr) {
    
    right = rotateFaceLeft(right);

    let tempFront = front;

    front = front & 0x999999 | up & 0x666666;
    up = up & 0x999999 | (back & 0x888888) >> 2 | (back & 0x111111) << 2;
    back = back & 0x666666 | (bottom & 0x444444) >> 2 | (bottom & 0x222222) << 2;
    bottom = bottom & 0x999999 | tempFront & 0x666666;

    moves |= RIGHT_PRIME << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnFront2(front, up, right, back, bottom, left, moves, movesPtr) {

    front = rotateFace2(front);

    let tempUp = up;
    let tempLeft = left;

    up = up & 0xCCCCCC | (bottom & 0xCCCCCC) >> 2;
    bottom = bottom & 0x333333 | (tempUp & 0x333333) << 2;
    left = left & 0x999999 | (right & 0x888888) >> 2 | (right & 0x111111) << 2;
    right = right & 0x666666 | (tempLeft & 0x444444) >> 2 | (tempLeft & 0x222222) << 2;

    moves |= FRONT2 << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnUp2(front, up, right, back, bottom, left, moves, movesPtr) {

    up = rotateFace2(up);

    let tempFront = front;
    let tempLeft = left;

    back = back & 0x333333 | tempFront & 0xCCCCCC;
    front = front & 0x333333 | back & 0xCCCCCC;
    left = left & 0x333333 | right & 0xCCCCCC;
    right = right & 0x333333 | tempLeft & 0xCCCCCC;

    moves |= UP2 << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}

function turnRight2(front, up, right, back, bottom, left, moves, movesPtr) {

    right = rotateFace2(right);

    let tempFront = front;
    let tempBottom = bottom;

    front = front & 0x999999 | (back & 0x888888) >> 2 | (back & 0x111111) << 2;
    back = back & 0x666666 | (tempFront & 0x444444) >> 2 | (tempFront & 0x222222) << 2;
    bottom = bottom & 0x999999 | up & 0x666666;
    up = up & 0x999999 | tempBottom & 0x666666;

    moves |= RIGHT2 << movesPtr;
    movesPtr += 4;
	
	let cube = {
		front: front,
		up: up,
		right: right,
		back: back,
		bottom: bottom,
		left: left,
		moves: moves,
		movesPtr: movesPtr
	};

    return cube;
}
