(function(){
//initialize chip8
var chip8 = new Chip8();


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
  //console.log(display);
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

//fetch program and load it to memory
var loadProgramToMemory = function(program) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'roms/'+program, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    // response is unsigned 8 bit integer
    var responseArray = new Uint8Array(xhr.response);
    chip8.loadProgram(responseArray);
  };

  xhr.send();
};


var startEmulator = function() {
  chip8.initialize();
  var renderer = new Renderer();
  loadProgramToMemory("HIDDEN");
  chip8.setRenderer(renderer);
  chip8.emulateChip8();
};

//instantiate Keyboard
var keyBoard = new Keyboard(chip8);

//Add key event listeners
addEventListener("keydown", keyBoard.keyPressed.bind(keyBoard));
addEventListener("keyup", keyBoard.keyUp.bind(keyBoard));

startEmulator();
})()