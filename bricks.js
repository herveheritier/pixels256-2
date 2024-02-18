const brickSelector = document.querySelector('select[name=brick]')
//
const actionBricksCatalog = [
  {
    name: 'random', label: 'random',
    fct: () => paintOneRandomPixel()
  },
  {
    name: 'filterLeft', label: 'filter left',
    fct: (i) => filterOnePixel(nextPointFromLeft(i), 127, 127, 0, 255)
  },
  {
    name: 'filterBottom', label: 'filter bottom',
    fct: (i) => filterOnePixel(nextPointFromTop(i), 0, 0, 255, 255)
  },
  {
    name: 'filterTop', label: 'filter top',
    fct: (i) => filterOnePixel(nextPointFromBottom(i), 255, 0, 0, 255)
  },
  {
    name: 'filterRight', label: 'filter right',
    fct: (i) => filterOnePixel(nextPointFromRight(i), 0, 255, 0, 255)
  },
  {
    name: 'rotateLeft', label: 'rotate left',
    fct: (i) => rotateLeft(i)
  },
  {
    name: 'rotateRight', label: 'rotate right',
    fct: (i) => rotateRight(i)
  },
  {
    name: 'mirrorHorizontal', label: 'mirror horizontal',
    fct: (i) => mirrorHorizontal(i)
  },
  {
    name: 'mirrorVertical', label: 'mirror vertical',
    fct: (i) => mirrorVertical(i)
  },
  {
    name: 'mirrorBoth', label: 'mirror both',
    fct: (i) => mirrorBoth(i)
  }
]
//
function addOptionsToBrickSelector(actionBricksCatalog) {
  actionBricksCatalog.forEach((elt) => {
    const option = document.createElement('option')
    option.value = elt.name
    option.innerText = elt.label
    brickSelector.appendChild(option)
  })
}