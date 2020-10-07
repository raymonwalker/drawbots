
function init() {
  controller.init();
}

function setup() {
  var simCanvas = createCanvas(600, 400);
  simCanvas.parent('simContainer');
  controller.setup(width * 0.5, height * 0.5);
}

function mouseDragged() {
  var canvasParent = document.getElementById('simContainer');
  if (mouseX >= 0 && mouseX <= canvasParent.clientWidth &&
      mouseY >= 0 && mouseY <= canvasParent.clientHeight)
  {
    controller.mouseDragged(mouseX, mouseY);
  }
}

function mousePressed() {
  var canvasParent = document.getElementById('simContainer');
  if (mouseX >= 0 && mouseX <= canvasParent.clientWidth &&
      mouseY >= 0 && mouseY <= canvasParent.clientHeight)
  {
    controller.mousePressed(mouseX, mouseY);
  }
}

function draw() {
  background(200);
  controller.draw();
}

function buildRouteUrl(direction,speed) {
  return "/" + direction + "/?speed=" + speed;
}
function postRoute(url) {
  $.ajax({
      url: url,
      data: $('form').serialize(),
      type: 'POST',
      success: function(response) {
          console.log(response);
      },
      error: function(error) {
          console.log(error);
      }
  });
}
function drive(direction) {
  var speed = document.getElementById('speed').value;
  postRoute(buildRouteUrl(direction,speed));
  console.log('direction');
}

function goForward() {
  console.log('p5-goForward');
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/forward?speed=" + speed});
  controller.goForward(speed);
  console.log('p5-goForward end');
}

function goBackward() {
  console.log('p5-goBackward');
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/backward?speed=" + speed});
  controller.goBackward(speed);
}

function goStop() {
  console.log('p5-goStop');
  controller.goStop();
}

function goLeft() {
  console.log('p5-goLeft');
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/left?speed=" + speed});
  controller.goLeft(speed);
}

function goRight() {
  console.log('p5-goRight');
  var speed = document.getElementById('speed').value;
  $.ajax({url:"/right?speed=" + speed});
  controller.goRight(speed);
}

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

function executeDrawScript() {
  var scriptParameters = document.getElementById('drawScriptParameters').value;
  //disableAllControlButtons();
  var speed = document.getElementById('speed').value;
  console.log('Executing scriptParameters: ' + scriptParameters);
  for (const c of scriptParameters) {
    console.log('Processing parameter: ' + c);

    switch(c) {
      case 'F':
        drive("forward");
        //goForward();
       break;
      case 'f':
        drive("forward");
        //goForward();
        break;
      case 'R':
        drive("right");
        break;
      case 'r':
        drive("right");
        break;
      case 'B':
        drive("backward");
        break;
      case 'b':
        drive("backward");
        break;
      case 'L':
        drive("left");
        break;
      case 'l':
        drive("left");
        break;
      default:
        break;
    }
    console.log('Sleeping');
    sleep(speed * 2);
    console.log('Waking');
  }
}

function disableAllControlButtons() {
  document.getElementById('drawScriptParameters').setAttribute("disabled","true");
  document.getElementById('forward').setAttribute("disabled","true");
  document.getElementById('right').setAttribute("disabled","true");
  document.getElementById('left').setAttribute("disabled","true");
  document.getElementById('backward').setAttribute("disabled","true");
  document.getElementById('stop').setAttribute("disabled","true");
  document.getElementById('speed').setAttribute("disabled","true");
  document.getElementById('executeDrawScript').setAttribute("disabled","true");
}
