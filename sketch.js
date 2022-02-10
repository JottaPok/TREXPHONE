var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var nuvem
var obstaculo

var estadodejogo
var score;
var play = 1
var gameover = 0

var youlose
var youloseimage
var restartimage
var restart

var jump
var die
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  youloseimage = loadImage ("gameOver.png")
  restartimage = loadImage ("restart.png")
  
  jump = loadSound ("jump.mp3")
  die = loadSound ("die.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  trex.debug = false
  trex.setCollider("rectangle",0,0,80,80)

  ground = createSprite(200,height/2,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;


  youlose = createSprite (width/2, 100, 0, 0)
  restart = createSprite (width/2, 165, 0, 0)

  youlose.addImage (youloseimage)
  restart.addImage (restartimage)
  
  youlose.visible = false;
  restart.visible = false;

  restart.scale = 0.7
  nuvem = new Group()
  obstaculo = new Group()

  invisibleGround = createSprite(200,height/2 + 10,400,10);
  invisibleGround.visible = false;
  
  estadodejogo = play

  console.log("Olá" + 5);
  
  score = 0;
}

function draw() {
  background("pink");
  text("Pontuação: "+ score, 500,50);

  


  if(estadodejogo == play){
    score = score + Math.round(getFrameRate()/60);
    if(trex.collide(invisibleGround)&& touches.length>0) {
      trex.velocityY = -14;
      jump.play ()
  
    }
    if(trex.isTouching(obstaculo)){
      estadodejogo = gameover
      die.play ()
    }
    spawnObstacles();
    spawnClouds();
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
       ground.x = ground.width/2;
    }
    ground.velocityX = -(5.4 + score / 100);
  }
  
  if(estadodejogo == gameover){
    ground.velocityX = 0
    obstaculo.setVelocityXEach(0)
    nuvem.setVelocityXEach(0)
    trex.velocityY = 0
    trex.changeAnimation("collided")
    youlose.visible = true
    restart.visible = true
    obstaculo.setLifetimeEach (-1)
    nuvem.setLifetimeEach (-1)

   if(touches.length>0){
     estadodejogo = play
     obstaculo.destroyEach()
     nuvem.destroyEach()
     trex.changeAnimation ("running")
     youlose.visible = false
     restart.visible = false
     score = 0
     obstaculo.setVelocityXEach(-5.4)
   }

  }
    trex.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width,height/2 - 10,10,40);
   obstacle.velocityX = ground.velocityX
   obstaculo.add(obstacle)
   
    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo             
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 }
}




function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    nuvem.add(cloud)
    
     //atribuir vida útil à variável
    cloud.lifetime = 200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  

}
