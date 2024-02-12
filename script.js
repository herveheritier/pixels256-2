var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const pixels = ctx.getImageData(0, 0, width, height);
let data = pixels.data;
let size = width * height;
//
function rnd(a,b) {
  return (Math.random() * (b-a+1))>>0 + a;
}
function randomPixel(wh=size) {
  return rnd(0,wh) * 4;
}
function paintOneRandomPixel(w=width,h=height,wh=size) {
  let i = randomPixel(wh);
  data[i] = rnd(0,256);
  data[i+1] = rnd(0,256);
  data[i+2] = rnd(0,256);
  data[i+3] = 255;
}
function filterOnePixel(p,r,g,b,a) {
  let i = p<<2;
  data[i] &= r;
  data[i+1] &= g;
  data[i+2] &= b;
  data[i+3] &= a;
}
function nextPointFromRight(p,w=width,h=height,wh=size) {
  let x = p % w;
  let y = (p / w)>>0;
  return x*w + y;
}
function nextPointFromLeft(p,w=width,h=height,wh=size) {
  return wh-nextPointFromRight(p,w,h,wh);
}
function nextPointFromTop(p,w=width,h=height,wh=size) {
  return p+1
}
function nextPointFromBottom(p,w=width,h=height,wh=size) {
  return wh-nextPointFromTop(p,w,h,wh);
}
function forPixels(fct,from=0,to=size) {
  let inc = (to-from)>0?1:-1;
  for (let i = from; i < to; i+=inc) {
    fct(i);
  }
}
function rotateLeft(p,w=width,h=height) {
  if(p!=0) return
  let buffer = Uint8Array.from(data);
  forPixels((q)=>{
    let x = q % w;
    let y = (q / w)>>0;
    let j = (x*w + h-y)<<2;
    let i = q<<2;
    data[i] = buffer[j];
    data[i+1] = buffer[j+1];
    data[i+2] = buffer[j+2];
    data[i+3] = buffer[j+3];
  })
}
function rotateRight(p,w=width,h=height) {
  if(p!=0) return
  let buffer = Uint8Array.from(data);
  forPixels((q)=>{
    let x = q % w;
    let y = (q / w)>>0;
    let j = (x*w + h-y)<<2;
    let i = q<<2;
    data[j] = buffer[i];
    data[j+1] = buffer[i+1];
    data[j+2] = buffer[i+2];
    data[j+3] = buffer[i+3];
  })
}
const scenario = [[
  ()=>paintOneRandomPixel(),
  (i)=>filterOnePixel(nextPointFromLeft(i),127,127,0,255),
  (i)=>filterOnePixel(nextPointFromTop(i),0,0,255,255),
  (i)=>filterOnePixel(nextPointFromBottom(i),255,0,0,255),
  (i)=>filterOnePixel(nextPointFromRight(i),0,255,0,255),
],[
//  (i)=>rotateRight(i),
  (i)=>rotateLeft(i),
]]
function doScenario() {
  scenario.forEach((s) => {
    forPixels((i)=>{
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
function draw() {
  doAnimation();
  requestAnimationFrame(draw);
}
//
requestAnimationFrame(draw);