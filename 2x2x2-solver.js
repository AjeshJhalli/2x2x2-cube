const FRONT = 1;
const UP = 2;
const RIGHT = 3;
const FRONT_PRIME = 4;
const UP_PRIME = 5;
const RIGHT_PRIME = 6;
const FRONT2 = 7;
const UP2 = 8;
const RIGHT2 = 9;


function main () {

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
	
	let shuffle = "R U F U' F' R'";
	
	let shuffledCube = execAlgorithm(shuffle);
	shuffledCube.moves = 0;
	shuffledCube.moves_ptr = 0;
	
	console.log('Shuffle: ' + shuffle);
	console.log('Solving cube...');
	
	let moves = [FRONT2, UP2, RIGHT2, FRONT, UP, RIGHT,
				 FRONT_PRIME, UP_PRIME, RIGHT_PRIME];
				 
	let frontStates = [];
	let backStates = [];
	
	frontStates.push(shuffledCube);
	backStates.push(solvedCube);
	
	while (true) {
		frontState = frontStates.shift();
		backState = backStates.shift();
		
		for (let i = 0; i < frontStates.length; i++) {
			for (let j = 0; i < backStates.length; j++) {
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
		
		if (frontPrevMove & 30720 == 0) {
			for (let i = 0; i < moves.length(); i++) {
				let nextFront = turnCube(frontState, frontPrevMove, moves[i]);
				frontStates.push(nextFront);
			}
		}
		
		if (backPrevMove & 30720 == 0) {
			for (let i = 0; i < moves.length(); i++) {
				let nextBack = turnCube(backState, backPrevMove, moves[i]);
				backStates.push(nextBack);
			}			
		}
	}
}

function turnCube(cube, prevMove, currentMove) {
			
	switch (prevMove) {
		
	case FRONT:
	case FRONT_PRIME:
	case FRONT2:
	
		switch (currentMove) {
		case UP: return turnUp(cube);
		case UP_PRIME: return turnUpPrime(cube);
		case UP2: return turnUp2(cube);
		case RIGHT: return turnRight(cube);
		case RIGHT_PRIME: return turnRightPrime(cube);
		case RIGHT2: return turnRight2(cube);
		}
		
		continue;
		
	case UP:
	case UP_PRIME:
	case UP2:
	
		switch (currentMove) {
		case FRONT: return turnFront(cube);
		case FRONT_PRIME: return turnFrontPrime(cube);
		case FRONT2: return turnFront2(cube);
		case RIGHT: return turnRight(cube);
		case RIGHT_PRIME: return turnRightPrime(cube);
		case RIGHT2: return turnRight2(cube);
		}
		
		continue;
		
	case RIGHT:
	case RIGHT_PRIME:
	case RIGHT2:
	
		switch (currentMove) {
		case FRONT: return turnFront(cube);
		case FRONT_PRIME: return turnFrontPrime(cube);
		case FRONT2: return turnFront2(cube);
		case UP: return turnUp(cube);
		case UP_PRIME: return turnUpPrime(cube);
		case UP2: return turnUp2(cube);
		}
		
		continue;
	}
}

function displaySolution(frontMoves, backMoves) {

    console.log("Solve: ");
        
    let pointer = 0xF;

    for i in 0..7 {
        let shiftAmount = i * 4;
        let move = (frontMoves & pointer << shiftAmount) >> shiftAmount;
        
        switch (move) {
		case FRONT:
			console.log("F ");
			break;
		case TOP:
			console.log("U ");
			break;
		case RIGHT:
			console.log("R ");
			break;
		case FRONT_PRIME:
			console.log("F' ");
			break;
		case TOP_PRIME:
			console.log("U' ");
			break;
		case RIGHT_PRIME:
			console.log("R' ");
			break;
		case FRONT2:
			console.log("F2 ");
			break;
		case TOP2:
			console.log("U2 ");
			break;
		case RIGHT2:
			console.log("R2 ");
			break;
        }
    }

    for i in 0..7 {
        let shiftAmount = i * 4;
        let move = (backMoves & pointer << shiftAmount) >> shiftAmount;
        
        switch (move) {
		case FRONT:
			console.log("F' ");
			break;
		case TOP:
			console.log("U' ");
			break;
		case RIGHT:
			console.log("R' ");
			break;
		case FRONT_PRIME:
			console.log("F ");
			break;
		case TOP_PRIME:
			console.log("U ");
			break;
		case RIGHT_PRIME:
			console.log("R ");
			break;
		case FRONT2:
			console.log("F2 ");
			break;
		case TOP2:
			console.log("U2 ");
			break;
		case RIGHT2:
			console.log("R2 ");
			break;
        }
    }

    console.log('');
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

function turnFront(cube) {

    cube.front = rotateFaceRight(cube.front);

    let tempUp = cube.up;

    cube.up = cube.up & 0xCCCCCC | (cube.left & 0x666666) >> 1;
    cube.left = cube.left & 0x999999 | (cube.bottom & 0xCCCCCC) >> 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.right & 0x888888) >> 1 | (cube.right & 0x111111) << 3;
    cube.right = cube.right & 0x666666 | (tempUp & 0x111111) << 3 | (tempUp & 0x222222) >> 1;

    cube.moves |= FRONT << cube.movesPtr;
    cube.movesPtr += 4;

    return cube;
}

function turnTop(cube) {

    cube.up = rotateFaceRight(cube.up);

    let tempFront = cube.front;

    cube.front = cube.front & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | tempFront & 0xCCCCCC;

    cube.moves |= UP << cube.movesPtr;
    cube.movesPtr += 4;

    return cube;
}

function turnRight(cube) {

    cube.right = rotateFaceRight(cube.right);

    let tempFront = cube.front;

    cube.front = cube.front & 0x999999 | cube.bottom & 0x666666;
    cube.bottom = cube.bottom & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.up & 0x444444) >> 2 | (cube.up & 0x222222) << 2;
    cube.up = cube.up & 0x999999 | tempFront & 0x666666;

    cube.moves |= RIGHT << cube.movesPtr;
    cube.movesPtr += 4;

    return cube;
}

function turnFrontPrime(cube) {

    cube.front = rotateFaceLeft(cube.front);

    let tempUp = cube.up;

    cube.up = cube.up & 0xCCCCCC | (cube.right & 0x888888) >> 3 | (cube.right & 0x111111) << 1;
    cube.right = cube.right & 0x666666 | (cube.bottom & 0x888888) >> 3 | (cube.bottom & 0x444444) << 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.left & 0x666666) << 1;
    cube.left = cube.left & 0x999999 | (tempUp & 0x333333) << 1;

    cube.moves |= FRONT_PRIME << cube.moves_ptr;
    cube.movesPtr += 4;

    return cube;
}

function turnTopPrime(cube) {

    cube.up = rotateFaceLeft(cube.up);

    let tempFront = cube.front;

    cube.front = cube.front & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | tempFront & 0xCCCCCC;

    cube.moves |= UP_PRIME << cube.moves_ptr;
    cube.movesPtr += 4;

    return cube;
}

function turnFront2(cube) {

    cube.front = rotateFace2(cube.front);

    let tempUp = cube.up;
    let tempLeft = cube.left;

    cube.up = cube.up & 0xCCCCCC | (cube.bottom & 0xCCCCCC) >> 2;
    cube.bottom = cube.bottom & 0x333333 | (tempUp & 0x333333) << 2;
    cube.left = cube.left & 0x999999 | (cube.right & 0x888888) >> 2 | (cube.right & 0x111111) << 2;
    cube.right = cube.right & 0x666666 | (tempLeft & 0x444444) >> 2 | (tempLeft & 0x222222) << 2;

    cube.moves |= FRONT2 << cube.movesPtr;
    cube.movesPtr += 4;

    return cube;
}

function turnTop2(cube) {

    cube.up = rotateFace2(cube.up);

    let tempFront = cube.front;
    let tempLeft = cube.left;

    cube.front = cube.front & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | tempFront & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | tempLeft & 0xCCCCCC;

    cube.moves |= UP2 << cube.movesPtr;
    cube.movesPtr += 4;

    return cube;
}

function turnRight2(cube) {

    cube.right = rotateFace2(cube.right);

    let tempFront = cube.front;
    let tempBottom = cube.bottom;

    cube.front = cube.front & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (tempFront & 0x444444) >> 2 | (tempFront & 0x222222) << 2;
    cube.bottom = cube.bottom & 0x999999 | cube.up & 0x666666;
    cube.up = cube.up & 0x999999 | tempBottom & 0x666666;

    cube.moves |= RIGHT2 << cube.movesPtr;
    cube.movesPtr += 4;

    return cube;
}
