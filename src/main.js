//our game settings
let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 640,
    height:640,
    scale: {
        autocenter: Phaser.Scale.CENTER_BOTH
    },
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug:true,

        }
    },
    scene:[Load,Menu,Play,End, Credit]

    //scene:[Play]
};

const game = new Phaser.Game(config);
const width = game.config.width;
const height = game.config.height;
const centerX = width/2;
const centerY = height/2;

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
