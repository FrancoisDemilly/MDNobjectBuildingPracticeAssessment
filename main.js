// From https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features

//dispalying score

var count = 0;
var displayScore = document.getElementById('score');


//set up canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//function to generate random number
function random(min, max){
  var num = Math.floor(Math.random()*(max-min)+1)+ min;
  return num;
}

//Shape constructor

function Shape(x, y, velX, velY, exists ) {
  this.x = x; //horizontal position
  this.y = y; //vertical position
  this.velX = velX; // honrizontal velocity
  this.velY = velY; // vertical velocity
  this.exists = exists;// should be a boolean (true/false).

};

//creating a ball constructor  inherit the methods defined on Shape prototype

function Ball(x, y, velX, velY, exists, color, size){
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
};

Ball.prototype = Object.create(Shape.prototype);

Ball.prototype.constructor = Ball;


//creating EvilCircle constructor inherit some methods defined on Shape

function EvilCircle(x, y, velX, velY, exists, color, size){
  Shape.call(this, x, y, exists);

  this.velX = 20;
  this.velY = 20;
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);

EvilCircle.prototype.constructor = EvilCircle;

//Drawing the ball

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
};


//Drawing the evilcircle

EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.stroke();
}

//adding an update() method to the Ball()'s prototype

Ball.prototype.update = function(){
  if(this.x + this.size >= width){
    this.velX = -(this.velX);
  }
  if(this.x - this.size <= 0){
    this.velX = -(this.velX);
  }
   if(this.y + this.size >= height){
    this.velY = -(this.velY);
  }
  if(this.y - this.size <= 0){
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;

};

Ball.prototype.collisionDetect = function(){
  for(var j = 0; j < balls.length; j++){
    if(!(this === balls[j])){
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx + dy*dy);

      if (distance < this.size + balls[j].size){
        balls[j].color = this.color = 'rgb(' + random(0,255) + ','
        + random(0,255) + ',' + random(0,255) + ')';
      }
    }
  }
}

//adding an checkBounds() method to the EvilCircle()'s prototype

EvilCircle.prototype.checkBounds = function(){
  if(this.x + this.size >= width){
    this.x -= this.size;
  }
  if(this.x - this.size <= 0){
    this.x += this.size;
  }
   if(this.y + this.size >= height){
    this.y -= this.size;
  }
  if(this.y - this.size <= 0){
    this.y += this.size;
  }
}

EvilCircle.prototype.setControls = function(){
  var _this = this;

  window.onkeydown = function(e){
      if(e.keyCode === 65){ //a left
        _this.x -= _this.velX;
      }
      else if(e.keyCode === 68){ //d right
        _this.x += _this.velX;
      }
      else if(e.keyCode === 87){ //w up
        _this.y -= _this.velY
      }
      else if(e.keyCode === 83){ //s down
        _this.y += _this.velY
      }


  }
}

EvilCircle.prototype.collisionDetect = function(){
  for(var k = 0; k < balls.length; k++){
    if(balls[k].exists === true){
      var dx = this.x - balls[k].x;
      var dy = this.y - balls[k].y;
      var distance = Math.sqrt(dx*dx + dy*dy);

      if (distance < this.size + balls[k].size){
        balls[k].exists = false;
        count --;
        displayScore.innerHTML = 'Ball Count: ' + count;
      }
    }
  }
}


//store all our balls
var balls = [];

//animating loop
function loop(){
ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
ctx.fillRect(0, 0, width, height);

while (balls.length < 25){
 var ball = new Ball(
  random(0, width),
  random(0, height),
  random(-7,7),
  random(-7,7),
  true,
  'rgb(' + random(0,255) + ','+ random(0,255) + ','+ random(0,255) + ')',
  random(10,20)
  );

balls.push(ball);
count ++;
displayScore.innerHTML = 'Ball Count: ' + count;

} //end of while

for(var i = 0; i < balls.length ; i++){
  if(balls[i].exists === true){
balls[i].draw();
balls[i].update();
balls[i].collisionDetect();
  }
}




requestAnimationFrame(loop)
evilCircle.draw();
evilCircle.checkBounds();
evilCircle.collisionDetect();

}//end of loop


//instantiating evilCircle
var evilCircle = new EvilCircle(
  random(0, width),
  random(0, height),
  true
  )
evilCircle.setControls()







//call the function once to get the animation started.
loop();
