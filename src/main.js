
/*
Burger Quest★
魔王様は大きなハンバーガーが食べたい！？
Angela Jiang, Xiao Qing Yu, Nikolas Sanchez
Notes:
------------------------------------------------------------------------------------------------------
Our game is a burger building adventure game. 
FINAL GAME REQUIREMENTS 6/07/2020
We believe our game fulfills all the requirements in terms of aesthetics and functionality.
A helpful tip for the graders:
Always double jump at the edge of the platform!! Play around with the jumps and double jumps
to get a feel for it. The map is pretty big, so don't get discouraged if you don't find an
ingredient monster immediately, they are there, we promise.

Our game runs without any critical errors.
Our game includes a title screen, a credits screen, an ending, and a return to menu that allows the player to play the game again.
We have tutorial screen for players to learn the control.
The game can be completed very easily.
Our chosen theme is "Scale", you play as a tiny chef gathering ingredients in a big big world to build a big big burger(big compared to you).
-----------------------------------------------------------------------------------------------------
PROTOTYPE REQUIREMENTS 5/17/2020
In our prototype, we have all of our nececessary scenes in place, 
the player's basic fighting mechanics and movement are implemented, 
and some placeholder burger art, enemy arts, and player art in place.
We've also got some basic sound sfx implemented. We will use our own tilesheet for our tilemap,
however, right now we are using the kenney sheet 1bit pack as placeholders.
*/

var sceneConfig = {
        
    pack: {
        preload: preload,
        create: create,
        files: [
            {type: 'image', key: 'load', url: 'assets/loadAssets/load04.png'}
        ]
    }
};
//game settings
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
    scene: [Boot, Load, Menu, Tutorial,Prologue, Play, GoodEnd, Credit, Info]
};

function preload(){

}

function create(){
    this.add.image(0,0, 'load').setOrigin(0.5);
}

//Game Window stuff
let game = new Phaser.Game(config);
let width = game.config.width;
let height = game.config.height;
let centerX = width/2;
let centerY = height/2;

//debug key
let keyS, buildBurgerButton, addBun, addMEAT, addLettuce;

//loading google text, taken from: https://phaser.io/examples/v2/text/google-webfonts
let WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND,createText,this);},
    google:{
        families: ['Caveat Brush','Gochi Hand', 'Nanum Pen Script', 'Loved by the King', 'VT323']
    }
}
//ingredients counter: can change here
let ingredientAmt = 4;

//The burger array
burgerArray = [];

//Player Objects
let mainPlayer;
let cursors = null;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack, playerDash, playerGuard;

//Map collisions
let ground, ground2;

//Music
let menuSong, gameSong, creditSong;