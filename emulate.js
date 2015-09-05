(function(){
  //initialize chip8
  var chip8 = new Chip8();

  //fetch program and load it to memory

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
      if(display[i]) {
        xCord = i % 64;
        yCord = Math.floor(i / 64);
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(xCord, yCord, 10, 10);
      }
    }
  }

  //add renderer to context

  this.screen = document.getElementById("screen");
  this.context = this.screen.getContext("2d");
  this.context.fillRect(0, 0, 640, 320);
  this.context.fillStyle = "#ffffff";
  this.context.fillRect(0,0,10, 20);
  this.context.clearRect(100,100,10, 20);
})()