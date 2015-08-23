
function Chip8() {

  //program counter
  this.pc = 0;

   //register used to store memory address, 16-bit
  this.I = null;

  //8-bit register
  this.soundTimer = null;

  //8-bit register
  this.delayTimer = null;

  //8-bit
  this.stackPointer = null;

  this.memory = new Array(4095);

  //16-bit long stack
  this.stack = new Array(16);

  //registers 8-bit
  this.Vx = new Array(16);

  this.hexChars = [
    0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
    0x20, 0x60, 0x20, 0x20, 0x70, // 1
    0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
    0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
    0x90, 0x90, 0xF0, 0x10, 0x10, // 4
    0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
    0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
    0xF0, 0x10, 0x20, 0x40, 0x40, // 7
    0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
    0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
    0xF0, 0x90, 0xF0, 0x90, 0x90, // A
    0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
    0xF0, 0x80, 0x80, 0x80, 0xF0, // C
    0xE0, 0x90, 0x90, 0x90, 0xE0, // D
    0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
    0xF0, 0x80, 0xF0, 0x80, 0x80  // F
  ]
}

Chip8.prototype.initialize = function() {

  this.pc = 0x200;

  this.I = 0;

  this.soundTimer = 0;

  this.delayTimer = 0;

  this.stackPointer = 0;

  //reset the registers
  for(var i = 0; i < this.Vx.length; i++) {
    this.Vx[i] = 0;
  }

  //reset the stack
  for(var i = 0; i < this.stack.lenght; i++) {
    this.stack[i] = 0;
  }

  for(var i = 0; i < this.hexChars.length; i++) {
    this.memory[i] = this.hexChars[i];
  }
}

Chip8.prototype.loadProgram = function() {

}

Chip8.prototype.startCycle = function() {

  var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
}
