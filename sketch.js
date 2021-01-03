
var monkey, monkey_img;
var ground, invisibleGround;

var stoneGroup, stoneImage,stone;
var bananaGroup, banana_img,banana;

var background_img;

var PLAY ;
var END ;
var gameState ;
var restart, restart_image
var gameOver,gameOver_image


function preload(){
  
 monkeyEndImg = loadImage ("Monkey_01.png");
  
monkeyImg =           loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  background_img = loadImage("jungle.jpg");
  restart_image = loadImage("restart.png");
  gameOver_image = loadImage("gameOver.png");
  
}

function setup() {
  
  createCanvas(600, 400);
  
   backGrnd = createSprite(200,200,20,20);
  backGrnd.addImage(background_img);
  
  backGrnd.x=backGrnd.width/2
  backGrnd.velocityX = -1
  
  backGrnd.scale = 1.2;
  
  monkey = createSprite(20,390,20,50);
  monkey.addAnimation("Monkey", monkeyImg);
  monkey.scale = 0.2;
  
  
  ground = createSprite(300,390,600,20);
  
  ground.visible = false
  

  stoneGroup = new Group();
  bananaGroup = new Group();
  survivalTime = 0;
  
gameOver = createSprite(300,100);
restart = createSprite(300,160);
  
gameOver.addImage("gameOver",gameOver_image);
gameOver.scale = 0.1 ;
restart.addImage("restart",restart_image);
restart.scale = 0.09;
  
gameOver.visible = false;
restart.visible = false;

}



function draw() {
  background(180);
   
 
  
  if(gameState===PLAY){
      
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
   backGrnd.velocityX = -(3+3*survivalTime/1000)
    
  if(keyDown("space")&& monkey.y >= 320) {
    monkey.velocityY = -14;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (backGrnd.x < 0){
    backGrnd.x = backGrnd.width/2;
  }
    
  spawnStone();
  spawnBanana();
  
    if (bananaGroup.isTouching(monkey)){
      survivalTime = survivalTime+50;
    }
    
      if(stoneGroup.isTouching(monkey)){
         gameState = "END";
      }
  }
  
  
   else if(gameState == "END") {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velocity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    backGrnd.velocityX=0;
    monkey.addImage("stop",monkeyEndImg);  
    
  
    //set lifetime of the game objects so that they are never destroyed
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
   }
  fill("black");
  textSize(20)
  
  
  monkey.collide(ground);
  drawSprites();
  
  text("Survival Time: "+ survivalTime, 390,50);

}



function spawnStone() {

 if (frameCount % 150 === 0) {
 stone = createSprite(600,360,40,10);
 stone.addImage("stone",stoneImg);
 stone.scale = 0.09;
stone.y = Math.round(random(300,360));
 stone.velocityX =-(6+3*survivalTime/1000)

      
     //assign lifetime to the variable
  stone.lifetime = 200;
     
    //add each cloud to the group
   stoneGroup.add(stone);
  }
  
}


function spawnBanana() {
  if(frameCount % 100 === 0) {
   banana = createSprite(600,360,10,40);
   banana.addImage("banana",bananaImg);
   banana.velocityX =-(6+3*survivalTime/1500)
  
  //assign scale and lifetime to the obstacle           
  banana.scale = 0.09;
  banana.lifetime = 300;
    
  //add each obstacle to the group
  bananaGroup.add(banana);
  }
}


function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  
  survivalTime = 0;
  
}