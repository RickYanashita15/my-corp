/*

User Interface discussion...

How do you interact with the screen?

Clicking on buttons
Keyboard
Images on the screen
Mouse
Finger

*/

// let user = prompt("choose: rock, paper, or scissors...");
let user;
let choices = ["rock", "paper", "scissors"];

function userChoice(choice) {
    user = choice;
    compare();
}

function randNum(things){
    return Math.floor(Math.random() * things.length);
}

function cpuChoice(){
    //cpu will be the same value all the time
    return choices[randNum(choices)];
}

function drawImg(pic, width, height, alt, id){
    var x = document.createElement("IMG");
    x.setAttribute("src", pic);
    x.setAttribute("width", width);
    x.setAttribute("height", height);
    x.setAttribute("alt", alt);
    // document.body.appendChild(x);

    document.getElementById(id).appendChild(x);
}
// I got this from https://www.javascripttutorial.net/javascript-dom/javascript-removechild/
function removeChild(id){
    let identity = document.getElementById(id);
    while (identity.firstChild) {
        identity.removeChild(identity.firstChild);
    }
}

// console.log("the user choice is " + user);
// console.log("the randnum is " + randnum);
// console.log("the computer choice is " + cpu);

function compare(){
    let cpu = cpuChoice();

    removeChild('player');
    removeChild('cpu'); 

    if (user == "rock"){
        drawImg("_images/rock.jpg", "100", "100", "rock", "player");
    }
    if (user == "paper"){
        drawImg("_images/paper.png", "100", "100", "paper", "player");
    }
    if (user == "scissors"){
        drawImg("_images/scissors.png", "100", "100", "scissors", "player");
    }
    if (cpu == "rock"){
        drawImg("_images/rock.jpg", "100", "100", "rock", "cpu");
    }
    if (cpu == "paper"){
        drawImg("_images/paper.png", "100", "100", "paper", "cpu");
    }
    if (cpu == "scissors"){
        drawImg("_images/scissors.png", "100", "100", "scissors", "cpu");
    }
    if (user == "rock" && cpu == "scissors" ||
    user == "paper" && cpu == "rock" ||
    user == "scissors" && cpu == "paper") {
    console.log("user wins the game...");
    }
    else if (cpu == "rock" && user == "scissors" ||
    cpu == "paper" && user == "rock" ||
    cpu == "scissors" && user == "paper") {
    console.log("user loses the game...");
    }
    else if (cpu == user){
    console.log("tie game...");
    }
    else {
    console.log("something went wrong");
    }
}