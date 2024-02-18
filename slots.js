const slots = document.querySelector("#slots");
// add slot button
const addSlotBtn = document.createElement("button");
addSlotBtn.textContent = "Add slot";
slots.appendChild(addSlotBtn);
// 
addSlotBtn.addEventListener("click", (e) => {
  slots.appendChild(createSlot());
});
//
function createSlotElt(slot) {
  const slotElt = document.createElement("div");
  slotElt.classList.add("slotElt");
  slot.appendChild(slotElt);
  return slotElt;
}
function createActionBtn(slotElt) {
  const actionBtn = document.createElement("button");
  actionBtn.innerText = document.querySelector("select[name='brick']").value;
  actionBtn.classList.add("action");
  slotElt.appendChild(actionBtn);
}
function createRemoveEltBtn(slotElt) {
  const removeEltBtn = document.createElement("button");
  removeEltBtn.textContent = "-";
  removeEltBtn.addEventListener("click", (e) => {
  slotElt.parentElement.removeChild(slotElt);
    updateScenario();
  })
  slotElt.appendChild(removeEltBtn);
}
//
function addEltBtnClick(slot) {
  const slotElt = createSlotElt(slot);
  createActionBtn(slotElt);
  createRemoveEltBtn(slotElt);
  updateScenario();
}
function createAddEltBtn(slot) {
  const addEltBtn = document.createElement("button");
  addEltBtn.textContent = "+";
  addEltBtn.addEventListener("click", (e) => {
    addEltBtnClick(slot);
  })
  slot.appendChild(addEltBtn);
}
function createRemoveSlotBtn(slot) {
  const removeSlotBtn = document.createElement("button");
  removeSlotBtn.textContent = "X";
  removeSlotBtn.addEventListener("click", (e) => {
    slot.parentElement.removeChild(slot);
    updateScenario();
  })
  slot.appendChild(removeSlotBtn);
}
//
function createSlot() {
  const slot = document.createElement("div");
  slot.classList.add("slot");
  createAddEltBtn(slot);
  createRemoveSlotBtn(slot);
  return slot
}
//
function getBricksList() {
  const bricks = document.querySelectorAll("button.action");
  const bricksList = [];
  bricks.forEach((brick) => {
    let slotElt = brick.parentElement;
    let slot = slotElt.parentElement;
    let slotNumber = Array.from(slot.parentNode.querySelectorAll(".slot")).indexOf(slot);
    let brickNumber = Array.from(slot.querySelectorAll(".slotElt")).indexOf(slotElt);
    bricksList.push({
      name: brick.innerText,
      slotNumber: slotNumber,
      brickNumber: brickNumber
    });
  })
  return bricksList;
}

function setBricksList(bricksList) {

}