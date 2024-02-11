var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const pixels = ctx.getImageData(0, 0, width, height);
let data = pixels.data;
let wh = width * height;

function rnd(a,b) {
  return (Math.random() * (b-a+1))>>0 + a;
}

function randomPixel(w=width,h=height) {
  return (Math.random() * w * h * 4)>>0;
}

function paintOnePixel(w=width,h=height) {
  let i = randomPixel(w,h);
  let r = rnd(0,256);
  let g = rnd(0,256);
  let b = rnd(0,256);
  data[i] = r;
  data[i + 1] = g;
  data[i + 2] = b;
  data[i + 3] = 255;
}

function filterOnePixel(p,r,g,b,a) {
  let i = p<<2;
  data[i] &= r;
  data[i + 1] &= g;
  data[i + 2] &= b;
  data[i + 3] &= a;
}
  
const scenario = [[
  ()=>paintOnePixel(),
  (i)=>filterOnePixel(i,0,0,255,255),
  (i)=>filterOnePixel(wh-i,255,0,0,255)
]]

function doScenario() {
  scenario.forEach((s) => {
     for(let i = 0; i<wh; i++)
     s.forEach((t) => {
       t(i)
     })
  })
}

function doAnimation() {
  doScenario()
  ctx.putImageData(pixels, 0, 0);
}

function draw() {
  doAnimation();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);