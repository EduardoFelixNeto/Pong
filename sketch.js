// Variables from circle
let posXBall = 300;
let posYBall = 200;
let diameterBall = 20;
let speedXBall = 10;
let speedYBall = 10;
let radiusBall = diameterBall/2;

// Variables from rect
let posXRect = 5;
let posYRect = 200;
let widthRect = 10;
let heightRect = 50;


// Variables from rect Enemy
let posXRectEnemy = 585;
let posYRectEnemy = 200;
let speedYRectEnemy;
let chanceToWrong = 0;

// Variables collide2D
let collide = false;

// Variables Score
let myScore = 0;
let enemyScore = 0;

// Variable songs
let hit;
let points;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  points = loadSound("ponto.mp3");
  hit = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  showBall();
  moveBall();
  verifyCollisionBorder();
  showRect(posXRect,posYRect);
  showRect(posXRectEnemy,posYRectEnemy);
  moveRect();
  moveRectEnemy();
  verifyCollisionRect(posXRect,posYRect);
  verifyCollisionRect(posXRectEnemy,posYRectEnemy);
  getScore();
  getGoal();
}

function showRect(x,y){
  rect(x,y,widthRect,heightRect);
}

function showBall(){
  circle(posXBall,posYBall,diameterBall);
}

function moveBall(){
  posXBall += speedXBall;
  posYBall += speedYBall;
}

function moveRect(){
  if (keyIsDown(UP_ARROW))  {
    posYRect -= 10;
  }
  if (keyIsDown(DOWN_ARROW))  {
    posYRect += 10;
  }
}

function moveRectEnemy(){
  speedYRectEnemy = posYBall - posYRectEnemy - widthRect / 2 - 15;
  posYRectEnemy += speedYRectEnemy + chanceToWrong;
  getChanceToWrong();
}

function verifyCollisionBorder(){
  if(posXBall + radiusBall > width || posXBall - radiusBall < 0){
    speedXBall *= -1;
  }
  if(posYBall + radiusBall > height || posYBall - radiusBall < 0){
    speedYBall *= -1;
  }
}

function verifyCollisionRect(){
  if(posXBall - radiusBall < posXRect + widthRect && posYBall - radiusBall < posYRect + heightRect && posYBall + radiusBall > posYRect){
    speedXBall *= -1;
  }
}

function verifyCollisionRect(x,y){
  collide = collideRectCircle(x, y, widthRect, heightRect, posXBall, posYBall, radiusBall);
  if(collide){
    speedXBall *= -1;
  }
}

function getScore(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(230,10,40,20);
  fill(255);
  text(myScore,250,26);
  fill(color(255,140,0));
  rect(330,10,40,20)
  fill(255);
  text(enemyScore, 350,26);
}

function getGoal(){
  if(posXBall > 590){
    myScore += 1;
  }
  if(posXBall < 10){
    enemyScore += 1;
  }
}

function getChanceToWrong() {
  if (enemyScore >= myScore) {
    chanceToWrong += 1
    if (chanceToWrong >= 39){
    chanceToWrong = 40
    }
  } else {
    chanceToWrong -= 1
    if (chanceToWrong <= 35){
    chanceToWrong = 35
    }
  }
}