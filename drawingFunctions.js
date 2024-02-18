function rnd(a, b) {
  return (Math.random() * (b - a + 1)) >> 0 + a;
}
function randomPixel(wh = size) {
  return rnd(0, wh);
}
function paintOnePixel(p, r, g, b, a) {
  let i = p << 2;
  data[i] = r;
  data[i + 1] = g;
  data[i + 2] = b;
  data[i + 3] = a;
}
function paintOneRandomPixel(w = width, h = height, wh = size) {
  let i = randomPixel(wh);
  paintOnePixel(i, rnd(0, 256), rnd(0, 256), rnd(0, 256), 255);
}
function filterOnePixel(p, r, g, b, a) {
  let i = p << 2;
  data[i] &= r;
  data[i + 1] &= g;
  data[i + 2] &= b;
  data[i + 3] &= a;
}
function nextPointFromRight(p, w = width, h = height, wh = size) {
  let x = p % w;
  let y = (p / w) >> 0;
  return x * w + y;
}
function nextPointFromLeft(p, w = width, h = height, wh = size) {
  return wh - nextPointFromRight(p, w, h, wh);
}
function nextPointFromTop(p, w = width, h = height, wh = size) {
  return p + 1
}
function nextPointFromBottom(p, w = width, h = height, wh = size) {
  return wh - nextPointFromTop(p, w, h, wh);
}
function forPixels(fct, from = 0, to = size) {
  let inc = (to - from) > 0 ? 1 : -1;
  for (let i = from; i < to; i += inc) {
    fct(i);
  }
}
function movePixel(bufferSrce, pixelSrce, bufferDest, pixelDest) {
  let i = pixelSrce << 2;
  let j = pixelDest << 2;
  bufferDest[j] = bufferSrce[i];
  bufferDest[j + 1] = bufferSrce[i + 1];
  bufferDest[j + 2] = bufferSrce[i + 2];
  bufferDest[j + 3] = bufferSrce[i + 3];
}
function pixel2coord(p, w = width, h = height, wh = size) {
  return [p % w, (p / w) >> 0];
}
function rotateLeft(p, w = width, h = height) {
  if (p != 0) return
  let buffer = Uint8Array.from(data);
  forPixels((q) => {
    let [x, y] = pixel2coord(q, w, h);
    movePixel(buffer, x * w + h - y, data, q);
  })
}
function rotateRight(p, w = width, h = height) {
  if (p != 0) return
  let buffer = Uint8Array.from(data);
  forPixels((q) => {
    let [x, y] = pixel2coord(q, w, h);
    movePixel(buffer, q, data, x * w + h - y);
  })
}
