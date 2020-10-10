const isMobileDevice = () => {
  return navigator.userAgent.indexOf('Mobi') > -1;
}

const drawStars = (p) => {
  let count = 100;
  const maxCount = 2000;
  const minCount = 100;
  const minSize = 0.5;
  const maxSize = 2.5;
  const controlOffset = 0.2;

  const x = new Array(count);
  const y = new Array(count);
  const speed = new Array(count);
  
  let myc;

  p.setup = () => {
    myc = p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
    myc.parent('star');
    p.noStroke();

    let i = 0;
    while (i < maxCount) {
      x[i] = p.random(0, p.width);
      y[i] = p.random(0, p.height);
      speed[i] = p.random(minSize, maxSize);
      i += 1;
    };
  };

  p.draw = () => {
    p.fill(0, 15);
    p.rect(0, 0, p.width, p.height);

    let i = 0;
    while (i < count) {
      p.fill(100 * speed[i]);
      p.ellipse(x[i], y[i], speed[i], speed[i]);
      y[i] += speed[i];
      x[i] -= speed[i];
      if (y[i] > p.height) {
        y[i] = 0;
      };
      if (x[i] < 0) {
        x[i] = p.width;
      };
      i += 1;
    };
  };

  p.mouseWheel = (e) => {
    console.log(count)
    let value = count;
    value += e.delta * controlOffset;

    if(value > maxCount || value < minCount) return;

    count = value;
  }
}

const drawAesteroid = (p) => {
  const isMobile = isMobileDevice();
  const scale = isMobile ? 2.5 : 3;
  let myc;
  let asteroid;
  let tex;

  p.setup = () => {
    myc = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    myc.parent('ast');
    asteroid = p.loadModel('asset/asteroid.obj', true);
    tex = p.loadImage("asset/tex/ast.jpg");
  };

  p.draw = () => {
    p.ambientLight(20, 25, 20, 0.3)
    const dirY = (p.mouseY / p.height - 0.5) * 4;
    const dirX = (p.mouseX / p.width) * 6;
    p.directionalLight(200, 200, 200, dirX, dirY, 1);
    p.rotateZ(p.frameCount * 0.001);
    p.rotateX(p.frameCount * 0.004);
    p.rotateY(p.frameCount * 0.008);
    p.orbitControl();
    p.texture(tex);
    p.scale(scale);
    p.model(asteroid);
  };
}

new p5(drawStars);
new p5(drawAesteroid);
