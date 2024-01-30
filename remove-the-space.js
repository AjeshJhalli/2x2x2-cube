var newJson = {};
var json;

async function removeTheSpace() {
  const file = Bun.file("table-2x2x2-compressed.json");
  const content = await file.text();
  json = JSON.parse(content);
  
  Object.keys(json).forEach(key => {
    newJson[key.replaceAll(",", "")] = parseInt(json[key]);
  });
}


await removeTheSpace();


await Bun.write("table-2x2x2-compressed.json", JSON.stringify(newJson));