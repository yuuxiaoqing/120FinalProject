//our game settings
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:640,
    scale: {
        autocenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        defaut: 'arcade',
        arcade: {
            debug:true,
            gravity:{
                x:0,
                y:1000
            }
        }
    },
    scene:[Load,Menu,Play,End]
}

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
