import { write } from "bun";

const FRONT = 1;
const TOP = 2;
const RIGHT = 3;
const FRONT_PRIME = 4;
const TOP_PRIME = 5;
const RIGHT_PRIME = 6;
const FRONT2 = 7;
const TOP2 = 8;
const RIGHT2 = 9;

const blue = 0xF00000;
const yellow = 0x0F0000;
const red = 0x00F000;
const green = 0x000F00;
const white = 0x0000F0;
const orange = 0x00000F;

function decodeMoves(movesNumber) {
  let pointer = 0xFn;

  let movesString = "";
  let exitLoop = false;

  for (let k = 0n; k < 12n; k++) {

    if (exitLoop) {
      break;
    }

    let shiftAmount = k * 4n;
    let move = (movesNumber & pointer << shiftAmount) >> shiftAmount;
    
    switch (Number(move)) {
      case FRONT:
        movesString = movesString.concat("F ");
        break;
      case TOP:
        movesString = movesString.concat("U ");
        break;
      case RIGHT:
        movesString = movesString.concat("R ");
        break;
      case FRONT_PRIME:
        movesString = movesString.concat("F' ");
        break;
      case TOP_PRIME:
        movesString = movesString.concat("U' ");
        break;
      case RIGHT_PRIME:
        movesString = movesString.concat("R' ");
        break;
      case FRONT2:
        movesString = movesString.concat("F2 ");
        break;
      case TOP2:
        movesString = movesString.concat("U2 ");
        break;
      case RIGHT2:
        movesString = movesString.concat("R2 ");
        break;
      default:
        exitLoop = true;
    }
  }

  return movesString;
}


function faceList(face) {
  return [
    calculateFacelet(face, 0x222222),
    calculateFacelet(face, 0x444444),
    calculateFacelet(face, 0x111111),
    calculateFacelet(face, 0x888888)
  ];
}

function colourToLetter(colour) {
  switch (colour) {
    case blue:
      return "B";
    case yellow:
      return "Y";
    case red:
      return "R";
    case green:
      return "G";
    case white:
      return "W";
    case orange:
      return "O";
  }
}


function calculateFacelet(face, position) {

  for (let colour = 0xF00000; colour > 0; colour >>= 4) {
    if (face & colour & position) {
      return colourToLetter(colour);
    }
  }
}

function displayCube(cube) {

  const front = faceList(cube.front);
  const top = faceList(cube.top);
  const right = faceList(cube.right);
  const back = faceList(cube.back);
  const bottom = faceList(cube.bottom);
  const left = faceList(cube.left);

  console.log("     " + top[3] + " " + top[1] + "     ");
  console.log("     " + top[2] + " " + top[0] + "     ");
  console.log();
  console.log(left[3] + " " + left[1] + "  " + front[3] + " " + front[1] + "  " + right[3] + " " + right[1] + "  " + back[3] + " " + back[1]);
  console.log(left[2] + " " + left[0] + "  " + front[2] + " " + front[0] + "  " + right[2] + " " + right[0] + "  " + back[2] + " " + back[0]);
  console.log();
  console.log("     " + bottom[3] + " " + bottom[1] + "     ");
  console.log("     " + bottom[2] + " " + bottom[0] + "     ");

}

async function populateDatabase() {

  const file = Bun.file("table-2x2x2.csv");
  const content = await file.text();
  const lines = content.split("\n");

  const states = {
    "states": []
  };

  let cube = {};

  lines.forEach(line => {

    const faces = line.split(",")

    cube = {
      front: faceList(faces[0]).join(""),
      top: faceList(faces[1]).join(""),
      right: faceList(faces[2]).join(""),
      back: faceList(faces[3]).join(""),
      bottom: faceList(faces[4]).join(""),
      left: faceList(faces[5]).join(""),
    };

    cube.all = [cube.front, cube.top, cube.right, cube.back, cube.bottom, cube.left].join();

    const numbers = line.split(",");
    const moves = numbers[numbers.length - 1];
    numbers.pop();

    const movesString = decodeMoves(BigInt(moves));

    const movesList = movesString.split(" ");

    let movesReversedString = "";

    movesList.slice().reverse().forEach(move => {
      switch (move) {
        case "F":
          movesReversedString += "F' ";
          break;
        case "U":
          movesReversedString += "U' ";
          break; 
        case "R":
          movesReversedString += "R' ";
          break;
        case "F'":
          movesReversedString += "F ";
          break;
        case "U'":
          movesReversedString += "U ";
          break;
        case "R'":
          movesReversedString += "R ";
          break;
        default:
          movesReversedString += move + " ";
      }
    });

    cube.moves = movesString;
    cube.movesReversed = movesReversedString;

    states.states.push(cube);

  });


  await Bun.write("table-2x2x2.json", JSON.stringify(states));
}

//1057920,1056780,786720,5245440,532560,532485,412571157

// console.log(decodeMoves(412571157n));

// console.log();

// displayCube({
//   front: 1057920,
//   top: 1056780,
//   right: 786720,
//   back: 5245440,
//   bottom: 532560,
//   left: 532485
// });

await populateDatabase();