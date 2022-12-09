var bg,bgImg;
var player, shooterImg, shooter_shooting, enemy_shooting, enemy12, shooting_bullet;
var enemyGroup;
var heart1Img, heart2Img, heart3Img;
var bullet = 70;
var gameState = "fight";
var explosion, lose, win;
var life = 3 ;
var score = 0;




function preload(){
  
  shooterImg = loadImage("assets/army_man1.png")
  shooter_shooting = loadImage("assets/army_2.png")
  enemy_shooting = loadImage("assets/army-enmy1.png")
  enemy12 = loadImage("assets/army-enmy2.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  shooting_bullet = loadImage("assets/bullet_image2.png")
  explosion = loadSound("assets/explosion.mp3")
  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")


  bgImg = loadImage("assets/background.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.3
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.7
   player.debug = true
   //player.setCollider("rectangle",0,0,300,300);

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
   
  bulletGroup = new Group();
  enemyGroup = new Group();
}
function draw() {
  background(0); 

  if(gameState === "fight"){ 

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  
    //go to gameState "lost" when 0 lives are remaining
    if(life===0){
      gameState = "lost"
      
    }
  
  
    //go to gameState "won" if score is 100
    if(score==100){
      gameState = "won"
      win.play();
    }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-15

}

if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+15

}

if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  bullet.addImage("bullet", shooting_bullet);
  bullet.scale = 0.2;
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullet = bullet-1
  explosion.play()
}

else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

/*player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}*/




if(keyWentDown("DOWN_ARROW")){
 
  player.addImage(shooter_shooting)
 
}


else if(keyWentUp("DOWN_ARROW")){
  player.addImage(shooterImg)
}

if(keyWentDown("UP_ARROW")){
 
  player.addImage(shooter_shooting)
 
}

else if(keyWentUp("UP_ARROW")){
  player.addImage(shooterImg)
}



if(bullet == 0){
  gameState = "bullet"
  lose.play()
}


if(enemyGroup.isTouching(bulletGroup)){
  for(var i=0;i<enemyGroup.length;i++){     
      
   if(enemyGroup[i].isTouching(bulletGroup)){
        enemyGroup[i].destroy()
        bulletGroup.destroyEach()
       explosion.play()

       score = score+2
        } 
  
  }
}



if(enemyGroup.isTouching(player)){
 
  lose.play();


for(var i=0;i<enemyGroup.length;i++){     
     
 if(enemyGroup[i].isTouching(player)){
      enemyGroup[i].destroy()
     
     life=life-1
      } 

}
}

enemy1();
  }
drawSprites();

textSize(20)
  fill("white")
text("Bullet = " + bullet,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  enemyGroup.destroyEach();
  player.destroy();

}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  enemyGroup.destroyEach();
  player.destroy();

}

else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  enemyGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


function enemy1(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    enemy = createSprite(random(500,1100),random(100,500),40,40)

    enemy.addImage(enemy12)
    enemy.scale = 0.5
    enemy.velocityX = -3
    enemy.debug= true
    //enemy.setCollider("rectangle",0,0,400,400)
   
    enemy.lifetime = 400
   enemyGroup.add(enemy)
  }
}