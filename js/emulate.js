(function(){
//initialize chip8
var chip8 = new Chip8();
var cancelAnimFrame;

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


var startEmulator = function(game) {
  chip8.initialize();
  var renderer = new Renderer();
  loadProgramToMemory(game);
  chip8.setRenderer(renderer);
  cancelAnimFrame = chip8.emulateChip8();
  console.log(cancelAnimFrame);
};

/*
* instantiate Keyboard
*/
var keyBoard = new Keyboard(chip8);

//Add key event listeners
addEventListener("keydown", keyBoard.keyPressed.bind(keyBoard));
addEventListener("keyup", keyBoard.keyUp.bind(keyBoard));

/*
* handle click event to load game when an option is selected
*/
var options = document.getElementById('select-game');
options.onchange = function(event) {
  if (cancelAnimFrame) {
    window.cancelAnimationFrame(cancelAnimFrame);
    console.log("called" + cancelAnimFrame);
  }
  startEmulator(options.value);
}

})()