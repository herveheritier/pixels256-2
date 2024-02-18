const slots = document.querySelector("#slots");
// add slot button
const addSlotBtn = document.createElement("button");
addSlotBtn.textContent = "Add slot";
slots.appendChild(addSlotBtn);
// 
addSlotBtn.addEventListener("click",(e)=>{
  slots.appendChild(createSlot());
});
//
function createSlot() {
  const slot = document.createElement("div");
  slot.classList.add("slot");
  const addEltBtn = document.createElement("button");
  addEltBtn.textContent = "+";
  addEltBtn.addEventListener("click",(e)=>{
    const elt = document.createElement("div");
    elt.classList.add("slotElt");
    slot.appendChild(elt);
    const actionBtn = document.createElement("button");
    actionBtn.innerText = document.querySelector("select[name='brick']").value;
    actionBtn.classList.add("action");
    actionBtn.addEventListener("click",(e)=>{
      console.log(actionBtn.parentElement);
    });
    elt.appendChild(actionBtn);
    const removeEltBtn = document.createElement("button");
    removeEltBtn.textContent = "-";
    removeEltBtn.addEventListener("click",(e)=>{
      slot.removeChild(elt);
    })
    elt.appendChild(removeEltBtn);
  })
  slot.appendChild(addEltBtn);
  const removeSlotBtn = document.createElement("button");
  removeSlotBtn.textContent = "X";
  removeSlotBtn.addEventListener("click",(e)=>{
    slot.parentElement.removeChild(slot);
  })
  slot.appendChild(removeSlotBtn);
  return slot
}
//
function getBricksList() {
  const bricks = document.querySelectorAll("button.action");
  const bricksList = [];
  bricks.forEach((brick)=>{
    let slotElt = brick.parentElement;
    let slot = slotElt.parentElement;
    let slotNumber = Array.from(slot.parentNode.querySelectorAll(".slot")).indexOf(slot);
    let brickNumber = Array.from(slot.querySelectorAll(".slotElt")).indexOf(slotElt);
    bricksList.push({
      name : brick.innerText,
      slotNumber : slotNumber,
      brickNumber : brickNumber
    });
  })
  return bricksList;
}