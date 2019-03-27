

function setup() {
    frameRate(60);
    createCanvas(200, 200, WEBGL);
    p = localStorage.getItem("storageName");
    
}
function draw() {
    background("beige")
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    if (p == 1) {
        fill("#00ff08");
        box(100);
    }
    else if (p == 0) {
        fill("#ffdf8e");
        box(100);
    }
    else if (p == 2) {
        fill("yellow");
        box(100);
    }
    else if (p == 4) {
        fill("#f44274");
        box(100);
    }
    else if (p == 5) {
        fill("brown");
        box(100);
         
    }
    else if (p == 6) {
        fill("#6d0606");
        box(100);
         
    }
    else if (p == 8) {
        var a = Math.floor(random()*10);
        if(a%2 == 0) fill("aqua");
        else fill("#00f2ff")
        box(100);
    }
    
    
  }