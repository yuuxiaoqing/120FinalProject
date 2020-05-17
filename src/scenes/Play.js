// Our Play scene
//ハンバーガーが食べたいなあー　
class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
        //temp var from nathan's example
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;
        this.JUMP_VELOCITY = -650;

        //create burgerArray
        this.burgerArray = ["bottomBun","meat","lettuce","topBun"];
        //create ingredient count
        this.topBunCount = 0, this.meatCount = 0, this.lettuceCount = 0, this.bottomBunCount =0;
        //cooking status booleans
        this.bunCooked = false, this.meatCooked = false, this.lettuceCooked = false;
    }
    preload(){
        
         //once the spritesheets are set, move all these loading to loading scene
         //from Prof. Nathan's Tiled examples
         this.load.path = "./assets/";
         //prototype tile sheet
         this.load.spritesheet('kenney_sheet', '/tilemaps/colored_packed.png', {
             frameWidth: 16,
             frameHeight: 16,
         });
         //map is 1024 x 1024 pixels, but canvas is 640 x 640
         this.load.tilemapTiledJSON('map01', '/tilemaps/map01.json');
         this.load.image('temp', 'temp.png');
         this.load.spritesheet('burger', 'burgersheet.png',{
             frameWidth: 64,
             frameWidth: 64
         });

    }
    create(){
       
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        //from Prof. Nathan's Mappy tutorial
        const map = this.add.tilemap("map01");
        const tileset = map.addTilesetImage("colored_packed", "kenney_sheet");
        //const background = map.createDynamicLayer("background",tileset, 0,0);
        
        /* create a new layer specifically for the burger
        */
        const background = map.createDynamicLayer("background",tileset, 0,0);
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


  
        //BOTTOM BUN obj group, burgerArray[0]
        //create a bottom bun, obj locations are from tilemap
        this.bottomBun = map.createFromObjects("object", 'bun01', {
            key:'kenney_sheet', //tilesheet name
            frame: 850 //tileID in tileset
        }, this);
        this.physics.world.enable(this.bottomBun, Phaser.Physics.Arcade.STATIC_BODY);//enable physics on obj
        this.bottomBun.map((bun) =>{
            bun.body.setCircle(4).setOffset(4,4);//add a circle physic body
        });
        this.bottomBunGroup = this.add.group(this.bottomBun);//add bottomBun to a bottomBun group.


        //MEAT obj group, burgerArray[1]
        this.meats = map.createFromObjects("object", 'meat', {
            key:'kenney_sheet',
            frame: 946
        }, this);
        this.physics.world.enable(this.meats, Phaser.Physics.Arcade.STATIC_BODY);
        this.meats.map((meat) =>{
            meat.body.setCircle(4).setOffset(4,4);
        });
        this.meatGroup = this.add.group(this.meats);


        //LETTUCE obj group, burgerArray[2]
        this.lettuces = map.createFromObjects("object", 'lettuce', {
            key:'kenney_sheet',
            frame: 994
        }, this);
        this.physics.world.enable(this.lettuces, Phaser.Physics.Arcade.STATIC_BODY);
        this.lettuces.map((lettuce) =>{
            lettuce.body.setCircle(4).setOffset(4,4);
        });
        this.lettuceGroup = this.add.group(this.lettuces);


        //TOP BUN obj group, burgerArray[3]
        this.topBun = map.createFromObjects("object", 'bun02', {
            key:'kenney_sheet',
            frame: 802
        }, this);
        this.physics.world.enable(this.topBun, Phaser.Physics.Arcade.STATIC_BODY);
        this.topBun.map((bun2) =>{
            bun2.body.setCircle(4).setOffset(4,4);
        });
        this.topBunGroup = this.add.group(this.topBun);
        
        /* COOKING STATIONS */ //doesn't work bc player touches one station and then the other ones don't work
        //bread station
        this.breadMaker = map.createFromObjects("object", 'breadmaker', {
            key:'kenney_sheet',
            frame: 383
        }, this);
        this.physics.world.enable(this.breadMaker, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(this.player,this.breadMaker, ()=>{
            this.bunCooked = true;
        });
        //meat station
        this.meatMaker = map.createFromObjects("object", 'meatmachine', {
            key:'kenney_sheet',
            frame: 416
        }, this);
        this.physics.world.enable(this.meatMaker, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(this.player,this.meatMaker, ()=>{
            this.meatCooked = true;
        });
        //lettuce station
        this.veggieMaker = map.createFromObjects("object", 'lettuceharvest', {
            key:'kenney_sheet',
            frame: 431
        }, this);
        this.physics.world.enable(this.veggieMaker, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(this.player,this.veggieMaker, ()=>{
            this.lettuceCooked = true;
        });

        //setting world physics from nathan's code dont forget this.
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0,0,map.widthInPixels, map.heightInPixels);
        //make sure player don't fall through the ground
        this.physics.add.collider(this.player, ground);


        //build the burger into the tilemap here
        //NOTE: DYNAMIC LAYER ISSUE: TILESET ID OFFSET BY +1
        //try making the map with a transparency setting and see if offset problem is fixed
        this.physics.add.overlap(this.player, this.bottomBunGroup, (obj1, obj2)=>{
            //implement BOTTOM BUN counter here
            //INVENTORY INCREMENT HERE @NIKO
            this.bottomBunCount++;
            //background.putTilesAt([1024+1,1025+1,1026+1], 32, 35); //ADD SPECIFIC TILES TO THIS LOCATION ON THE DYNAMIC LAYER
            this.burgerStack("bottomBun", this.burgerArray, this.bottomBunCount,background, this.bunCooked); //REMOVE THE TOP
            obj2.destroy(); //remove the obj from the scene
        });
        this.physics.add.overlap(this.player, this.meatGroup, (obj1, obj2)=>{
            //implement MEAT counter here
            this.meatCount++;
            //background.putTilesAt([946+1,946+1,946+1], 32, 33);
            this.burgerStack("meat", this.burgerArray, this.meatCount,background, this.meatCooked);
            obj2.destroy();
        });
        this.physics.add.overlap(this.player, this.lettuceGroup, (obj1, obj2)=>{
            //implement LETTUCE counter here
            this.lettuceCount++;
            //background.putTilesAt([994+1,994+1,994+1], 32, 34);
            this.burgerStack("lettuce", this.burgerArray, this.lettuceCount,background, this.lettuceCooked);
            obj2.destroy();
        });
        this.physics.add.overlap(this.player, this.topBunGroup, (obj1, obj2)=>{
            //implement TOP BUN counter here
            this.topBunCount++;
            //background.putTilesAt([928+1, 929+1, 930+1], 32, 32);
            this.burgerStack('topBun', this.burgerArray, this.topBunCount,background, this.bunCooked);
            obj2.destroy();
        });



        //Camera setup: from Prof. Nathan's repo
        //Camera follows the player
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.15,0.15);

        //temp scene switch controls
        cursors = this.input.keyboard.createCursorKeys();

        //temp scene title, doesn't show up with tilesheet
        this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);


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

    //each time it's call, it takes a sprite from the sprite sheet and stack it 
    //on top of the burger
    burgerStack(removeElement, burgerArray, ingredientCount, background, cooked=null){
        //delete the elements from the burgerArray when player gather enough resources
        //delete just leave the index empty and doesn't change the array index or change array length
        //so no reindexing array problem
        if(removeElement == "bottomBun" && ingredientCount >= 5){
           //if the ingredient is bottom bun and ingredientCount is more than #, remove ingredient from list
           //display the ingredient
           background.putTilesAt([1024+1,1025+1,1026+1], 32, 35); //ADD SPECIFIC TILES TO THIS LOCATION ON THE DYNAMIC LAYER
           delete burgerArray[0];
           console.log("remove bottom bun")
        }
        if(removeElement == "meat" && ingredientCount >= 5){
            background.putTilesAt([946+1,946+1,946+1], 32, 33);
            delete burgerArray[1];
            console.log("remove meat");
        }
        if(removeElement == "lettuce" && ingredientCount >= 5){
            background.putTilesAt([994+1,994+1,994+1], 32, 34);
            delete burgerArray[2];
            console.log("remove lettuce");
        }
        if(removeElement == "topBun" && ingredientCount >= 5){
            background.putTilesAt([928+1, 929+1, 930+1], 32, 32);
            delete burgerArray[3];
            console.log("remove top bun")
        }
        console.log(burgerArray)
    }




}