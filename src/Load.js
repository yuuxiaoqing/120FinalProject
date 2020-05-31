// Our Load scene

class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }
    preload(){
        //Loads sounds
        this.load.audio('jump', './assets/Jump.wav');
        this.load.audio('hit', './assets/Lose.wav');

        //Player Sprites
        this.load.image('attackHitbox', './assets/attackHitbox.png');
        this.load.image('parryHitbox', './assets/parryHitbox.png');
        this.load.image('detectionHitbox', './assets/detectionHitbox.png');
        this.load.image('playerPrototype','./assets/player_prototype.png');
        this.load.image('enemytemp', './assets/enemytemp.png');

        //burger layer sprites -> remember to turn it into a spritesheet
        this.load.image('plate','./assets/plate.png');
        this.load.image('bun1','./assets/bun1.png');
        this.load.image('meat','./assets/meat.png');
        this.load.image('lettuce','./assets/lettuce.png');
        this.load.image('bun2','./assets/bun2.png');

        //Ingredient Sprites
        this.load.image('bunsDroppable','./assets/bunsDroppable.png');
        this.load.image('burgerDroppable','./assets/burgerDroppable.png');
        this.load.image('lettuceDroppable','./assets/lettuceDroppable.png');




    }
    create(){
        this.cameras.main.setBackgroundColor(0xE6B61C);
        //console.log(this.cameras.main);
        this.add.text(centerX, centerY - 200, 'LOAD SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff', align:"center"}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.add.text(centerX, centerY - 100, 'by Angela, Xiao Qing, & Niko', {fill: '#fff', align:'center'}).setOrigin(0.5);
        this.add.text(centerX, centerY, '----in progress burger----', {fill: '#fff', align:'center'}).setOrigin(0.5);
        this.add.text(centerX, centerY +40, 'this.cameras.main.startFollow(burger, 0.25,0.25);', {fill: '#fff', align:'center'}).setOrigin(0.5);
    }   
    update(){

        this.scene.start('menuScene');

    }
}