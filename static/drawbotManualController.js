
class DrawbotManualController extends DrawbotController
{
  constructor() {
    super();
  }

  mousePressed(mouseX, mouseY) {
    this.turtle.setStartPosition(mouseX, mouseY);
  }

  init() {
    $(document).keydown(function(e) {
      // calls global goX functions!
      switch(e.which) {
	       case 37:// left
           goLeft();
           break;
         case 38: // up
           goForward();
           break;
	       case 39: // right
           goRight();
           break;
         case 40: // down
           goBackward();
           break;
         default: return; // exit this handler for other keys
     }
     e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  }
}

var controller = new DrawbotManualController();
