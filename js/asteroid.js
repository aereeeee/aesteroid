
// sketch star
  new p5(function(p) {
    var howMany = 500;
    var x = new Array(howMany);
    var y = new Array(howMany);
    var speed = new Array(howMany);
    var myc;
    p.setup = function() {
      myc=p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);  // <--- P2D
      myc.parent('star');
      p.noStroke();
 
      var i = 0;
      while (i<howMany) {
        x[i] = p.random(0, p.width);
        y[i] =p.random(0, p.height);
        speed[i] = p.random(0.5,2);
        i +=1;
      };
  
    };
    

    p.draw = function(b) {
        p.fill(0,15);
        p.rect(0,0,p.width, p.height);

        var i = 0;
        while (i < howMany) {
          p.fill(100*speed[i]);
          p.ellipse(x[i], y[i],speed[i],speed[i]);
          y[i] += speed[i];
          x[i]-=speed[i];
          if (y[i] > p.height) {
            y[i] = 0;
          };
          if (x[i]<0){
            x[i] = p.width;
          };
          i +=1;
        };
    };


  // p.windowResized=function() {
  // p.resizeCanvas(p.windowWidth, p.windowHeigh);
  // };
  });




  //sketch asteroid

 new p5(function(p) {
    var myc;
    var asteroid;
    var tex;
    p.setup = function() {
     myc= p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);  // <--- WEBGL
     myc.parent('ast');
    asteroid = p.loadModel('asset/asteroid.obj',true);
    tex = p.loadImage("asset/tex/ast.jpg");
    };
    p.draw = function(b) {
      // p.fill(255);
        p.ambientLight(20,25,20,0.3)
        var dirY = (p.mouseY / p.height - 0.5) * 4;
        var dirX = (p.mouseX / p.width ) *6 ;
        p.directionalLight(200, 200, 200, dirX, dirY, 1);
        p.rotateZ(p.frameCount * 0.001);
        p.rotateX(p.frameCount * 0.001);
        p.rotateY(p.frameCount * 0.008);
        p.orbitControl();
      p.texture(tex);
      p.scale(2.5);
      p.model(asteroid);
     
    };
  // p.windowResized=function() {
  // p.resizeCanvas(p.windowWidth, p.windowHeigh);
  // };
  });
