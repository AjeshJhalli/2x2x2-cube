const file = Bun.file("table-2x2x2.json");
const content = await file.text();
const json = JSON.parse(content);


let newJson = {};

json.states.forEach(state => {
  
  if (!newJson[state.all]) {
    newJson[state.all] = state.movesReversed.slice(0, -1);
  }

});

await Bun.write("table-2x2x2-compressed.json", JSON.stringify(newJson));