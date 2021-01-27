//Create variables here
var dog,happyDog;
var database;
var foodStock;
var foodS;
function preload()
{
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 700);
  
  database = firebase.database();
 console.log(database);
  dog = createSprite(400,400);
  dog.scale=0.4;
  dog.addImage(dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function readStock(data){
  foodS = data.val();
  console.log("foodS value "+ foodS);
}
function draw() {  

  background(46,139,87);
  drawSprites();

  textSize(20);
  fill("white");
  text("Press Up Arrow Key to feed the Dog !", 50,50);
  if(foodS !=undefined){
    text("Milk Bottles left : " + foodS,50,80);
  }
  //add styles here

  

  if(keyWentDown(UP_ARROW)){
    if(foodS != undefined){
      writeStock(foodS);
      dog.addImage(happyDogImage);
    }
  }
}

function writeStock(x){
  console.log("In write stock "+x);
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').set({
    Food : x
  })
}



