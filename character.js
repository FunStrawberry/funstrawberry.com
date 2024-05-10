class Character {
  constructor(name,positionVector, velocityVector, health, characterClass, sprite, orientationAngle) {
      this.name = name;
      this.positionVector = positionVector;
      this.velocityVector = velocityVector;
      this.health = health;
      this.characterClass = characterClass;
      this.sprite = sprite;
      this.weapons = [];
      this.maxSpeed = 10;
      this.orientationAngle = orientationAngle;
      this.meleeAngle = 0;
      this.radius = 25;
  }

draw() {

  let swordLength = 90;
  let swordWidth = 2;
  push();


    
    translate(this.positionVector.x, this.positionVector.y);
    push();
    rotate(this.orientationAngle);
    
    
    if (this.characterClass === 'warrior') {
      fill(255, 0, 0); // red for warrior
    } else if (this.characterClass === 'enemies') {
      fill(0, 0, 255); // blue for enemies
    } else {
      fill(128);
    }
    
    ellipse(0, 0, this.radius, this.radius);

    // rotate it all based on the orientationAngle

    // make the front half of the circle white
    fill(255);
    arc(0, 0, this.radius, this.radius, HALF_PI + PI, 3 * HALF_PI + PI);


    // draw a sword (triangle) in the direction of the meleeAngle
    if (this.characterClass == "warrior"){

      push();
      rotate(this.meleeAngle);
      fill(255, 215, 0); // gold for the sword

      triangle(0, -1 * swordWidth, 0, swordWidth, swordLength, 0);
      pop();
    }

    pop();
    fill(244,90);
    text(this.name, 10,10);
    pop();

    // draw a red dot at the end of the sword without using rotate, just math
  if (this.characterClass == "warrior") {
    let swordTipX = this.positionVector.x + swordLength * cos(this.meleeAngle + this.orientationAngle);
    let swordTipY = this.positionVector.y + swordLength * sin(this.meleeAngle + this.orientationAngle);
    fill(255, 0, 0); // red for the dot
    ellipse(swordTipX, swordTipY, 5, 5);
  }
}

updateCharacter(avoidCharacters){
  this.positionVector.add(this.velocityVector);
  
  if (avoidCharacters !== undefined){

    // if the new position is too close to any one of the avoidCharacters, then don't move
    avoidCharacters.forEach(c => {
      let differenceVector = p5.Vector.sub(this.positionVector, c.positionVector);
      let distance = differenceVector.mag();
      if (distance < this.radius + c.radius) {
        this.positionVector.add(p5.Vector.mult(this.velocityVector, -1));
        this.positionVector.add(p5.Vector.mult(differenceVector, 0.2));
      }
    });
  }

  // add friction
  this.velocityVector.mult(0.95);

  //this.orientationAngle = frameCount * 0.01;
}
}
