//game settings
let config = {

    type: Phaser.CANVAS,
    width:960,
    height:640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },    
    scene:[Load,Menu,Play,End, Credit]
};


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
        families: []
    }
}

//Player Objects
let mainPlayer;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack;