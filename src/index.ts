import p5 from 'p5';
import palettes from 'nice-color-palettes/1000.json';

const sketch = (p: p5) => {
  let x = p.windowWidth / 2;
  let y = p.windowHeight / 2;
  let palette = p.random(palettes);
  let colorIndex = 0;

  let xoff = 0.0;
  let yoff = 0.0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background("black");
    p.colorMode(p.HSB, 255);
  };

  p.draw = () => {  
    xoff += 0.01;

    const xNoise = p.map(p.noise(xoff), 0, 1, 0, 4);
    const moveBy = p.map(p.noise(xoff), 0, 1, 1, 5);


    if (xNoise >= 0 && xNoise < 1) {
      x += moveBy;
    } else if (xNoise >= 1 && xNoise < 2) {
      x -= moveBy;
    } else if (xNoise >= 2 && xNoise < 3) {
      y += moveBy;
    } else if (xNoise > 3) {
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
    color.setAlpha(p.map(xNoise, 0, 1, 0, 255));

    p.stroke(color);
    p.strokeWeight(moveBy);
    p.point(x, y);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background("black");
  }
};

new p5(sketch);