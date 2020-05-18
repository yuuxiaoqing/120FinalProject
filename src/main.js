//game settings
/*
PROTOTYPE REQUIREMENTS 5/17/2020

Basic Scene structure: 
You have defined Scenes (yes, plural) and some means to switch between them 
(e.g., via in-game actions, temporary key presses, etc.).  (10 points)

Player interaction: The player can interact with the game. 
You should have at least one primary mechanic operational. 
If you make a platformer, perhaps movement and jumping are implemented. 
If you make a narrative game, perhaps the dialog boxes are implemented. 
If you're making a hidden object game, perhaps the basic point/click verbs are implemented. 
Primary mechanics will vary from game to game. (10 points)

Temporary graphical assets: 
What good are core loops and interactions if there is nothing to look at? 
These should be assets *your team* creates, 
even if they are geometric primitives, quick doodles, or magazine cutouts. (10 points)

Temporary sound assets: 
Don't leave decisions about sound until the end of the design process. 
Sound is integral to making a game feel "real." 
Make sure your game makes some noise. (10 points)

Code hygiene: Be sure you're using good software engineering practices, including version control (git/GitHub), code commenting, code encapsulation (Scenes, prefabs, etc.), and other quality-of-life features (e.g., indenting, logical variable names, etc.). It doesn't have to be perfect, but a grader should be able to look at your GitHub repository and understand how your code is structured and how it works. (10 points)

*/
let config = {

    type: Phaser.CANVAS,
    pixelArt: true,
    //width: 640,
    width:960,
    height:640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },    
    scene:[Load,Menu,Play,End, Credit]
    //scene: [Play]
};


//Game Window stuff
let game = new Phaser.Game(config);
let width = game.config.width;
let height = game.config.height;
let centerX = width/2;
let centerY = height/2;

//debug key
let keyS;
let cursors = null;

//loading google text, taken from: https://phaser.io/examples/v2/text/google-webfonts
let WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND,createText,this);},
    google:{
        families: []
    }
}

//Player Objects
let mainPlayer;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack, playerDash, playerGuard;