// Our Play scene

class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
        //temp var from nathan's example
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;
        this.JUMP_VELOCITY = -650;
    }
    preload(){

         //From Nathan's Tiled Examples
         this.load.path = "./assets/";
         //prototype tile sheet
         this.load.spritesheet('kenney_sheet', '/tilemaps/colored_packed.png', {
             frameWidth: 16,
             frameHeight: 16
         });
         // map is 1024 x 1024 pixels, but canvas is 640 x 640
         this.load.tilemapTiledJSON('map01', '/tilemaps/map01.json');
         this.load.image('temp', 'temp.png');

    }
    create(){
        this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        //FROM NATHAN'S MAPPY REPO
        const map = this.add.tilemap("map01");
        const tileset = map.addTilesetImage("colored_packed", "kenney_sheet");
        const background = map.createStaticLayer("background",tileset, 0,0);
        const ground = map.createStaticLayer("ground",tileset,0,0);
        ground.setCollisionByProperty({collide:true});
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        ground.renderDebug(debugGraphics,{
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,134,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)

        });
        ///REPLACE LATER WITH NIKO'S CODE, 
        const playerSpawn = map.findObject("object", obj=> obj.name ==="player");
        console.log(playerSpawn, playerSpawn.x, playerSpawn.y, "temp") 
        console.log(this.physics)
        this.player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "kenney_sheet", 317);
        this.player.body.setSize(this.player.width/2);
        this.player.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.player.body.setCollideWorldBounds(true);

        //meat obj group
        this.meats = map.createFromObjects("object", 'meat', {
            key:'kenney_sheet',
            frame: 946
        }, this);

        this.physics.world.enable(this.meats, Phaser.Physics.Arcade.STATIC_BODY);
        this.meats.map((meat) =>{
            meat.body.setCircle(4).setOffset(4,4);
        });
        this.meatGroup = this.add.group(this.meats);
        
        //setting world physics from nathan's code dont forget this.
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0,0,map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.player, ground);
        this.physics.add.overlap(this.player, this.meatGroup, (obj1, obj2)=>{
            //prob implement meat counter here
            obj2.destroy();
        });


        //CAMERA STUFF TAKEN FROM NATHAN'S REPO
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.15,0.15);

        //temp scene switch controls
        cursors = this.input.keyboard.createCursorKeys();


    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }

        //temp player control from nathan's mappy code, replace with NIKO'S CODE
        if(cursors.left.isDown){
            this.player.body.setAccelerationX(-this.ACCELERATION);
            this.player.setFlip(true,false);
        }else if(cursors.right.isDown){
            this.player.body.setAccelerationX(this.ACCELERATION);
            this.player.resetFlip();
        }else{
            this.player.body.setAccelerationX(0);
            this.player.body.setDragX(this.DRAG);
        }
        if(this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)){
            this.player.body.setVelocityY(this.JUMP_VELOCITY);
        }
        
    
    }
}