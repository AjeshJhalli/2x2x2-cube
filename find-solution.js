const file = Bun.file("table-2x2x2-compressed.json");
const content = await file.text();
const json = JSON.parse(content);

// F - 1
// U - 2
// R - 3
// F' - 4
// U' - 5
// R' - 6
// F2 - 7
// U2 - 8
// R2 - 9

console.log(json["WRYGYRROBYBGGWOBYRWOGWOB"]);
console.log(json["BGGBYYYYORROGBBGWWWWROOR"]);
console.log(json["BBBBYYYYRRRRGGGGWWWWOOOO"]);