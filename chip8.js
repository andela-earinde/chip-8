
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

Chip8.prototype.loadProgram = function(program) {

  for(var i = 0; i < program.length; i++) {
    this.memory[512 + i] = program[i];
  }
}

Chip8.prototype.startCycle = function() {

  var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
  var x = (opcode & 0x0f00) >> 8;
  var y = (opcode & 0x00f0) >> 4;

  this.pc += 2;

  switch(opcode & 0xf000) {

    case 0x0000:
        switch(opcode) {

            case 0x00e:
                //clear display implement later
                break;

            case 0x00ee:
                //return from a subroutine
                break;

            default:
                console.log("Unknown opcode [0x0000]: 0x%X\n "+ opcode);
        }
        break;

    case 0xa000:
        this.I = opcode & 0x0fff;
        break;

    case 0x1000:
        this.pc = opcode & 0x0fff;
        break;

    case 0x2000:
        this.stackPointer += 1;
        this.stack.push(this.pc);
        this.pc = opcode & 0x0fff;
        break;

    case 0x3000:
        if(this.Vx[x] === (opcode & 0x00ff)) {
          this.pc += 2;
        }
        break;

    case 0x4000:
        if(this.Vx[x] !== (opcode & 0x00ff)){
          this.pc += 2;
        }
        break;

    case 0x5000:
        if(this.Vx[x] === this.Vx[y]) {
          this.pc += 2;
        }
        break;

    case 0x6000:
        this.Vx[x] = (opcode & 0x00ff);
        break;

    case 0x7000:
        this.Vx[x] += (opcode & 0x00ff);
        break;

    case 0x8000:
        switch(opcode & 0x000f) {

            case 0x0000:
                this.Vx[x] = this.Vx[y];
                break;

            case 0x0001:
                this.Vx[x] = this.Vx[x] | this.Vx[y];
                break;

            case 0x0002:
                this.Vx[x] = this.Vx[x] & this.Vx[y];
                break;

            case 0x0003:
                this.Vx[x] = this.Vx[x] ^ this.Vx[y];
                break;

            case 0x0004:
                this.Vx[x] += this.Vx[y];
                if(this.Vx[x] > 255) {
                  this.Vx[0xf] = 1;
                  this.Vx[x] -= 256
                }
                else this.Vx[0xf] = 0;
                break;

            case 0x0005:
                this.Vx[x] -= this.Vx[y];
                if(this.Vx[x] < 0) {
                  this.Vx[0xf] = 0;
                  this.Vx[x] += 256
                }
                else this.Vx[0xf] = 1;
                break;
        }
        break;
  }
}
