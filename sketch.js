var snake;
var scl = 20;
var food;
var bg;
var bgWidth = 2510;
var bgHeight = 1450;
var cnv;
var dead = false;
var startSecond;
var sizetext;


function setup() {
  bg = loadImage('background.png');
  snake = new Snake();
  pickLocation();
  frameRate(10);
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode == 87) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode == 83) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW || keyCode == 68) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW || keyCode == 65) {
    snake.dir(-1, 0);
  }
}

function draw() {

  var width = windowWidth;
  var height = windowHeight;

  if (dead == false) {

      if (width  <= bgWidth) {

        cnv = createCanvas(width, height);
      }
      else {
        cnv = createCanvas(bgWidth, bgHeight);
        width = bgWidth;
        height = bgHeight;
      }
      cnv.style('display', 'block');
      background(bg);
      stroke(255, 93, 0);
      strokeWeight(2);
      noFill();
      rect(0, 0, width, height);
      noStroke();
      fill(255, 93, 0);
      rect(food.x, food.y, scl, scl);

      if (snake.eat(food)) {
        pickLocation();
      }
      snake.death();
      snake.update();
      snake.show();
  }
  else if (dead == true) {
      if (width > 1200) {
        sizetext = 235;
        textSize(sizetext);

        strokeWeight(60);
      } else {
        sizetext = 100;
        textSize(sizetext);
        strokeWeight(25);
      }
      text('GAME', width/2 - (sizetext * 1.4), height/2 - 110);
      text('OVER', width/2 - (sizetext * 1.4), height/2 + 110);

      if (second() - startSecond < 1) {
          dead = true;
      } else {
          dead = false;
      }
  }

}



function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

class Snake {

    constructor() {
      this.x = 0;
      this.y = 0;
      this.xspeed = 1;
      this.yspeed = 0;
      this.total = 5;
      this.tail = [createVector(-10, 0),createVector(-20, 0), createVector(-30, 0), createVector(-40, 0)];
    }

   dir(xspeed, yspeed) {
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }

   eat(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

   death() {

    for (var i = 0; i < this.tail.length - 1; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);

      if (d < 1) {
        this.tail = [createVector(-10, 0),createVector(-20, 0), createVector(-30, 0), createVector(-40, 0)];
        this.total = 5;
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        dead = true;
        startSecond = second();
      }
    }
  }

  update() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }

    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);

  }

  show() {
    fill(255, 93, 0);
    noStroke();

    for (var i = 0; i < this.tail.length - 1; i++) {
      rect(this.tail[i+1].x, this.tail[i+1].y, scl, scl);
    }


    rect(this.x, this.y, scl, scl);
  }

}
