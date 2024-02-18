var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const pixels = ctx.getImageData(0, 0, width, height);
let data = pixels.data;
let size = width * height;
//
defaultBricksList = [
  { "name": "random", "slotNumber": 0, "brickNumber": 0 },
  { "name": "filterLeft", "slotNumber": 0, "brickNumber": 1 },
  { "name": "rotateLeft", "slotNumber": 1, "brickNumber": 0 }
]
//
scenario = buildScenarioFromBricksList(defaultBricksList)
//
addOptionsToBrickSelector(actionBricksCatalog);
//
function draw() {
  doAnimation();
  requestAnimationFrame(draw);
}
//
requestAnimationFrame(draw);