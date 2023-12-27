class Shark {
    constructor(){
        this. x = 0;
        this.y = fish.y -50;
        this.width = 100;
        this.height = 100;
        this.vx = 0;
        this.color = 'blue';
        this.img = new Image()
        this.img.src= 'images/pngwing.com(3).png'
        
    }
    update() {
        if (this.x < this.width - 100) {
            this.x = this.width - 100;
            this.vx = 0;
          } else {
            this.vx += 1;
            this.vx *= 0.8;
            this.x -= this.vx;
          }
          if (this.x > canvas.width - (this.width *2) + 25) {
            this.x = canvas.width - this.width * 2 + 25;
            this.vx = 0;
          }
          if (rightPressed) this.chase();
          if (UpPressed) this.movementUp_Down(true);
          if (DownPressed) this.movementUp_Down(false); 
       
      }
      draw() {
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
      chase() {
        this.vx -= 1.9;
      }
      movementUp_Down(isUp) {
        if (isUp) {
          if ((this.height -100) *2 > this.y) this.y = this.height - 110;
          else this.y -= 2;
        } else {
          if (canvas.height - 135 < this.y) this.y = canvas.height-135;
          else this.y += 2;
        }
      }
}

const sharks = new Shark();