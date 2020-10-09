const drawStars = (p) => {
  const stars = 500;
  const x = new Array(stars);
  const y = new Array(stars);
  const speed = new Array(stars);
  let myc;

  p.setup = () => {
    myc = p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
    myc.parent('star');
    p.noStroke();

    let i = 0;
    while (i < stars) {
      x[i] = p.random(0, p.width);
      y[i] = p.random(0, p.height);
      speed[i] = p.random(0.5, 2);
      i += 1;
    };
  };

  p.draw = () => {
    p.fill(0, 15);
    p.rect(0, 0, p.width, p.height);

    let i = 0;
    while (i < stars) {
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
}

const drawAesteroid = (p) => {
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
    p.rotateX(p.frameCount * 0.001);
    p.rotateY(p.frameCount * 0.008);
    p.orbitControl();
    p.texture(tex);
    p.scale(2.5);
    p.model(asteroid);
  };
}

new p5(drawStars);
new p5(drawAesteroid);
