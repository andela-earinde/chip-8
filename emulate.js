(function(){
//initialize chip8
var chip8 = new Chip8();

ROMS = [
    "15PUZZLE",
    "BLINKY",
    "BLITZ",
    "BRIX",
    "CONNECT4",
    "GUESS",
    "HIDDEN",
    "IBM",
    "INVADERS",
    "KALEID",
    "MAZE",
    "MERLIN",
    "MISSILE",
    "PONG",
    "PONG2",
    "PUZZLE",
    "SYZYGY",
    "TANK",
    "TETRIS",
    "TICTAC",
    "UFO",
    "VBRIX",
    "VERS",
    "WIPEOFF"
  ];

//add roms to select input
var selectInput = document.getElementById("select-game");
for(var i = 0;  i < ROMS.length; i++) {
  var option = document.createElement("option");
  option.value = ROMS[i];
  option.text = ROMS[i];
  selectInput.appendChild(option);
}


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
  console.log("called");
  var sound = document.getElementById('beep');
  sound.play();
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
  loadProgramToMemory("INVADERS");
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