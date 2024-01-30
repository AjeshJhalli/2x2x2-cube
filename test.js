const file = Bun.file("table-2x2x2.json");
const content = await file.text();
const json = JSON.parse(content);

function displayCube(cube) {

  const front = cube.front;
  const top = cube.top;
  const right = cube.right;
  const back = cube.back;
  const bottom = cube.bottom;
  const left = cube.left;

  console.log("     " + top[3] + " " + top[1] + "     ");
  console.log("     " + top[2] + " " + top[0] + "     ");
  console.log();
  console.log(left[3] + " " + left[1] + "  " + front[3] + " " + front[1] + "  " + right[3] + " " + right[1] + "  " + back[3] + " " + back[1]);
  console.log(left[2] + " " + left[0] + "  " + front[2] + " " + front[0] + "  " + right[2] + " " + right[0] + "  " + back[2] + " " + back[0]);
  console.log();
  console.log("     " + bottom[3] + " " + bottom[1] + "     ");
  console.log("     " + bottom[2] + " " + bottom[0] + "     ");
}

function findCube(cube) {

  // const foundCube = json.states.find(c => c.all === cube.all);
  const foundCube = json.states.filter(c =>
    c.front === cube.front &&
    c.right === cube.right &&
    c.left === cube.left &&
    c.back === cube.back
  );

  console.log(foundCube);

  if (foundCube) {
    displayCube(foundCube[foundCube.length - 1]);
  } else {
    console.log("Invalid cube");
  }
  

}

const cube = {
  // all: 
  front: "BBBB",
  top: "WWWW",
  right: "RRRR",
  left: "OOOO",
  bottom: "YYYY",
  back: "GGGG"
};

findCube(cube);