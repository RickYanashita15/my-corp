// global variables
let canvas = null;
let ctx = null;

let TILESIZE = 64;
let TILESWIDE = 22;
let TILESHIGH = 9;
//variables of the dimensions of the canvas on the screen
let WIDTH = TILESWIDE * TILESIZE;
let HEIGHT = TILESHIGH * TILESIZE;
let BGCOLOR = "yellow";

let allSprites = [];
let allWalls = [];
let allCacti = [];
//empty arrays that will be filled and called later to sort through all sprites/walls/cacti and check for collisions

let keysDown = {};
// variable to check if a key is pressed down
let keysUp = {};

// utility function for displaying text 

function drawText(r, g, b, a, font, align, base, text, x, y) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = base;
    ctx.fillText(text, x, y);
}
//draws text in the canvas according to the rbga colors


/* ###################### Event listeners that wait for keyboard input ############### */
// comment above is used by good coders to alert them for important code like event listeners

addEventListener("keydown", function (event) {
    // keysDown = {};
    keysDown[event.key] = true;
    // console.log(event);
}, false);
//creates event listener for keydown, checks if key has been pressed

addEventListener("keyup", function (event) {
    keysUp[event.key] = true;
    delete keysDown[event.key];
    // console.log("the key that was removed " + event);
}, false);


/* ###################### String the we read to build the level ############### */
let gamePlan = `
....|.................
....|.................
.######...............
....................|.
.........####........|
..|..................|
..####......|...######
............|.........
######################`;
//string that is printed to create the canvas. different symbols represent different sprites/walls/cacti

// this is like a MOLD
class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.speed = 3;
        allSprites.push(this);
    }
    create(x, y, w, h) {
        return new Sprite(x, y, w, h)
    }
    collideWith(obj) {
        if (this.x + this.w >= obj.x &&
            this.x <= obj.x + obj.w &&
            this.y + this.h >= obj.y &&
            this.y <= obj.y + obj.h
        ) {
            return true;
        }
        //collision detection for all directions
    }
    // update method
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    //draws the sprite onto the canvas
}

class Wall extends Sprite {
    //subclass of Sprite because Sprite is a more general element
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = 'rgb(160, 82, 45)';
        allWalls.push(this);
    }
    create(x, y, w, h) {
        return new Wall(x, y, w, h)
    }
}

class Cactus extends Sprite {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = 'rgb(0, 255, 0)';
        allCacti.push(this);
    }
    create(x, y, w, h) {
        return new Cactus(x, y, w, h)
    }
    //creates cacti onto the canvas
}

class Player extends Sprite {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.speed = 2;
        this.gravity = 9.8;
        this.coFriction = 1.0;
        this.w = w;
        this.h = h;
        this.color = color;
        this.health = 200;
        this.jumpPower = 45;
        this.canJump = true;
        this.invulnerable = false;
        allSprites.push(this);
        //all the variables part of the Player, which is also a subclass of Sprite 
    }
    frictionX() {
        if (this.vx > 0.5) {
            this.vx -= this.coFriction;
        } else if (this.vx < -0.5) {
            this.vx += this.coFriction;
        } else {
            this.vx = 0;
        }
        //add friction to player when the player moves by subtracting or add coFriction
    }
    jump() {
        this.vy = -this.jumpPower;
        console.log(this.timesJumped);
        console.log(this.vy);
        //jump is disabled
    }
    input() {
        // if ("w" in keysDown) {
        //     this.y-=this.speed;
        // }
        if (" " in keysDown && this.canJump) {
            // this.vy = -1;
            this.canJump = false;
            this.jump();
            console.log("trying to jump...");
            //jump is disabled when canJump is false, and it is false when the player jumps. no doublejump
        }
        if ("a" in keysDown) {
            this.vx -= this.speed;
        }
        // if ("s" in keysDown) {
        //     this.y+=this.speed;
        // }
        if ("d" in keysDown) {
            this.vx += this.speed;
        }
    }
    // adding updates....
    update() {
        console.log(this.x);
        this.vy += this.gravity;
        this.input();
        this.frictionX();
        this.x += Math.floor(this.vx);
        this.y += this.vy;
        if (this.x > WIDTH - this.w) {
            this.x = WIDTH - this.w;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > HEIGHT - this.h) {
            this.y = HEIGHT - this.h;
            this.canJump = true;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Circle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.speed = 2;
    }
    update() {
        this.x += this.speed * Math.random() * 5;
        this.y += this.speed * Math.random() * 5;
        if (this.x > WIDTH || this.x < 0 || this.y < 0 || this.y > HEIGHT) {
            this.speed *= -1;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
        ctx.stroke();;
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}



function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];

    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    //prints the grid using 2d arrays

    return newGrid;
}

function readLevel(grid) {
    let startActors = [];
    for (y in grid) {
        for (x in grid[y]) {

            let ch = grid[y][x];

            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    let t = new type;
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE))
                }
                // console.log(startActors);
            }
        }

    }

}

const levelChars = {
    ".": "empty",
    "#": Wall,
    "|": Cactus
}; //declares which symbols correspond to which game sprites

console.log(makeGrid(gamePlan, 22));
readLevel(makeGrid(gamePlan, 22));
console.log(allWalls);
//makes all the canvas and the walls


// initialization function
// creates a div; sets attributes; appends body; creates canvas; puts canvas inside div
function init() {
    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("style", "border: 1px solid;" +
        "width:" + WIDTH + "px; " +
        "height:" + HEIGHT + "px; " +
        "background-color: " + BGCOLOR);
    document.body.appendChild(gameDiv);

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    try {
        gameDiv.appendChild(canvas);
        console.log("game initialized");
    } catch (e) {
        alert(e.message);
    }
    gameLoop();
}



let player = new Player(WIDTH / 2, HEIGHT / 2, TILESIZE, TILESIZE, 'rgb(0, 0, 255)');
console.log(allSprites);
// let spongeBob = new Sprite(10, 10, 30, 30, 'rgb(255, 255, 0)');
// let patrick = new Sprite(10, 30, 65, 65, 'rgb(255, 150, 150)');
// let squidward = new Sprite(70, 90, 20, 20, 'rgb(0, 200, 200)');
// let sandy = new Circle(70, 200, 25, 40, 'rgb(150, 75, 0)');

function update() {
    player.update();
    for (c of allCacti) {
        if (c.collideWith(player)) {
            console.log("ouch...");
            if (!player.invulnerable) {
                player.health-=10;
                player.invulnerable = true;
                setTimeout(() => {
                    player.invulnerable = false
                }, 2000);
            }

        }
    //update function is used to check if the player has collided, and to take away health if it does
    }
    for (w of allWalls) {
        if (w.collideWith(player)) {
            console.log("ouch...");
            player.y = w.y - player.h;
            player.vy = 0;
            player.canJump = true;
        }
        //sort through array of all walls to check if player has collided
    }

}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        i.draw();
    }
    drawText(0, 0, 0, 1, "20px Helvetica", "left", "top", "FPS: " + fps, TILESIZE / 2, TILESIZE / 2);
    drawText(255, 255, 255, 1, "20px Helvetica", "left", "top", player.health, TILESIZE / 2, 64);

}

let fps;
let then = performance.now();

function gameLoop() {
    // console.log('the game loop is alive!!!');
    now = performance.now();
    let delta = now - then;
    fps = (Math.ceil(1000 / delta));
    // totaltime = now - then;
    then = now;
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
    //game loops infinitely or until error crashes the html page
}