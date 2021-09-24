const BLUE = 1;
const YELLOW = 2;
const RED = 3;
const GREEN = 4;
const WHITE = 5;
const ORANGE = 6;


var selectedColour;


document.getElementById('bluebutton').onclick = function () {
	selectedColour = BLUE;
}

document.getElementById('yellowbutton').onclick = function () {
	selectedColour = YELLOW;
}

document.getElementById('redbutton').onclick = function () {
	selectedColour = RED;
}

document.getElementById('greenbutton').onclick = function () {
	selectedColour = GREEN;
}

document.getElementById('whitebutton').onclick = function () {
	selectedColour = WHITE;
}

document.getElementById('orangebutton').onclick = function () {
	selectedColour = ORANGE;
}


function changeColour (facelet) {
	switch (selectedColour) {
	case BLUE:
		facelet.style.backgroundColor = 'blue';
		break;
	case YELLOW:
		facelet.style.backgroundColor = 'yellow';
		break;
	case RED:
		facelet.style.backgroundColor = 'red';
		break;
	case GREEN:
		facelet.style.backgroundColor = '#00FF7F';
		break;
	case WHITE:
		facelet.style.backgroundColor = 'white';
		break;
	case ORANGE:
		facelet.style.backgroundColor = 'orange';
		break;
	}		
}


document.getElementById('f1').onclick = function () {
	changeColour(document.getElementById('f1'));
}

document.getElementById('f2').onclick = function () {
	changeColour(document.getElementById('f2'));
}

document.getElementById('f3').onclick = function () {
	changeColour(document.getElementById('f3'));
}

document.getElementById('f4').onclick = function () {
	changeColour(document.getElementById('f4'));
}

document.getElementById('f5').onclick = function () {
	changeColour(document.getElementById('f5'));
}

document.getElementById('f6').onclick = function () {
	changeColour(document.getElementById('f6'));
}

document.getElementById('f7').onclick = function () {
	changeColour(document.getElementById('f7'));
}

document.getElementById('f8').onclick = function () {
	changeColour(document.getElementById('f8'));
}

document.getElementById('f9').onclick = function () {
	changeColour(document.getElementById('f9'));
}

document.getElementById('f10').onclick = function () {
	changeColour(document.getElementById('f10'));
}

document.getElementById('f11').onclick = function () {
	changeColour(document.getElementById('f11'));
}

document.getElementById('f12').onclick = function () {
	changeColour(document.getElementById('f12'));
}

document.getElementById('f13').onclick = function () {
	changeColour(document.getElementById('f13'));
}

document.getElementById('f14').onclick = function () {
	changeColour(document.getElementById('f14'));
}

document.getElementById('f15').onclick = function () {
	changeColour(document.getElementById('f15'));
}

document.getElementById('f16').onclick = function () {
	changeColour(document.getElementById('f16'));
}

document.getElementById('f17').onclick = function () {
	changeColour(document.getElementById('f17'));
}

document.getElementById('f18').onclick = function () {
	changeColour(document.getElementById('f18'));
}

document.getElementById('f19').onclick = function () {
	changeColour(document.getElementById('f19'));
}

document.getElementById('f20').onclick = function () {
	changeColour(document.getElementById('f20'));
}

document.getElementById('f21').onclick = function () {
	changeColour(document.getElementById('f21'));
}

document.getElementById('f22').onclick = function () {
	changeColour(document.getElementById('f22'));
}

document.getElementById('f23').onclick = function () {
	changeColour(document.getElementById('f23'));
}

document.getElementById('f24').onclick = function () {
	changeColour(document.getElementById('f24'));
}
