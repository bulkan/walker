import p5 from 'p5';

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background("black");

    p.colorMode(p.HSB, 255);
    p.textSize(10);
  };

  p.draw = () => {
    p.translate(p.windowWidth / 2, p.windowHeight / 2);
    p.circle(0, 0, 100);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background("black");
  }
};

new p5(sketch);