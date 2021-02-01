var monkey , monkey_running,obstacle,obstacleGroup;
var jungleImage;
var score=0;
var PLAY=1;
var END=0;
var woman;
var backgr, ground;
var coin,coinGroup;
var gameState=PLAY;
function preload(){
monkey_running = loadAnimation("sprites/sprite_0.png","sprites/sprite_1.png","sprites/sprite_2.png","sprites/sprite_3.png","sprites/sprite_4.png","sprites/sprite_5.png","sprites/sprite_6.png","sprites/sprite_7.png","sprites/sprite_8.png")
obstaceImage = loadImage("sprites/obstacle.png");
 jungleImage=loadImage("sprites/jungle.jpg");
womenImage=loadImage("sprites/woman.png");
coinImage=loadImage("sprites/coin.png")

} 


function setup(){
    createCanvas(800,400);

   
    backgr=createSprite(0,0,800,400);
    backgr.addImage(jungleImage);
    backgr.scale=1.6;
  backgr.velocityX=-3;

    
  
    monkey=createSprite(100,300,20,20)
    monkey.addAnimation("running",monkey_running)
    monkey.scale=0.2;
 
  
    woman=createSprite(350,300,60,40)
    woman.addImage(womenImage)
   // woman.velocityX=1
  woman.debug=true;
  woman.setCollider("rectangle",0,0,50,120);
   // obstacleGroup = createGroup();
    ground = createSprite(400,350,900,10);
    ground.shapeColor=("brown");
    ground.visible=false;
 coinGroup=new Group();
}

function draw(){

background("black");
if(gameState===PLAY){


if (backgr.x < 0){
    backgr.x = backgr.width/2;
  }
  // if (ground.x < 0){
  //   ground.x = ground.width/2;
  //  }
  monkey.collide(ground);
woman.collide(ground);


    if(keyDown("space")){
     woman.velocityY = -10;
      }
      woman.velocityY+=0.8;
      if(coinGroup.isTouching(woman)){
       coinGroup.destroyEach();
       score=score+1;
      }
  monkey.velocityY = monkey.velocityY+0.8
  if(monkey.isTouching(woman)){
    gameState=END;
     monkey.velocityX=0;
     //score=0;
  }

  if(!(monkey.isTouching(woman))){
monkey.velocityX=0.8;
  }
  spawnCoins();

  drawSprites();
  stroke("blue");
  textSize(20);
  fill ("blue");
  text("Score : "+score,70,50);
}
if(gameState===END){
score=0;
stroke("blue")
textSize(30);
text("game End",200,100)
monkey.velocityX=0;
woman.velocityY=0;
ground.velocityX=0;
}

 
}
  
  function spawnCoins(){
if(frameCount%60===0){
  coin=createSprite(400,300,20,40);
  coin.addImage(coinImage);
  coin.scale=1;
  coin.velocityX=-3;
  coin.y=random(10,200)
  coin.lifetime=100;
  coinGroup.add(coin);
}

  }