class Fish {
  constructor() {
    this.x = 0;
    this.y = 200;
    this.width = 60;
    this.height = 40;
    this.vx = 0;
    this.gap = 1; // the gap between the shark and the fish
    this.img = new Image();
    this.img.src ='/images/pngwing.com(12).png'
  }
  update() {
    if (this.x < this.width + 50) {
      this.x = this.width + 50;
      this.vx = 0;
    } else {
      this.vx += this.gap;
      this.vx *= 0.8;
      this.x -= this.vx;
    }
    if (this.x > canvas.width - (this.width *2) ) {
      this.x = canvas.width - this.width * 2;
      this.vx = 0;
    }
    if (rightPressed) this.excape();
    if (UpPressed) this.movementUp_Down(true);
    if (DownPressed) this.movementUp_Down(false);
    sharks.update()
    
    
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.drawImage(this.img ,this.x, this.y, this.width, this.height)
    sharks.draw()
  }
  excape() {
    this.vx -= 1.9;
  }
  movementUp_Down(isUp) {
    if (isUp) {
      if (this.height  > this.y) this.y = this.height;
      else this.y -= 2;
    } else {
      if (canvas.height - (this.height *2) < this.y) this.y = canvas.height-(this.height * 2);
      else this.y += 2;
    }
  }
}

const fish = new Fish();
