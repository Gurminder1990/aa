var bg,bgimg
var aeroplane,aeroplaneimg
var building1,building2,building3;
var obstacle,birdimg,bird
var topGround,bottomGround;



var fuel,fuelimg;
var score=0
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  bgimg = loadImage("assets/runway.jpg")
  aeroplaneimg = loadImage("assets/aeroplane.jpg.png");
  birdimg=loadAnimation("assets/bird1animation.png","assets/b2imageanimation.png");
  building1=loadImage("assets/burj.png")
  building2=loadImage("assets/3-2-eiffel-tower-png.png")
  fuelimg = loadImage("assets/fuel.png")
  building3=loadImage("assets/pyramid.png")
} 
function setup() {
  createCanvas(1400,700);
  aeroplane = createSprite(100,600,30,30) 
  aeroplane.addImage(aeroplaneimg)
  aeroplane.scale=0.5

  
  topGround = createSprite(700,10,1400,10)
  topGround.visible=false;

  bottomGround = createSprite(700,780,1400,10);
  bottomGround.visible=false;

  fuelGroup=new Group();
  topObstaclesGroup=new Group();
  bottomObstaclesGroup=new Group();
 
}
function draw() {
  background(bgimg);  
  if(gameState===PLAY){

  
  if(keyDown("UP_ARROW")){
  //aeroplane.velocityX=+3
        aeroplane.velocityY=-8
  
  }
  aeroplane.velocityY=aeroplane.velocityY+2;
 
  spawnFuel();
spawnBuildingsBottom();
  spawnObstaclesTop();
 

  if(topObstaclesGroup.isTouching(aeroplane) ||  bottomObstaclesGroup.isTouching(aeroplane)||
  aeroplane.isTouching(bottomGround)|| aeroplane.isTouching(topGround)){
    gameState===END;

  }}

  if(gameState===END){
    aeroplane.velocityY=0
    aeroplane.velocityX=0
    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    topObstaclesGroup.setLifetimeEach(-1);
  bottomObstaclesGroup.setLifetimeEach(-1);

    aeroplane.y=400;
  
  }
  
  drawSprites();
}
  

function spawnObstaclesTop(){
  if(frameCount%200===0){
    bird = createSprite(1200,200,20,20);
    bird.y=Math.round(random(10,150))
    bird.addAnimation("bird1",birdimg);
    bird.velocityX=-4
    bird.lifetime=675
    topObstaclesGroup.add(bird);
      }
}
function spawnFuel(){
  if (frameCount%200===0){
    fuel = createSprite(1400,600,20,20)
    
    fuel.addImage(fuelimg);
    fuel.y=Math.round(random(50,400))
    fuel.velocityX=-5
    fuel.lifetime=675
    fuel.scale=0.25
    fuelGroup.add(fuel)
    }
}
function spawnBuildingsBottom(){
  if(frameCount%200===0){
    buildings = createSprite(1200,750,20,20);
    buildings.velocityX=-2
   buildings.scale=0.3
    var rand = Math.round(random(1,3));
    switch(rand){ 
      case 1:buildings.addImage(building1)
        break;
      case 2:buildings.addImage(building2)
        break;
      case 3:buildings.addImage(building3)    
      break;
    default:break;
    }
    bottomObstaclesGroup.add(buildings)
  }
}