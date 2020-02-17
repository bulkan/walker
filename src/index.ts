import p5 from 'p5';
import palettes from 'nice-color-palettes/1000.json';

new p5((p: p5) => {
  let x = p.random(0, p.windowWidth);
  let y = p.random(0, p.windowHeight);

  let colorIndex = 0;
  let palette = p.random(palettes);
  let background = palette.pop();

  let xoff = 0.0;
  let yoff = 0.0;
  let lineOff = 0.0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // p.blendMode(p.SCREEN);
    p.background(background);
    // p.colorMode(p.HSB, 255);


    document.onkeydown = function(e) {
      if (e.metaKey && e.keyCode === 83) {
        p.saveCanvas(`walker-(${Date.now()}`, "png")
        return false;
      }
    }
  };

  let iteration = 0;

  p.draw = () => {
    console.log(`${iteration += 1}`);

    if (iteration >= 3000) {
      p.noLoop();
    }

    xoff += 0.001;
    yoff += 0.001;

    lineOff += 0.01;

    const yNoise = p.random(yoff);
    const xNoise = p.map(p.noise(xoff), 0, 1, 0, 4);
    const moveBy = p.map(p.noise(xoff), 0, 1, 1, 4);

    const r = xNoise;

    if (r >= 0 && r < 1) {
      x += moveBy;
    } else if (r >= 1 && r < 2) {
      x -= moveBy;
    } else if (r >= 2 && r < 3) {
      y += moveBy;
    } else if (r > 3) {
      y -= moveBy;
    }

    if (x >= p.windowWidth) {
      x = 0;
    } 

    if (x < 0) {
      x = p.windowWidth;
    } 

    if (y >= p.windowHeight) {
      y = 0;
    }

    if (y < 0) {
      x = p.windowHeight;
    } 

    colorIndex = (colorIndex + palette.length - 1) % palette.length;

    const color = p.color(palette[colorIndex]);
    color.setAlpha(p.map(xNoise, 0, 1, 0, 50));

    p.stroke(color);
    p.strokeWeight(p.map(p.noise(lineOff), 0, 1, 1, 3));

    // p.fill(color);
    p.line(x / yNoise, y / yNoise, (x * yNoise), (y * yNoise));
    // p.point(x, y);
    // p.point(x + (y * yNoise), y + (x * yNoise));
  };
});