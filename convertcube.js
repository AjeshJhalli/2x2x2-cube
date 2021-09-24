function convertCube() {
	
	cube = {
		front: 0,
		up: 0,
		right: 0,
		back: 0,
		bottom: 0,
		left: 0,
		moves: 0,
		movesPtr: 0
	};

	// Front
	facelet = document.getElementById('f1').style.backgroundColor;
	cube.front = addFacelet(cube.front, facelet, 0x8);
	facelet = document.getElementById('f2').style.backgroundColor;
	cube.front = addFacelet(cube.front, facelet, 0x4);
	facelet = document.getElementById('f3').style.backgroundColor;
	cube.front = addFacelet(cube.front, facelet, 0x2);
	facelet = document.getElementById('f4').style.backgroundColor;
	cube.front = addFacelet(cube.front, facelet, 0x1);
	
	// Up
	facelet = document.getElementById('f5').style.backgroundColor;
	cube.up = addFacelet(cube.up, facelet, 0x8);
	facelet = document.getElementById('f6').style.backgroundColor;
	cube.up = addFacelet(cube.up, facelet, 0x4);
	facelet = document.getElementById('f7').style.backgroundColor;
	cube.up = addFacelet(cube.up, facelet, 0x2);
	facelet = document.getElementById('f8').style.backgroundColor;
	cube.up = addFacelet(cube.up, facelet, 0x1);
	
	// Right
	facelet = document.getElementById('f9').style.backgroundColor;
	cube.right = addFacelet(cube.right, facelet, 0x8);
	facelet = document.getElementById('f10').style.backgroundColor;
	cube.right = addFacelet(cube.right, facelet, 0x4);
	facelet = document.getElementById('f11').style.backgroundColor;
	cube.right = addFacelet(cube.right, facelet, 0x2);
	facelet = document.getElementById('f12').style.backgroundColor;
	cube.right = addFacelet(cube.right, facelet, 0x1);
	
	// Back
	facelet = document.getElementById('f13').style.backgroundColor;
	cube.back = addFacelet(cube.back, facelet, 0x8);
	facelet = document.getElementById('f14').style.backgroundColor;
	cube.back = addFacelet(cube.back, facelet, 0x4);
	facelet = document.getElementById('f15').style.backgroundColor;
	cube.back = addFacelet(cube.back, facelet, 0x2);
	facelet = document.getElementById('f16').style.backgroundColor;
	cube.back = addFacelet(cube.back, facelet, 0x1);
	
	// Bottom
	facelet = document.getElementById('f17').style.backgroundColor;
	cube.bottom = addFacelet(cube.bottom, facelet, 0x8);
	facelet = document.getElementById('f18').style.backgroundColor;
	cube.bottom = addFacelet(cube.bottom, facelet, 0x4);
	facelet = document.getElementById('f19').style.backgroundColor;
	cube.bottom = addFacelet(cube.bottom, facelet, 0x2);
	facelet = document.getElementById('f20').style.backgroundColor;
	cube.bottom = addFacelet(cube.bottom, facelet, 0x1);
	
	// Left
	facelet = document.getElementById('f21').style.backgroundColor;
	cube.left = addFacelet(cube.left, facelet, 0x8);
	facelet = document.getElementById('f22').style.backgroundColor;
	cube.left = addFacelet(cube.left, facelet, 0x4);
	facelet = document.getElementById('f23').style.backgroundColor;
	cube.left = addFacelet(cube.left, facelet, 0x2);
	facelet = document.getElementById('f24').style.backgroundColor;
	cube.left = addFacelet(cube.left, facelet, 0x1);
	
	return cube;
}

function addFacelet(face, facelet, mask) {
	
	switch (facelet) {
	case 'blue':
		face |= mask << 20;
		break;
	case 'yellow':
		face |= mask << 16;
		break;
	case 'red':
		face |= mask << 12;
		break;
	case '#00FF7F':
		face |= mask << 8;
		break;
	case 'white':
		face |= mask << 4;
		break;
	case 'orange':
		face |= mask;
		break;
	}
	
	return face
}