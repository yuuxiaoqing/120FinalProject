// Our Load scene
class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
        
    }
    
    preload(){
        //Loads sounds
        this.load.audio('jump', './assets/sounds/jump.wav');
        this.load.audio('playerAttack', './assets/sounds/playerAttack.wav');
        this.load.audio('playerGuard', './assets/sounds/playerGuard.wav');
        this.load.audio('playerReset', './assets/sounds/playerReset.wav');
        this.load.audio('playerHurt', './assets/sounds/playerHurt.wav');
        this.load.audio('enemyDetection', './assets/sounds/enemyDetection.wav');
        this.load.audio('enemyDie', './assets/sounds/enemyDie.wav');
        this.load.audio('mkhappy', './assets/sounds/mkhappy.wav');
        this.load.audio('pickup', './assets/sounds/pickup.wav');


        //Loads Music
        this.load.audio('menuSong', './assets/songs/CupidsRevenge.mp3');
        this.load.audio('gameSong', './assets/songs/LeGrandChase.mp3');
        this.load.audio('endingSong', './assets/songs/MidnightTale.mp3');

        //Player Sprites
        this.load.image('attackHitbox', './assets/playerSprites/attackHitbox.png');
        this.load.image('parryHitbox', './assets/playerSprites/parryHitbox.png');
        this.load.image('playeridle','./assets/playerSprites/playeridle.png');
        this.load.image('playerguard','./assets/playerSprites/playerguard.png');
        this.load.spritesheet('playerwalk', './assets/playerSprites/playerwalk.png', {
            frameWidth: 32,
            frameHeight: 32,
            endframe: 3
        });


        //burger layer sprites -> remember to turn it into a spritesheet
        this.load.image('plate','./assets/burgerSprites/plate.png');
        this.load.image('bun1','./assets/burgerSprites/bun1.png');
        this.load.image('meat','./assets/burgerSprites/meat.png');
        this.load.image('lettuce','./assets/burgerSprites/lettuce.png');
        this.load.image('bun2','./assets/burgerSprites/bun2.png');

        //Ingredient Sprites
        this.load.image('bunsDroppable','./assets/burgerSprites/bunsDroppable.png');
        this.load.image('burgerDroppable','./assets/burgerSprites/burgerDroppable.png');
        this.load.image('lettuceDroppable','./assets/burgerSprites/lettuceDroppable.png');

        //Enemy Sprites
        this.load.image('enemytemp','./assets/enemySprites/enemytemp.png');

        this.load.image('bunleft','./assets/enemySprites/bunleft.png');
        this.load.image('bunright','./assets/enemySprites/bunright.png');
        this.load.image('meatleft','./assets/enemySprites/meatleft.png');
        this.load.image('meatright','./assets/enemySprites/meatright.png');
        this.load.image('lettuceleft','./assets/enemySprites/lettuceleft.png');
        this.load.image('lettuceright','./assets/enemySprites/lettuceright.png');

        this.load.spritesheet('bunidle.png', './assets/enemySprites/bunidle.png.png', {
            frameWidth: 128,
            frameHeight: 128,
            endframe: 3
        });
        this.load.spritesheet('meatidle.png', './assets/enemySprites/meatidle.png.png', {
            frameWidth: 128,
            frameHeight: 128,
            endframe: 3
        });
        this.load.spritesheet('lettuceidle.png', './assets/enemySprites/lettuceidle.png.png', {
            frameWidth: 128,
            frameHeight: 128,
            endframe: 3
        });

        this.load.image('detectionHitbox', './assets/enemySprites/detectionHitbox.png');
        

        //Loads the tilesheet
        this.load.spritesheet('groundsheet', './assets/tilemaps/groundsheet.png',{
            frameWidth:32,
            frameHeight:32,
        });

        //Loads the levels
        this.load.tilemapTiledJSON('tutorialLevel', './assets/tilemaps/tutorial01.json');
        this.load.tilemapTiledJSON('mainLevel', './assets/tilemaps/gameMap.json');

        //Load the story bg, info bg, and credit bg
        this.load.image('storybg', "./assets/background/storybg.png");
        this.load.image('infobg', "./assets/background/infobg.png");
        this.load.image('creditbg', "./assets/background/creditbg.png");

        //title scene assets
        this.load.image('title', './assets/background/titlebg.png');
        //HUD assets
        this.load.image('hud', './assets/background/hud2.png');


        //text config
        let textConfig = {
            fontFamily: 'VT323',
            fill: '#ffffff',
            fontSize: '40px',
        }
        this.add.text(width/2, height, "LOADING", textConfig);
        //progress bar replace with a burger //check out Asset Bonanza// boot strap load, get something on 
        //screen before loading the other assets
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(330,270,320,50);

        var loadMessage =  this.add.text(centerX,centerY+100,"Loading.");
        
        this.load.on('progress', function(value){
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(340,280,300*value, 30);
            loadMessage.setText("Loading..").setOrigin(0.5);
            loadMessage.setText("Loading...").setOrigin(0.5);
        });
        this.load.on('fileprogress', function(file){
            console.log(file.src);
        });
        this.load.on('complete', function(){
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadMessage.setText("Loading Complete!").setOrigin(0.5);
            
        });

    }

    create(){
        //Creates the animations
        let walk = {
            key: 'playerwalking',
            frames: this.anims.generateFrameNumbers('playerwalk', {start: 1,end: 2,first:1}),
            frameRate:10,
            repeat:0
        }
        this.anims.create(walk);

        let bunidlinganim = {
            key: 'bunidling',
            frames: this.anims.generateFrameNumbers('bunidle', {start: 1,end: 2,first:1}),
            frameRate:10,
            repeat:0
        }
        this.anims.create(bunidlinganim);

        let meatidlinganim = {
            key: 'meatidling',
            frames: this.anims.generateFrameNumbers('meatidle', {start: 1,end: 2,first:1}),
            frameRate:10,
            repeat:0
        }
        this.anims.create(meatidlinganim);

        let lettuceidlinganim = {
            key: 'lettuceidling',
            frames: this.anims.generateFrameNumbers('lettuceidle', {start: 1,end: 2,first:1}),
            frameRate:10,
            repeat:0
        }
        this.anims.create(lettuceidlinganim);
        


        //Music stuff
        menuSong = this.sound.add('menuSong');
        menuSong.setLoop(true);
        menuSong.stop();

        gameSong = this.sound.add('gameSong');
        gameSong.setLoop(true);
        gameSong.stop(); 

        creditSong = this.sound.add('endingSong');
        creditSong.setLoop(true);
        creditSong.stop(); 
    }
      
    update(){

        this.clock = this.time.delayedCall(1000, ()=>{
            this.scene.start("menuScene");
        }, null, this);

    }

   
}