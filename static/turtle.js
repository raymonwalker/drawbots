
var LFT = 0;
var RGT = 1;
var FWD = 2;
var BCK = 3;
var STP = 4;

class Turtle {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.startx = 0;
    this.starty = 0;
    this.theta = 0;
    this.turnRate = 30 * Math.PI/ 180.0;
    this.moveRate = 25; // conversion between IRL and canvas units
    this.size = 30;
    this.halfSize = 15;
  }

  setStartPosition(startx, starty) {
    this.startx = startx;
    this.starty = starty;
  }

  init() {
    this.x = this.startx;
    this.y = this.starty;
    this.theta = 0;
  }

  move(cmd) {
    switch (cmd.dir) {
      case FWD: this.forward(cmd.speed); break;
      case BCK: this.backward(cmd.speed); break;
      case STP: this.stop(cmd.speed); break;
      case LFT: this.left(cmd.speed); break;
      case RGT: this.right(cmd.speed); break;
    }
  }

  tip() {
    var dir = this.direction();
    var x = this.x + this.size * dir.x;
    var y = this.y + this.size * dir.y;
    return {x:x, y:y};
  }

  direction() {
    var y =  Math.sin(this.theta);
    var x =  Math.cos(this.theta);
    return {x:x, y:y};
  }

  forward(speed) {
    var dir = this.direction();
    // ASN TODO: map speed heuristic to distance? 
    // speed actually determines how long the motor runs -> do we know how much the wheels turn based on time?
    // or get a sensor to see how often the wheels turn?
    // or track the robot with an image target?
    var r = this.moveRate;
    this.x += r * dir.x;
    this.y += r * dir.y;
  }

  backward(speed) {
    var dir = this.direction();
    var r = -this.moveRate;
    this.x += r * dir.x;
    this.y += r * dir.y;
  }

  stop(speed) {
  }

  left(speed) {
    this.theta -= this.turnRate;
  }

  right(speed) {
    this.theta += this.turnRate;
  }

  draw() {
    //console.log(this.x+" "+this.y);
    stroke(0,0,0);
    push();
    fill(255,0,0);
    translate(this.x, this.y);
    rotate(this.theta);
    rotate(-Math.PI*0.5);
    triangle(-this.halfSize, -this.halfSize, 0, this.size, this.halfSize, -this.halfSize);
    pop();
  }
}

