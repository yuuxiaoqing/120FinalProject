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

        //Player Sprites
        this.load.image('attackHitbox', './assets/playerSprites/attackHitbox.png');
        this.load.image('parryHitbox', './assets/playerSprites/parryHitbox.png');
        this.load.image('playerPrototype','./assets/playerSprites/player_prototype.png');

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
        this.load.image('detectionHitbox', './assets/enemySprites/detectionHitbox.png');
        
         //once the spritesheets are set, move all these loading to loading scene
         //from Prof. Nathan's Tiled examples
        //this.load.path = "./assets/";
        /** 
         //prototype tile sheet
        this.load.spritesheet('kenney_sheet', '/tilemaps/colored_packed.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet('proto_sheet',"/tilemaps/proto_sheet.png",{
            frameWidth:64,
            frameHeight:64,
        });
         //map is 1024 x 1024 pixels, but canvas is 640 x 640
        this.load.tilemapTiledJSON('map01', '/tilemaps/map01.json');
         
        this.load.tilemapTiledJSON('map02', './tilemaps/map02.json');
            this.load.image('temp', 'temp.png');
        **/

        //Loads the tilesheet
        this.load.spritesheet('groundsheet', './assets/tilemaps/groundsheet.png',{
            frameWidth:32,
            frameHeight:32,
        });

        //Loads the levels
        this.load.tilemapTiledJSON('tutorialLevel', './assets/tilemaps/tutorial.json');



        //title scene assets:
        this.load.image('title', './assets/title.png');
        //text config
        let textConfig = {
            fontFamily: 'Caveat Brush',
            fill: '#ffffff',
            fontSize: '40px'
        }
        this.add.text(width/2, height, "LOADING", textConfig);
        //progress bar replace with a burger //check out Asset Bonanza// boot strap load, get something on 
        //screen before loading the other assets
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(330,270,320,50);
        var loadMessage =  this.add.text(centerX,centerY+100,"Loading.");
        // this.add.sprite(centerX, centerY, "loadsheet", "load");
        
        this.load.on('progress', function(value){
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(340,280,300*value, 30);
            loadMessage.setText("Loading..").setOrigin(0.5);
            loadMessage.setText("Loading...").setOrigin(0.5);
            // this.add.sprite(centerX, centerY, "loadsheet", "load01");
            // this.add.sprite(centerX, centerY, "loadsheet", "load02");
            // this.add.sprite(centerX, centerY, "loadsheet", "load03");
        });
        this.load.on('fileprogress', function(file){
            console.log(file.src);
        });
        this.load.on('complete', function(){
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            // this.add.sprite(centerX, centerY, "loadsheet", "load04");
            loadMessage.setText("Loading Complete!").setOrigin(0.5);
            
        });

    }
    create(){
        //this.cameras.main.setBackgroundColor(0xE6B61C);
        // //console.log(this.cameras.main);
        // this.add.text(centerX, centerY - 200, 'LOAD SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff', align:"center"}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // this.add.text(centerX, centerY - 100, 'by Angela, Xiao Qing, & Niko', {fill: '#fff', align:'center'}).setOrigin(0.5);
        // this.add.text(centerX, centerY, '----in progress burger----', {fill: '#fff', align:'center'}).setOrigin(0.5);
        // this.add.text(centerX, centerY +40, 'this.cameras.main.startFollow(burger, 0.25,0.25);', {fill: '#fff', align:'center'}).setOrigin(0.5);
    }   
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }

        this.clock = this.time.delayedCall(1000, ()=>{
            this.scene.start("menuScene");
        }, null, this);

    }

   
}