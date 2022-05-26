var playerIMG,shooter2,shooter3,backgroundIMG;
var player;
var zombie;
var zombieIMG;
var heart1IMG,heart2IMG,heart3IMG;
var heart1,heart2,heart3;
var zombieGroup,bulletGroup;
var bullet;
var bulletIMG;
var count = 3;
var gameState = "fight"
var score = 0
var winSound,shootSound,gameOver

function preload(){
playerIMG = loadImage("assets/shooter_1.png");
shooter2 = loadImage("assets/shooter_2.png");
shooter3 = loadImage("assets/shooter_3.png");
backgroundIMG =loadImage("assets/bg.jpeg"); 
zombieIMG = loadImage("assets/zombie.png");
heart1IMG = loadImage("assets/heart_1.png");
heart2IMG = loadImage("assets/heart_2.png");
heart3IMG = loadImage("assets/heart_3.png");
bulletIMG = loadImage("assets/bullet.jpg");
winSound = loadSound("assets/win.mp3");
shootSound = loadSound("assets/explosion.mp3");
gameOver = loadSound("assets/gameOver.wav");

}

function setup(){
createCanvas(windowWidth,windowHeight);

player = createSprite(windowWidth-1150,windowHeight-300,50,50);
player.addImage(playerIMG);
player.scale = 0.3;
//player.debug = false;

heart1 = createSprite(1300,50,20,20);
heart1.addImage(heart1IMG);
heart1.scale = 0.3
heart1.visible = false;

heart2 = createSprite(1300,50,20,20);
heart2.addImage(heart2IMG);
heart2.scale = 0.3
heart2.visible = false;

heart3 = createSprite(1300,50,20,20);
heart3.addImage(heart3IMG);
heart3.scale = 0.3
heart3.visible = true;


bulletGroup = new Group();
zombieGroup = new Group();
}

function draw(){
//background(backgroundIMG)
image(backgroundIMG,0,0,windowWidth,windowHeight);
//backgroundIMG.x = backgroundIMG.width /2;
//background.velocityX = 4;
textSize(20);
fill("red");
text("Score::"+score,1300,100)
if(gameState === "fight"){


//move the player up and down
if(keyDown("UP_ARROW")&& player.y > 0 ){
  player.y = player.y-10

}

if(keyDown("DOWN_ARROW")&& player.y < windowHeight){
  player.y = player.y+10
}

if(keyDown("RIGHT_ARROW")){
  player.x = player.x+10
}

if(keyDown("LEFT_ARROW")){
  player.x = player.x-10
}

//shooter shooting on pressing space
if(keyWentDown("space")){
  player.addImage(shooter3)
  bullet = createSprite(player.x+50,player.y,10,10)
  bullet.addImage(bulletIMG);
  bullet.velocityX = 10;
  bullet.scale = 0.01;
  bulletGroup.add(bullet);
  shootSound.play();
}if(keyWentUp("space")){
  player.addImage(playerIMG)
}

for(var i=0;i<zombieGroup.length;i++){
if(player.isTouching(zombieGroup[i])){
  player.addImage(playerIMG)
  count = count-1;
  zombieGroup[i].destroy()
  if(count === 2){
    heart3.visible = false;
    heart2.visible = true;
  }

  if(count === 1){
    heart2.visible = false;
    heart1.visible = true;
  }

  if(count === 0){
    heart1.visible = false;
    player.destroy(); 
    gameState = "lost"
    gameOver.play();
  }
}

}
for(var i=0;i<zombieGroup.length;i++){
  if(bulletGroup.isTouching(zombieGroup[i])){
    score = score+1
    zombieGroup[i].destroy();
    bulletGroup.destroyEach();
    if(score === 30){
      gameState = "Won"
      winSound.play();
    }
  }
}

}

if(gameState === "lost"){
  textSize(100);
  fill("yellow");
  text("You Lost The Game",400,400)
  zombieGroup.destroyEach();
}
if(gameState === "Won"){
  textSize(40);
  fill("yellow")
  text("Congratulation... You Won The Game",300,300)
  zombieGroup.destroyEach();
}

enemy();

drawSprites();
}

function enemy(){
if(frameCount % 50 === 0){
  zombie = createSprite(random(900,1600),random(400,600),50,50);
  zombie.addImage(zombieIMG);
  zombie.scale = 0.15;
  zombie.velocityX = -3;
 // zombie.debug = true;
  zombie.lifetime = 400;
  zombieGroup.add(zombie);
}
}
 