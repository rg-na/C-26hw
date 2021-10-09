const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var targets = [];
var engine, world;
var canvas;
var targets;
var player, playerBase, playerArcher;
var computer, computerBase, computerArcher;
var playerArrows = [];
var computerArrows = [];
var playerArcherLife = 3;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );
  target1= new Target(width-300,330,50,200 )
  target2 = new Target(width-550, height-300 ,50, 200)
  }

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("HUNTER ARCHER", width / 2, 100);

  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(i, playerArrows);
  }

  playerBase.display();
  player.display();
  player.life();
  playerArcher.display();
  target1.display();
  target2.display();

//  for (var i = 0; i < targets.length; i++) {
//    showArrows(i, targets);
//  }

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function showArrows(index, arrows) {
  arrows[index].display();
  if (
    arrows[index].body.position.x > width ||
    arrows[index].body.position.y > height
  ) {
    if (!arrows[index].isRemoved) {
      arrows[index].remove(index, arrows);
    } else {
      arrows[index].trajectory = [];
    }
  }
}

function showTargets() {
  if (targets.length > 0) {
    if (
      targets[targets.length - 1] === undefined ||
      targets[targets.length - 1].body.position.x < width - 300
    ) {
      var positions = [40, 60, 70, 20];
      var position = random(positions);
      var target = new target(width, height - 100, 170, 170, position);

      targets.push(target);
    }

    for (var i = 0; i < targets.length; i++) {
      if (targets[i]) {
        Matter.Body.setVelocity(targets[i].body, {
          x: -0.9,
          y: 0
        });

        targets[i].display();
      } 
    }
  } else {
    var target = new target(width, height - 60, 170, 170, -60);
    targets.push(target);
  }
}
