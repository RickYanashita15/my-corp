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
let winCount = 0;
let lossCount = 0;
let tieCount = 0; 
let winPercent; 
// will be calculated when the function is running
let totalCount = 0; 
// declared extra variables for the Counts of each win,loss,tie to create a scoreboard/tracker



function userChoice(choice) {
    user = choice;
    // whatever the user chooses, that will become var user. Will be run through compare() function
    compare();
}

function randNum(things){
    return Math.floor(Math.random() * things.length);
    // spits out a random number from within the bounds of the method
    // the method uses things.length to adapt to any length of rock, paper, scissors. gun, pool noodle, etc. 
}

function cpuChoice(){
    //cpu will be the same value all the time
    return choices[randNum(choices)];
}

function drawImg(pic, width, height, alt, id){
    // this function just draws the images of rock,paper,scissors
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
//purpose of the function is to remove the old image of the computer/player's choices to declutter the game screen
    }
}

// console.log("the user choice is " + user);
// console.log("the randnum is " + randnum);
// console.log("the computer choice is " + cpu);

function compare(){
    let cpu = cpuChoice();

    removeChild('player');
    removeChild('cpu'); 

    //for each scenario, the compare() function draws the corresponding image
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

    //the computer operates through these if statements to find which result occured
    if (user == "rock" && cpu == "scissors" ||
    user == "paper" && cpu == "rock" ||
    user == "scissors" && cpu == "paper") {
    console.log("user wins the game...");
    //add +1 for every win the user gets, add to the winCount
    winCount++; 
    // winCount is the name of the id, called in the rps.html file.
    // when winCount is called, the winCount variable is called using span function taken from StackOverflow
    document.getElementById("winCount").innerHTML = winCount;
    //above line of code picked up from StackOverflow
    //
    }
    else if (cpu == "rock" && user == "scissors" ||
    cpu == "paper" && user == "rock" ||
    cpu == "scissors" && user == "paper") {
    console.log("user loses the game...");
    lossCount++; 
    document.getElementById("lossCount").innerHTML = lossCount;

    }
    else if (cpu == user){
    console.log("tie game...");
    tieCount++; 
    document.getElementById("tieCount").innerHTML = tieCount;

    totalCount++; 
    winPercent = winCount/totalCount; 
    // calculate winPercent by dividing win count by the total number of turns of rps taken
    document.getElementById("winPercent").innerHTML = winPercent;

    }
    else {
    console.log("something went wrong");
    }
}