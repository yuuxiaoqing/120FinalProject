
/*
PROTOTYPE REQUIREMENTS 5/17/2020
Angela Jiang, Xiao Qing Yu, Nikolas Sanchez
Notes:
Our game is a burger building adventure game. 
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
    //scene:[Boot,Load,Menu,Tutorial,Play,End,Credit,Info]
    scene: [Boot, Load, Menu, Prologue, Tutorial, Play, GoodEnd, BadEnd, Credit, Info]
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
let keyS;

//loading google text, taken from: https://phaser.io/examples/v2/text/google-webfonts
let WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND,createText,this);},
    google:{
        families: ['Caveat Brush']
    }
}
//ingredients counter: can change here
let ingredientAmt = 5;

//Player Objects
let mainPlayer;
let cursors = null;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack, playerDash, playerGuard;