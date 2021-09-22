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

	var solvedCube = {
		front: 0xF00000,
		up: 0x0F0000,
		right: 0x00F000,
		back: 0x000F00,
		bottom: 0x0000F0,
		left: 0x00000F,
		moves: 0,
		moves_ptr: 0
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
					   
					display_solution(frontStates[i].moves, backStates[j].moves);
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
		
		if (frontPrevMove & 30720) {
			
			for (let i = 0; i < moves.length(); i++) {
				
				switch () {
					
				}
			}
		}
	}
	
}