  //keyboard mapper to map certain keys
  //to hex. Chip8 keys are sooooo
  // weird!
  var keyMapper = {
    "49": 0x1, //1
    "50": 0x2, //2
    "51": 0x3, //3
    "52": 0xc, //4
    "81": 0x4, //q
    "87": 0x5, //w
    "69": 0x6, //e
    "82": 0xd, //r
    "65": 0x7, //a
    "83": 0x8, //s
    "68": 0x9, //d
    "70": 0xc, //f
    "90": 0xa, //z
    "88": 0x0, //x
    "67": 0xb, //c
    "86": 0xf, //v
  }

  function Keyboard(chip8) {
    this.chip8 = chip8;
  }

  Keyboard.prototype.keyPressed = function(event) {
    //check if the emulator has halted to rerun it.
    if(this.chip8.continue && !this.chip8.isRunning) {
      for(var keys in keyMapper) {
        if(keys === String(event.keyCode)) {
           this.chip8.continue(keyMapper[keys]);
        }
      }
    }

    for(var keys in keyMapper) {
      if(keys === String(event.keyCode)) {
        this.chip8.KeyPressed(keyMapper[keys]);
      }
    }
  };

  Keyboard.prototype.keyUp = function(event) {
    for(var keys in keyMapper) {
      if(keys === String(event.keyCode)) {
        this.chip8.keyReleased(keyMapper[keys]);
      }
    }
  };
