//renderer to draw graphics
function Renderer() {
  this.screen = document.getElementById("screen");
  this.context = this.screen.getContext("2d");
  this.context.fillRect(0, 0, 640, 320);
}

Renderer.prototype.clearDisplay = function() {
  this.context.clearRect(0 , 0, 640, 320);
}

Renderer.prototype.drawGraphics = function(display) {
  this.clearDisplay();
  for (var i = 0; i < display.length; i++) {
    xCord = (i % 64) * 10;
    yCord = (Math.floor(i / 64)) * 10;
    if(display[i]) {
      this.context.fillStyle = "#ffffff";
      this.context.fillRect(xCord, yCord, 10, 10);
    }
    else {
      this.context.fillStyle = "#000000";
      this.context.fillRect(xCord, yCord, 10, 10);
    }
  }
}

Renderer.prototype.playSound = function() {
  var sound = document.getElementById('beep');
  sound.play();
}
