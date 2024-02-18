let scenario = [[
  () => paintOneRandomPixel(),
  (i) => filterOnePixel(nextPointFromLeft(i), 127, 127, 0, 255),
  (i) => filterOnePixel(nextPointFromTop(i), 0, 0, 255, 255),
  (i) => filterOnePixel(nextPointFromBottom(i), 255, 0, 0, 255),
  (i) => filterOnePixel(nextPointFromRight(i), 0, 255, 0, 255),
], [
  //  (i)=>rotateRight(i),
  (i) => rotateLeft(i),
]]
//
function buildScenarioFromBricksList(bricksList) {
  let newScenario = []
  bricksList.forEach((brick) => {
    let slot = newScenario[brick.slotNumber]
    if (slot === undefined) slot = []
    slot[brick.brickNumber] = actionBricksCatalog.find(elt => elt.name == brick.name).fct || undefined
    newScenario[brick.slotNumber] = slot
  })
  return newScenario
}
//
  function updateScenario() {
    scenario = buildScenarioFromBricksList(getBricksList());
  }
//
function doScenario() {
  scenario.forEach((s) => {
    forPixels((i) => {
      s.forEach((t) => {
        t(i)
      })
    })
  })
}
function doAnimation() {
  doScenario()
  ctx.putImageData(pixels, 0, 0);
}
