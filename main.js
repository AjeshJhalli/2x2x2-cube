var selectedColour;


document.getElementById('bluebutton').onclick = function () {
	selectedColour = document.getElementById('bluebutton').style.backgroundColor;
}

document.getElementById('yellowbutton').onclick = function () {
	selectedColour = document.getElementById('yellowbutton').style.backgroundColor;
}

document.getElementById('redbutton').onclick = function () {
	selectedColour = document.getElementById('redbutton').style.backgroundColor;
}

document.getElementById('greenbutton').onclick = function () {
	selectedColour = document.getElementById('greenbutton').style.backgroundColor;
}

document.getElementById('whitebutton').onclick = function () {
	selectedColour = document.getElementById('whitebutton').style.backgroundColor;
}

document.getElementById('orangebutton').onclick = function () {
	alert('here');
	selectedColour = document.getElementById('orangebutton').style.backgroundColor;
}
alert('check');


document.getElementById('f1').onclick = function () {
	document.getElementById('f1').style.backgroundColor = selectedColour;
}

document.getElementById('f2').onclick = function () {
	document.getElementById('f2').style.backgroundColor = selectedColour;
}

document.getElementById('f3').onclick = function () {
	document.getElementById('f3').style.backgroundColor = selectedColour;
}

document.getElementById('f4').onclick = function () {
	document.getElementById('f4').style.backgroundColor = selectedColour;
}

document.getElementById('f1').onclick = function () {
	document.getElementById('f1').style.backgroundColor = selectedColour;
}