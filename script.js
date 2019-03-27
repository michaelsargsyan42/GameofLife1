// // Classes
// GRASS
class Grass {
    // Consctructor
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    // Choosing a cell
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // Grass' Multiplication
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}

// GRASSEATER
class GrassEater {
    // Constructor
    constructor(x, y, mult) {
        this.x = x;
        this.y = y;
        this.multiply = mult;
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1]
        ];

    }

    // Choosing a cell
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // GrassEaters' Moves
    move() {

        this.multiply--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 1) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            var grNew = new GrassEater(newCell[0], newCell[1], this.multiply)
            grassEaters.push(grNew)
            return true;
        } else return false;
    }
    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            this.multiply += 2;
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            for (var i in grassArr) {
                if (grassArr[i].x == newCell[0] && grassArr[i].y == newCell[1])
                    grassArr.splice(i, 1)
            }
            var grNew = new GrassEater(newCell[0], newCell[1], this.multiply)
            grassEaters.push(grNew)
            return true;
        } else return false;
    }

    // GrassEater's Multiplication
    mult() {
        if (this.multiply >= 20) {


            var emptyCells = this.chooseCell(1);
            var newCell = random(emptyCells);
            if (newCell) {
                document.getElementById("tt").innerHTML = "MORE GRASSEATERS";
                var gr = new GrassEater(newCell[0], newCell[1], 4);
                matrix[newCell[1]][newCell[0]] = 2;
                grassEaters.push(gr);

            }
            this.multiply = 4;
        }

    }
    // Other GrassEater's Resurrection
    res() {
        var emptyCells = this.chooseCell(13);
        var newCell = random(emptyCells);
        if (newCell) {
            document.getElementById("tt").innerHTML = "ZOMBIE";
            matrix[newCell[1]][newCell[0]] = 15;
            zombies.push(new Zombie(newCell[0], newCell[1], 100))
            for (var i in corpses) {
                if (corpses[i].x == newCell[0] && corpses[i].y == newCell[1])
                    corpses.splice(i, 1)
            }
        }
    }

}

// HOST
class Host {
    constructor(x, y, mult) {
        this.x = x;
        this.y = y;
        this.multiply = 5;
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1]
        ];
    }
    // Choosing a cell
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // Move
    move() {
        var emptyCells = this.chooseCell(0);
        emptyCells = emptyCells.concat(this.chooseCell(1));
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 1) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 4;
            var grNew = new Host(newCell[0], newCell[1], this.multiply)
            hosts.push(grNew)
            return true;
        } else return false;
    }

    // Host's Kill
    kill() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            document.getElementById("tt").innerHTML = "dead";
            matrix[newCell[1]][newCell[0]] = 13;
            corpses.push(new Corpse(newCell[0], newCell[1]));
            for (var i in grassEaters) {
                if (grassEaters[i].x == newCell[0] && grassEaters[i].y == newCell[1])
                    grassEaters.splice(i, 1)
            }
        }
    }
}

// CORPSE
class Corpse {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mult = 15;
    }
    die() {
        if (this.mult == 0) return true;
        else return false;
    }
}

// ZOMBIE
class Zombie {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.health = h;
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 15;
            var grNew = new Zombie(newCell[0], newCell[1], this.health)
            zombies.push(grNew)
            return true;
        } else return false;
    }
    attack() {
        var emptyCells = this.chooseCell(4);
        var newCell = random(emptyCells);
        if (newCell) {
            HostHealth -= 1;
            return true;
        } else return false;
    }
}
class Tree {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    immobilize() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 19;
            if (newCell[1] == this.y && newCell[0] < this.x) {
                var c = new immo(newCell[1], newCell[0], "left")
            } else if (newCell[1] == this.y && newCell[0] > this.x) {
                var c = new immo(newCell[1], newCell[0], "right")
            } else if (newCell[1] > this.y && newCell[0] == this.x) {
                var c = new immo(newCell[1], newCell[0], "bottom")
            } else if (newCell[1] < this.y && newCell[0] == this.x) {
                var c = new immo(newCell[1], newCell[0], "top")
            }
            immos.push(c);
            for (var i in grassEaters) {
                if (grassEaters[i].x == newCell[0] && grassEaters[i].y == newCell[1]) {
                    grassEaters.splice(i, 1)
                }
            }
        }
    }
}

// immo
class immo {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.m = 0;
        this.direction = direction;
    }

    move() {
        this.m++;
        if (this.direction == "bottom") {
            console.log("ALERT")

            if (this.x + 1 < matrix.length && (matrix[this.x + 1][this.y] == 0 || matrix[this.x + 1][this.y] == 1 || matrix[this.x + 1][this.y] == 2)) {
                matrix[this.x][this.y] = 0;
                this.x++;
                matrix[this.x][this.y] = 19;
            } else {
                matrix[this.x][this.y] = 0;
                for (var i in immos) {
                    if (immos[i].x == this.x && immos[i].y == this.y) {
                        immos.splice(i, 1)
                    }
                }
            }
        } else if (this.direction == "top") {
            console.log("ALERT")

            if (this.x - 1 >= 0 && (matrix[this.x - 1][this.y] == 0 || matrix[this.x - 1][this.y] == 1 || matrix[this.x - 1][this.y] == 2)) {
                matrix[this.x][this.y] = 0;
                this.x--;
                matrix[this.x][this.y] = 19;
            } else {
                matrix[this.x][this.y] = 0;
                for (var i in immos) {
                    if (immos[i].x == this.x && immos[i].y == this.y) {
                        immos.splice(i, 1)
                    }
                }
            }
        } else if (this.direction == "left") {
            console.log("ALERT")

            if (this.y - 1 >= 0 && (matrix[this.x][this.y - 1] == 0 || matrix[this.x][this.y - 1] == 1 || matrix[this.x][this.y - 1] == 2)) {
                matrix[this.x][this.y] = 0;
                this.y--;
                matrix[this.x][this.y] = 19;
            } else {
                matrix[this.x][this.y] = 0;
                for (var i in immos) {
                    if (immos[i].x == this.x && immos[i].y == this.y) {
                        immos.splice(i, 1)
                    }
                }
            }
        } else if (this.direction == "right") {
            console.log("ALERT")

            if (this.y + 1 >= 0 && (matrix[this.x][this.y + 1] == 0 || matrix[this.x][this.y + 1] == 1 || matrix[this.x][this.y + 1] == 2)) {
                matrix[this.x][this.y] = 0;
                this.y++;
                matrix[this.x][this.y] = 19;
            } else {
                matrix[this.x][this.y] = 0;
                for (var i in immos) {
                    if (immos[i].x == this.x && immos[i].y == this.y) {
                        immos.splice(i, 1)
                    }
                }
            }
        }

    }
}
// FUNCTIONS

function frame(a) {
    fr = a;
    frameRate(fr);
}

function alrt(text) {
    document.getElementById("tt").innerHTML = text;
}

function r(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function tsunami() {
    document.getElementById("tt").innerHTML = "TSUNAMI INCOMING";
    ts = true;
}

function volcano() {
    document.getElementById("tt").innerHTML = "ANCIENT GODS RAGE INCOMING";
    vol = true;
}

function summon() {
    if (vol == false && ts == false) {
        document.getElementById("tt").innerHTML = "GRASSEATER INCOMING";
        var x = 0,
            y = 0;
        while (matrix[y][x] != 1) {
            x = r(1, matrix.length - 2);
            y = r(1, matrix.length - 2);
        }

        var gr = new GrassEater(x, y, 8);
        grassEaters.push(gr);
    }
    else alert("Game is over, you can't summon any more grass eaters.")
}

function blockAlert() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (mouseX >= x * side && mouseX <= (x + 1) * side && mouseY >= y * side && mouseY <= (y + 1) * side) {
                localStorage.setItem("storageName", matrix[y][x]);
                window.open("info.html", "myWindow", 'width=300,height=300');
            }

        }
    }
}

// Life's Starting

// Tsunami
var ts = false;
//

// Volcano
var vol = false;
// 
//
// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function (time) {
        // x position follows a circle
        let w = 0.9; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function () {
        ellipse(this.posX, this.posY, this.size);
    };
}
//
function mousePressed() {
    noLoop();
}

function mouseReleased() {
    loop();
}
var winter;

function winterCall() {
    document.getElementById("myBody").style.backgroundColor = "lightblue";
    winter = true;
}

function summer() {
    document.getElementById("myBody").style.backgroundColor = "rgba(210,255,82,1)";
    winter = false;

}
var grassArr = [];
var grassEaters = [];
var hosts = [];
var corpses = [];
var zombies = [];
var immos = [];
var trees = []; // lol
var snowflakes = [];
var matrix = [
    [8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 4, 0, 0, 0, 20, 0, 0, 7],
    [0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7],
];
var hostile = new Host(10, 10)

var side = 60;
var p = 0, q = 0;
var HostHealth = 255;
var k = HostHealth;
var fr = 3;
var treesM = 0;

function setup() {
    frameRate(fr);
    var canvas = createCanvas(matrix[0].length * side, matrix.length * side);
    canvas.parent('test');
    background('#ffdf8e');


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y, 8);
                grassEaters.push(gr);
            }
            if (matrix[y][x] == 4) {
                var gr = new Host(x, y, 8);
                hosts.push(gr);
            }
            if (matrix[y][x] == 20) {
                var gr = new Tree(x, y);
                trees.push(gr);
            }

        }
    }


}

function draw() {
    var fr = parseInt(document.getElementById("myRange").value);

    frameRate(fr);
    if (winter) {
        frameRate(20);
    }
    else {
        frameRate(fr);
    }
    strokeWeight(2);
    // if(k == HostHealth)
    // {
    //     line(matrix.length*side+side, side, matrix.length*side+side+HostHealth, side);
    // }
    // else {
    //     stroke("#ffdf8e");
    //     line(matrix.length*side+side, side, matrix.length*side+side+HostHealth, side);

    //     alert("done")
    //     stroke("black");
    //     line(matrix.length*side+side, side, matrix.length*side+side+HostHealth, side);
    //     k = HostHealth;
    // }
    // //Health Bar
    // if(a == HostHealth)
    // {
    //     
    //     line(matrix.length*side+side, side, matrix.length*side+side+HostHealth, side);
    //     a = HostHealth;
    // }
    // else {
    //     // strokeWeight(5)
    //     // stroke("#ffdf8e")

    //     // stroke("black")
    //     // strokeWeight(2)
    // }


    document.getElementById("tt1").innerHTML = "health is " + HostHealth;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#00ff08");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 0) {
                fill("#ffdf8e");
                stroke("green")
                rect(x * side, y * side, side, side);
                stroke("green")
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("#f44274");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill("brown");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 6) {
                fill("#6d0606");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 7) {

                if (winter) {
                    fill("orange")
                }
                else {
                    var a = Math.floor(random() * 10);
                    if (a % 2 == 0) fill("#E42217");
                    else fill("#ff7411")
                }


                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 8) {
                var a = Math.floor(random() * 10);

                if (winter) {
                    fill("white")
                }
                else {
                    if (a % 2 == 0) fill("aqua");
                    else fill("#00f2ff")
                }



                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 9) {
                fill("black")
                rect(x * side, y * side, side, side);
            }
            // CORPSE - GRAVEYARD
            else if (matrix[y][x] == 13) {
                stroke("grey")
                fill("grey")
                rect(x * side, y * side, side, side, 30, 30, 0, 0);
                fill("#545454")
                stroke("#545454")
                rect(x * side + side * (2 / 5), y * side + side * (1 / 7), side * (1 / 10), side * (5 / 7), 30, 30, 0, 0);
                rect(x * side + side * (1 / 5), y * side + side * (2 / 7), side * (3 / 6), side * (1 / 14), 30, 30, 0, 0);
                stroke("green")
            }
            // Zombie
            else if (matrix[y][x] == 15) {
                var a = Math.floor(random() * 10);
                if (a % 2 == 0) fill("#09965b");
                else fill("#088953")
                rect(x * side, y * side, side, side);

            }
            // IMMOBOLIZED GRASSEATER
            else if (matrix[y][x] == 19) {
                var a = Math.floor(random() * 10);
                if (a % 2 == 0) fill("#EE82EE");
                else fill("#ffaaff")
                rect(x * side, y * side, side, side);

            }
            // RADIOACTIVE TREE LMAO
            else if (matrix[y][x] == 20) {

                fill("brown")
                stroke("brown")
                rect(x * side + side / 3, y * side + side / 2, side / 3, side / 2);
                fill("green")
                stroke("green")
                arc(x * side + side / 2, y * side + side / 2, side, side, radians(180), radians(360))


                // noFill();
                // circle(x*side+side/2, y*side+side/2, 20);

            }

        }
    }
    for (var i in hosts) {
        hosts[i].kill()
        if (hosts[i].move()) {
            hosts.splice(i, 1)
        }

    }
    for (var i in grassEaters) {

        grassEaters[i].mult();
        grassEaters[i].res();
        if (grassEaters[i].multiply == 0) {
            alrt("grasseater's dead")
            matrix[grassEaters[i].y][grassEaters[i].x] = 0
            grassEaters.splice(i, 1)
        } else {

            if (grassEaters[i].eat()) {
                grassEaters.splice(i, 1)
            } else if (grassEaters[i].move()) {
                grassEaters.splice(i, 1)

            }
        }

    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in trees) {
        trees[i].immobilize();
    }
    for (var i in zombies) {
        zombies[i].health--;
        if (zombies[i].health == 0) {
            matrix[zombies[i].y][zombies[i].x] = 0;
            zombies.splice(i, 1);

        } else if (zombies[i].attack()) console.log("attack");
        else if (zombies[i].move())
            zombies.splice(i, 1);
    }
    for (var i in corpses) {
        corpses[i].mult--;
        if (corpses[i].die()) {
            matrix[corpses[i].y][corpses[i].x] = 0;
            corpses.splice(i, 1);
        }
    }
    for (var i in trees) {
        stroke("violet")
        noFill();
        circle(trees[i].x * side + side / 2, trees[i].y * side + side / 2, (treesM - 4) % 10 * 5);
        circle(trees[i].x * side + side / 2, trees[i].y * side + side / 2, (treesM - 2) % 10 * 5);
        circle(trees[i].x * side + side / 2, trees[i].y * side + side / 2, treesM % 10 * 5);
        if (treesM == 9) treesM = 3;
        treesM++;
        stroke("green")

    }
    for (var i in immos) {
        console.log(immos[i].direction)
        immos[i].move();
    }

    // CATACLYSMS
    // VOLCANO
    for (var y = 1; y < matrix.length; y++) {
        for (var x = 1; x < matrix.length; x++) {
            if (matrix[y][x] == 7) {
                if (vol == true) {
                    if (matrix[y - 1][x] == 8 || matrix[y - 1][x] == 9)
                        matrix[y - 1][x] = 9
                    else matrix[y - 1][x] = 7

                    if (matrix[y][x - 1] == 8 || matrix[y - 1][x] == 9)
                        matrix[y][x - 1] = 9
                    else matrix[y][x - 1] = 7
                }
            }
        }
    }
    // TSUNAMI
    for (var y = matrix.length - 1; y >= 0; y--) {
        for (var x = matrix[y].length - 1; x >= 0; x--) {
            if (matrix[y][x] == 8) {
                if (ts == true) {
                    if (y < matrix.length - 1) {

                        matrix[y + 1][x] = 8;


                    }
                    if (x < matrix.length - 1) {

                        matrix[y][x + 1] = 8
                    }
                }
            }
        }
    }
    stroke("white")
    if (winter == true) {
        for (let i = 0; i < random(5); i++) {
            snowflakes.push(new snowflake());
        }

        for (let flake of snowflakes) {
            flake.update(60);
            flake.display();
        }
    }

    stroke("green")
}
