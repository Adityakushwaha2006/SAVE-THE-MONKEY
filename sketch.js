
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup,bananaGroup;
var survivaltime=0,score=0 ,back,back1,ground,PLAY=1,END=0,gamestate=PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
 back=loadImage("back.png");

  gamestate=PLAY;
}



function setup() {
  createCanvas(500,400)
  
  back1=createSprite(250,200,500,400)
  back1.addImage(back)
  
  

  monkey=createSprite(50,320,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.12
  
  ground=createSprite(200,360,500,2)

  

  survivaltime=0;
  score=0;
  
  foodGroup= new Group();
  bananaGroup= new Group();
  obstaclesGroup= new Group();
  
 
  
  
}


function draw() {
  //creating background
  background(220);
      
 //stop monkey from falling off screen
  monkey.collide(ground);
  

  
 if(gamestate===PLAY){
 
  monkey.visible=true;
 
//jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 270) {
        monkey.velocityY = -16;       
    }  
         
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8    
  //spawn obstacles
  spawnObstacles();  
  //spawn bananas
  spawnbanana();  
  //total score
 survivaltime=survivaltime+Math.round(frameCount/200)   
  if (obstaclesGroup.isTouching(monkey)){
   
    gamestate=END;
    
  }
   
    if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    monkey.scale=monkey.scale+0.03;
    score=score+1;
  }   
} 
 
  drawSprites();
  
  textFont("elephant");
  textSize(30);
  fill(255,255,250);   
  text("survival time :"+survivaltime,20,30);
  text("score:"+score,350,30)
  
   if(gamestate===END){
    text("GAMEOVER",150,150);
  text("press space to restart",100,180);
     textSize(20);
     text("YOUR SURVIVAL TIME:"+survivaltime,90,240)
     textSize(30);
     text("BANANS COLLECTED="+score,30,270)
  survivaltime=survivaltime;
     
    
 obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.visible=false;
    
     obstaclesGroup.setLifetimeEach(0);
      bananaGroup.setLifetimeEach(0);
    
   
    if(keyDown("space") ){
    survivaltime=0;
    gamestate=PLAY;
     
    }
 
}

}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,325,10,40);
   obstacle.velocityX=-6
obstacle.addImage(obstacleimage);
   obstacle.scale=0.2;
  obstaclesGroup.add(obstacle)
  obstacle.setCollider("rectangle",0,0,400,200);
   
    }
}
function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(150,300));
    banana.addImage(bananaimage);
    banana.scale = 0.1;
    banana.velocityX = -3;
   bananaGroup.add(banana);
  }

}
