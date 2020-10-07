
class DrawbotController
{
  constructor() {
    this.turtle = new Turtle();
    this.robotMoves = [];
  }

  setup(x, y) {
    this.turtle.setStartPosition(x, y);
    this.turtle.init();
  }

  mousePressed(mouseX, mouseY) {
  }

  mouseDragged(mouseX, mouseY) {
  }

  init() {
  }

  draw() {
    fill(50, 50, 50);
    this.turtle.init();
    var last = this.turtle.tip();

    for (var i = 0; i < this.robotMoves.length; i++) {
      this.turtle.move(this.robotMoves[i]);
      var current = this.turtle.tip();
      line(last.x, last.y, current.x, current.y);
      last = current;
    }
    this.turtle.draw();
  }

  goForward(speed) {
    console.log('controller-goForward');
    this.robotMoves.push({dir:FWD,speed:speed});
  }

  goBackward(speed) {
    console.log('controller-goBackward');
    this.robotMoves.push({dir:BCK,speed:speed});
  }

  goStop() {
    console.log('controller-goStop');
    this.robotMoves.push({dir:STP,speed:0});
  }

  goLeft(speed) {
    console.log('controller-goLeft');
    this.robotMoves.push({dir:LFT,speed:speed});
  }

  goRight(speed) {
    console.log('controller-goRight');
    this.robotMoves.push({dir:RGT,speed:speed});
  }
}
