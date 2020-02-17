import p5 from 'p5';
import palettes from 'nice-color-palettes/1000.json';

const MAX_WALKERS = 100;

new p5((p: p5) => {
  // let x = p.random(0, p.windowWidth);
  // let y = p.random(0, p.windowHeight);

  // let colorIndex = 0;
  let palette = p.random(palettes);
  let background = palette.pop();

  // let xoff = 0.0;
  // let yoff = 0.0;
  // let lineOff = 0.0;

  let walkers: Array<Walker> = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(background);
    // p.colorMode(p.HSB, 360, 100, 100, 100);

    document.onkeydown = function(e) {
      if (e.metaKey && e.keyCode === 83) {
        p.saveCanvas(`walker-${Date.now()}`, "png")
        return false;
      }
    }

    for (let i = 0; i < MAX_WALKERS; i++){
      walkers[i] = new Walker(p, p.color(p.random(palette)));  
    }
  };

  let iteration = 0;

  p.draw = () => {
    // console.log(`${iteration += 1}`);

    // if (iteration >= 3000) {
    //   p.noLoop();
    // }

    // yoff += 0.01;
    // const yNoise = p.random(yoff);

    for (let i = 0; i < MAX_WALKERS; i++){
      walkers[i].step();
      walkers[i].render();
    }
  };
});

class Walker {
  noff: number;
  p: p5;
  x: number;
  y: number;
  s: number;
  c: p5.Color;

  constructor(p: p5, color: p5.Color) {
    this.noff = 0.0; 
    this.p = p;
    this.x = p.random(p.windowWidth);
    this.y = p.random(p.windowHeight);
    this.c = color;
  }

  render() {
    const p = this.p;
    p.noStroke();
    const n = p.noise(this.noff);
    this.c.setAlpha(p.map(n, 0, 1, 5, 25));
    p.stroke(this.c);
    p.strokeWeight(p.map(n, 0, 1, 2, 5));
    p.line(this.x, this.y, this.x * n, this.y * n);
  }

  step() {
    this.noff += 0.001;

    const p = this.p;
    const n = p.noise(this.noff);

    let xStep = p.round(p.random(-1, 1));
    let yStep = p.round(p.random(-1, 1));
    
    let move = p.random(1);

    if (move < 0.1){
     xStep += p.round(p.random(-10, 10));
     yStep += p.round(p.random(-10, 10));
    }

    this.x += xStep + n;
    this.y += yStep + n;

    if (this.x >= p.windowWidth) {
      this.x = 0;
    } 

    if (this.x < 0) {
      this.x = p.windowWidth;
    } 

    if (this.y >= p.windowHeight) {
      this.y = 0;
    }

    if (this.y < 0) {
     this.y = p.windowHeight;
    } 
  }
}
