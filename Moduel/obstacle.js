const obstacles = [];

class GameElement {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {}
  isCollidingWith(fish) {
    return (
      this.x < fish.x + fish.width - 20 &&
      this.x + this.width - 20 > fish.x &&
      this.y < fish.y + fish.height - 20 &&
      this.y + this.height - 20 > fish.y
    );
  }
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class rodRope extends GameElement {
  constructor(x, y, width, height, isHarm) {
    super(x, y, width, height, "black");
    this.isHarm = isHarm;
    this.img = new Image();
    this.isHarm
      ? (this.img.src = "/images/1.png")
      : (this.img.src = "/images/pngwing.com(2).png");
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class ExplodingFish extends GameElement {
  constructor(x, y, width, height, isHarm) {
    super(x, y, width, height, "black");
    this.isHarm = isHarm;
    this.img = new Image();
    this.img.src = "/images/pngwing.com(11).png";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isCloseTOfish(obstacle) {
    return (
      this.x - 20 < obstacle.x + obstacle.width &&
      this.x + this.width + 20 > obstacle.x &&
      this.y - 20 < obstacle.y + obstacle.height &&
      this.y + this.height + 20 > obstacle.y
    );
  }

  isCollidingWith(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + 50 > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + 50 > obstacle.y
    );
  }
}

class Octopus extends GameElement {
  constructor(x, y, width, height, isHarm) {
    super(x, y, width, height, "purple");
    this.isHarm = isHarm;
    this.temp = Math.round(Math.random() + 1);
    this.img = new Image();
    this.img.src =
      this.temp == 1
        ? "./images/pngwing.com(5).png"
        : "./images/pngwing.com(15).png";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Grass extends GameElement {
  constructor(x, y, width, height, isHarm) {
    super(x, y, width, height, "green");
    this.isHarm = isHarm;
  }
}

class Basket extends GameElement {
  constructor(x, y, width, height, isHarm) {
    super(x, y, width, height, "black");
    this.isHarm = isHarm;
    this.temp = this.getRandomNumber(1, 3);
    this.img = new Image();
    if (this.temp <= 1) {
      this.img.src = "./images/pngwing.com(14).png";
    } else if (this.temp <= 2 && this.temp > 3)
      this.img.src = "./images/pngwing.com(9).png";
    else this.img.src = "./images/pngwing.com(16).png";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
class Net extends GameElement {
  /// this object changes to spare because the animation of the net
  constructor(x, y, width, height, isHarm) {
    super(x, y, width, height, "gray");
    this.isHarm = isHarm;
    this.orignalX = x;
    this.img = new Image();
    this.img.src = "./images/Untitled_design-removebg-preview.png";
  }
  update() {
    this.draw(false);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Coin extends GameElement {
  constructor(x, y, width, height, isHarm, typeOfPrize, src) {
    super(x, y, width, height);
    this.isHarm = isHarm;
    this.typeOfPrize = typeOfPrize;
    this.img = new Image();
    this.img.src = src;
  }
  draw() {
    ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Prize extends GameElement {
  constructor(x, y) {
    super(x, y, 0, 0, false);
    this.x = x;
    this.y = y;
    this.isHarm = false;
    // this.typeOfPrize = typeOfPrize;
    // this.count = this.getRandomNumber(2, 5);
    this.coin = [];
    this.iscoingCreated = false;
    this.canvasWidth = 0;
    this.isTheLastCoinOutCanvas = false;
    this.isTheHeartEnd = false;
    this.isVisible = true;
    this.i = 0;
    this.coinCount = 0;
  }

  genertaeCoin(counts) {
    let temp = [];
    let yAxis = this.getRandomNumber(20, 370);
    let yAxisGoldCoin = this.getRandomNumber(20, 370);
    for (let i = 0; i < counts; i++) {
      // console.log(i + " coins")
      if (temp.length >= 1) {
        temp.push(
          new Coin(
            temp[i - 1].x + temp[i - 1].width + 20,
            yAxis,
            50,
            50,
            false,
            "coin",
            "./images/fish_silver_coin.png"
          )
        );
      } else
        temp.push(
          new Coin(
            this.canvasWidth,
            yAxis,
            50,
            50,
            false,
            "coin",
            "./images/fish_silver_coin.png"
          )
        );
    }
    return temp;
  }
  update(whichOne) {
    // if (whichOne == 2) {this.coin = new Coin( /// golden coin
    //   this.canvasWidth,
    //   yAxis,
    //   50,
    //   50,
    //   false,
    //   "coin",
    //   "./images/fish_gold_coin.png"
    // )

    // } else { // silver coins
      if (this.isTheLastCoinOutCanvas) return;
      if (!this.iscoingCreated) {
        this.iscoingCreated = true;
        // console.log(this.count + " round" + this.i++ );
        this.coin = this.genertaeCoin(this.getRandomNumber(1, 4));
      }
      this.whatprize = 1; //getRandomNumber(1 , 3)

      if (this.whatprize === 1 && !this.isTheLastCoinOutCanvas) {
        // console.log( " bebbb" + this.i++ );

        this.coin.map((e) => {
          e.x -= 2; // increment the position of the coin when the fream is increased to look animatited  

          // console.log(e);
          // console.log(e.x + "::::coinx");

          if (e.isCollidingWith(fish)) { // Earn the coin when ever it collid with fish 
            this.coinCount += 2;
            coinScore.textContent = `${this.coinCount} *`;
            e.width = 0;
            e.height = 0;
          }
          e.draw();
        });
      // }

      this.isTheLastCoinOutCanvas = // holding the last coin throw or come it helps to not come onther coin befor the previous coins out
        this.coin[this.coin.length - 1].x +
          this.coin[this.coin.length - 1].width <
        0
          ? true
          : false;

      if (this.isTheLastCoinOutCanvas) {
        console.log("what's up") // if the coins is out side the canvas stop the coins movement
        this.isVisible = false;
      }
    }
  }
}

let underwaterShilp = null;

class UnderWaterShilp extends GameElement {
  constructor() {
    super(canvas.width - 100, fish.y - 50, 50, 100, "yellow");
    this.isHarm = true;
    this.x = canvas.width - 30;
    this.net = new Net(this.x, fish.y, 70, 60, true); // Array to hold the nets // but here this hold the array of spar 
    this.isVisible = false;
    this.frameCount = 0; // Track the frame count
    this.appearanceInterval = 300; // Interval to make the ship visible (adjust as needed)
    this.throwNetInterval = 120; // Interval to throw nets (adjust as needed)
    this.img = new Image();
    this.img.src = "/images/pngwing.com(6).png";
    // Create the specified number of nets
  }



  update() {
    // Increment the frame count
    this.frameCount++;

    if (this.net.isCollidingWith(fish)) {
      console.log("Fish caught!");

      return true;
    }
    if (this.frameCount % this.appearanceInterval === 0) {
      // Make the ship visible
      this.isVisible = true;
    }

    if (this.isVisible) {
      this.net.x -= gamespeed;

      const targetFishY = fish.y - 50;

      this.y =  fish.y-50 

      this.net.update(); //

      this.draw();

      if (frame % 590 === 0 && this.frameCount < 1000) {
        this.throwNet(false);
      }
    }

    if (frame > 1000 && this.net.x < 1) {
      console.log('update' + this.frameCount + '---- ');

      this.isVisible = false;
      this.frameCount = 0;
      this.throwNet(true);
    }
  }

  throwNet(resetTHeNets) {
    this.net.x = this.x;
    this.net.y = fish.y;
    resetTHeNets ? this.net.draw(true) : "";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

function updateUnderwaterShilp() {
  if (!underwaterShilp) {
    underwaterShilp = new UnderWaterShilp();
  }

  return underwaterShilp.update();
}
const colisionDetectedArrayInObstacle = [];

class Obstacle {
  constructor() {
    this.y = Math.random() * canvas.height + 100;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.Elements = [];

    let temp = Math.floor(Math.random() * 5) + 1;

    let randomY_axis = Math.floor(Math.random() * (300 - 70 + 1)) + 70;
    let randomY_axis2 = Math.floor(Math.random() * (400 - 20 + 1)) + 20;
    if (temp == 1 && fisherMan.style.display === "block") {
      this.Elements.push(new rodRope(this.x, randomY_axis, 60, 50, true));
      this.Elements.push(new rodRope(this.x, 0, 15, randomY_axis, false));
    } else if (temp == 2) {
      this.Elements.push(
        new ExplodingFish(this.x, randomY_axis2, 70, 50, true)
      );
    } else if (temp == 3) {
      this.Elements.push(new Octopus(this.x, randomY_axis2, 80, 80, true));
    } else if (temp == 4) {
      this.Elements.push(
        new Basket(this.x, randomY_axis2 - 100, 100, 75, true, true)
      );
    }
  }
  draw() {
    this.Elements.map(function (e) {
      return e.draw();
    });
  }
  update() {
    this.x -= gamespeed;
    if (fisherMan.style.display === "block")
      fisherMan.style.left = " 99%";
    this.Elements.forEach((e) => {
      e.x = this.x;
      if (e.isCollidingWith(fish) && e.isHarm) {
        console.log("Fish caught by obstacle!");
        colisionDetectedArrayInObstacle.push(true);
      } else colisionDetectedArrayInObstacle.push(false);
      if (e instanceof ExplodingFish) {
        if (e.isCloseTOfish(fish)) {
          e.width = 90;
          e.height = 70;
        } else {
          e.width = 70;
          e.height = 50;
        }
      }
    });
    this.draw();
    return colisionDetectedArrayInObstacle.some((e) => e == true);
  }
}
let collisionDetected = [];
const Prizefish = new Prize(fish.x, fish.y);
const PrizefishGold = new Prize(fish.x, fish.y);
function obstaclesHandeler(canvasWidth) {
  if (frame % 120 === 0) {
    obstacles.unshift(new Obstacle());
  }
  if (frame % 600 === 0) {
    Prizefish.isVisible = true;
    Prizefish.y = Prizefish.getRandomNumber(20, 380);
    Prizefish.iscoingCreated = false;
  }
  if (Prizefish.isVisible) {
    Prizefish.canvasWidth = canvasWidth;
    Prizefish.update();
  }

  // if (frame % 600 === 0) {
  //   PrizefishGold.isVisible = true;
  //   PrizefishGold.y = PrizefishGold.getRandomNumber(20, 380);
  //   PrizefishGold.iscoingCreated = false;
  // }
  // if (PrizefishGold.isVisible) {
  //   PrizefishGold.canvasWidth = canvasWidth;
  //   PrizefishGold.update(2);
  // }

  collisionDetected = obstacles.map(function (obstacle) {
    return obstacle.update();
  });
  if (obstacles.length > 10) {
    obstacles.pop(obstacles[0]);
  }
  return collisionDetected.some((e) => e == true) ? true : false;
}
