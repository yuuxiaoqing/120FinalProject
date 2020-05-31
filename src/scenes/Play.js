// Our Play scene
//ハンバーガーが食べたいなあー　
class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
        /**
        //create burgerArray
        this.burgerArray = ["bottomBun","meat","lettuce","topBun"];
        **/
        //create ingredient count
        this.topBunCount = 0, this.meatCount = 0, this.lettuceCount = 0, this.bottomBunCount =0;
        /**
        //cooking status booleans
        this.bunCooked = false, this.meatCooked = false, this.lettuceCooked = false;
        */

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
        //  this.load.atlas('burger', 'burgersheet.png',{
        //      frameWidth: 64,
        //      frameHeight: 64
        //  }, 'burger.json');

    }

    //Create Function
    create(){
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //from Prof. Nathan's Mappy tutorial
        const map = this.add.tilemap("map01");
        const tileset = map.addTilesetImage("colored_packed", "kenney_sheet");
        //const background = map.createDynamicLayer("background",tileset, 0,0);
        
        //create a new layer specifically for the burger
        const background = map.createDynamicLayer("background",tileset, 0,0);
        ground = map.createStaticLayer("ground",tileset,0,0);
        ground.setCollisionByProperty({collide:true});
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        ground.renderDebug(debugGraphics,{
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,134,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        });

        /* PLAYER CODE */
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        playerGuard = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        playerDash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //Creates the main player
        //const playerSpawn = map.findObject("object", obj=> obj.name ==="player");
        mainPlayer = new PlayerObject(this, centerX, centerY - 200, 'playerPrototype').setOrigin(0.5);
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;

        //make sure mainPlayer don't fall through the ground
        this.physics.add.collider(mainPlayer, ground);

        //Creates the physics groups for the parry and attacks
        this.attackGroup = this.add.group({
            runChildUpdate: true
        });
        this.parryGroup = this.add.group({
            runChildUpdate: true
        });

        //Creates a physic group for the enemies
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });

        //Temp ingredients so the game doesn't crash, shoved into the void.
        this.bunPickup = new IngredientObject(this, 69420, 69420, 1).setOrigin(0.5);
        this.meatPickup = new IngredientObject(this, 69420, 69420, 2).setOrigin(0.5);
        this.lettucePickup = new IngredientObject(this, 69420, 69420, 3).setOrigin(0.5);

        this.burgerStation = new BurgerCompiler(this, 200, 300).setOrigin(0.5);
        this.physics.add.existing(this.burgerStation);
        this.burgerStation.body.allowGravity =false ;


        //console.log(mainPlayer)
        //console.log(mainPlayer.body);
        //setting world physics from Prof.Nathan's code: don't forget this!!
        //this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0,0,map.widthInPixels, map.heightInPixels);
        
        //console.log(ground);
        
        //To Do list text
        this.toDoList = this.add.text(540,405,"topBun: "+ this.topBunCount
                                             +" lettuce: "+ this.lettuceCount
                                             +" meat: "+this.meatCount
                                             +" bottom: "+this.bottomBunCount, {fill:'#fff',align:"center"}).setOrigin(0.5);
        
  
        /**
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
        //build the burger into the tilemap here
        //NOTE: DYNAMIC LAYER ISSUE: TILESET ID OFFSET BY +1
        //try making the map with a transparency setting and see if offset problem is fixed
        this.physics.add.overlap(mainPlayer, this.bottomBunGroup, (obj1, obj2)=>{
            //implement BOTTOM BUN counter here
            //INVENTORY INCREMENT HERE @NIKO
            this.bottomBunCount++;
            this.toDoList.setText("topBun: "+ this.topBunCount
                                             +" lettuce: "+ this.lettuceCount
                                             +" meat: "+this.meatCount
                                             +" bottom: "+this.bottomBunCount);
            //background.putTilesAt([1024+1,1025+1,1026+1], 32, 35); //ADD SPECIFIC TILES TO THIS LOCATION ON THE DYNAMIC LAYER
            this.burgerStack("bottomBun", this.burgerArray, this.bottomBunCount,background, this.bunCooked); //REMOVE THE TOP
            obj2.destroy(); //remove the obj from the scene
        });
        this.physics.add.overlap(mainPlayer, this.meatGroup, (obj1, obj2)=>{
            //implement MEAT counter here
            this.meatCount++;
            //background.putTilesAt([946+1,946+1,946+1], 32, 33);
            this.toDoList.setText("topBun: "+ this.topBunCount
                                             +" lettuce: "+ this.lettuceCount
                                             +" meat: "+this.meatCount
                                             +" bottom: "+this.bottomBunCount);
            this.burgerStack("meat", this.burgerArray, this.meatCount,background, this.meatCooked);
            obj2.destroy();
        });
        this.physics.add.overlap(mainPlayer, this.lettuceGroup, (obj1, obj2)=>{
            //implement LETTUCE counter here
            this.lettuceCount++;
            //background.putTilesAt([994+1,994+1,994+1], 32, 34);
            this.toDoList.setText("topBun: "+ this.topBunCount
                                             +" lettuce: "+ this.lettuceCount
                                             +" meat: "+this.meatCount
                                             +" bottom: "+this.bottomBunCount);
            this.burgerStack("lettuce", this.burgerArray, this.lettuceCount,background, this.lettuceCooked);
            obj2.destroy();
        });
        this.physics.add.overlap(mainPlayer, this.topBunGroup, (obj1, obj2)=>{
            //implement TOP BUN counter here
            this.topBunCount++;
            //background.putTilesAt([928+1, 929+1, 930+1], 32, 32);
            console.log("top bun count",this.topBunCount)
            this.toDoList.setText("topBun: "+ this.topBunCount
                                             +" lettuce: "+ this.lettuceCount
                                             +" meat: "+this.meatCount
                                             +" bottom: "+this.bottomBunCount);
            this.burgerStack('topBun', this.burgerArray, this.topBunCount,background, this.bunCooked);
            obj2.destroy();
            
        });
        
        **/




        //Debug
        this.bunEnemy1 = new EnemyObject(this, centerX, centerY + 500,  'enemytemp', 1).setOrigin(0.5);
        //this.enemyGroup.add(this.enemy);
        this.physics.add.existing(this.bunEnemy1);
        this.bunEnemy1.body.collideWorldBounds = true;
        this.physics.add.collider(this.bunEnemy1, ground);



        //Debug
        // this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        buildBurgerButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        addBun = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        addMEAT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        addLettuce = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        //Camera setup: from Prof. Nathan's repo
        //Camera follows the mainPlayer
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        //console.log(mainPlayer);
        this.cameras.main.startFollow(mainPlayer, true, 0.15,0.15);
        

    
    
        //temp scene title
        this.add.text(540, 350, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE\nGather '+ingredientAmt+" of each ingredients to build a burger!", {fill: '#fff', align:"center"}).setOrigin(0.5);

        //BURGER TEXT
        //this.add.text(540, 400, "↓おいしいハンバーガー↓\n↓delicious hamburger↓", {fill: '#fff', align:'center'}).setOrigin(0.5);

        
       
    }
    
    update(){
        //Updates main player
        mainPlayer.update();
        this.bunEnemy1.update();
        this.burgerStation.update();
        //this.topBunAmt.setText(540,400,"topBun: "+this.topBunCount);
        //Debug
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }

        //Runs the behavior for enemies
        this.enemyBehavior(this.bunEnemy1);

        this.ingredientBehavior();

    }

 /**  
    bun1Text(){
        this.topBunCount++;
        this.topBunAmt.setText(540,400,"topBun: "+this.topBunCount);
    }

  
    bun1Trigger(){
        //add bun1 to world
        for(i =0; i<5 ; i++){
            this.bun01 = this.physics.add.sprite(100,100,'kenney_sheet', 850);
            this.bun01.body.setSize(24,24);

        }
        
        
    }
    */

    //handles the ingredient behavior
    ingredientBehavior(){
        if(Phaser.Input.Keyboard.JustDown(addBun)){
            this.bunPickup = new IngredientObject(this, 100, 100 - 32, 1).setOrigin(0.5);
            this.physics.add.existing(this.bunPickup);
            this.bunPickup.body.collideWorldBounds = true;
            this.physics.add.collider(this.bunPickup, ground);
            this.bunPickup.setVelocityY(-500);
        }

        if(Phaser.Input.Keyboard.JustDown(addMEAT)){
            this.meatPickup =new IngredientObject(this, 200, 100, 2).setOrigin(0.5);
            this.physics.add.existing(this.meatPickup);
            this.meatPickup.body.collideWorldBounds = true;
            this.physics.add.collider(this.meatPickup, ground);
        }

        if(Phaser.Input.Keyboard.JustDown(addLettuce)){
            this.lettucePickup =new IngredientObject(this, 300, 100, 3).setOrigin(0.5);
            this.physics.add.existing(this.lettucePickup);
            this.lettucePickup.body.collideWorldBounds = true;
            this.physics.add.collider(this.lettucePickup, ground);
        }

        if(this.physics.overlap(this.bunPickup, mainPlayer)){
            this.ingredientPickup(this.bunPickup);
        }
        if(this.physics.overlap(this.meatPickup, mainPlayer)){
            this.ingredientPickup(this.meatPickup);
        }
        if(this.physics.overlap(this.lettucePickup, mainPlayer)){
            this.ingredientPickup(this.lettucePickup);
        }
    }

    //Adds ingredient to the burger array then rebuilds the burger accordingly
    ingredientPickup(ingredientToAdd){
            this.burgerStation.addIngredient(ingredientToAdd.ingredientKey);
            this.burgerStation.buildBurger();
            ingredientToAdd.destroy();
    }

    //Ingredient Spawn
    ingredientCreate(x, y, ingredient, ingredientNumber){
        ingredient = new IngredientObject(this, x, y - 32, ingredientNumber).setOrigin(0.5);
        this.physics.add.existing(ingredient);
        ingredient.body.collideWorldBounds = true;
        this.physics.add.collider(ingredient, ground);
        ingredient.setVelocityY(-500);
    }

    //All the functions and physics stuff for the enemy ai
    //This takes in an EnemyObject then deals with all the stuff like attacks
    //AI etc
    enemyBehavior(enemyAffected){
        //If the enemy is in the state to attack accerlate towards player
        //(it just runs towards player)
        if(enemyAffected.attacking && enemyAffected.alive){
            this.physics.accelerateTo(enemyAffected, mainPlayer.x, enemyAffected.y, 600, 1000);
        }

        //Checks if the player is in the detection field, if it is set attacking to true if not dont attack
        if(this.physics.overlap(enemyAffected.detectionField, mainPlayer)){
            enemyAffected.attacking = true;
        } else {
            enemyAffected.resetAttacking();
        }

        //Checks if a player runs into an enemy, lose health and set invuln for a time
        if(this.physics.overlap(mainPlayer, enemyAffected)){
            mainPlayer.loseHealth();
            console.log("Checking if it's getting hurt");
            console.log(mainPlayer.invuln);
            console.log(mainPlayer.guarding);
            console.log(mainPlayer.health);
        }

        //Checks if a player is parrying the enemy
        if(this.physics.overlap(enemyAffected, this.parryGroup)){
            console.log("Enemy Parried");
            enemyAffected.bounceBack(500);
            enemyAffected.attackedByPlayer = true;
            enemyAffected.loseHealth(3);
            mainPlayer.attackConnected = true;
            console.log(enemyAffected.health);
        }

        //Sends the enemy to the void if they're "dead"
        if(enemyAffected.health <= 0 && !enemyAffected.voided){
            this.enemyPoop(enemyAffected);
        }
        

        //Checks if the player is attacking the enemy
        if(this.physics.overlap(enemyAffected, this.attackGroup)){
            console.log("Enemy Attacked");
            enemyAffected.bounceBack(200);
            enemyAffected.attackedByPlayer = true;
            enemyAffected.loseHealth(1);
            mainPlayer.attackConnected = true;
            console.log(enemyAffected.health);
        }
    }

    //Kills the enemy, separate function because this will get FUCKING HUGE
    //So key thing to note is that you cannot pass a this.bunpickup etc in a separate function
    //It fucks witht he hitboxes etc etc idk why but it breaks i dont care this works
    //Who cares
    //I'm done.
    enemyPoop(enemyAffected){
        var poopOnce = true;
            if(poopOnce){
                switch(enemyAffected.ingredientKey){
                    case 1:
                        this.bunPickup = new IngredientObject(this, enemyAffected.x, enemyAffected.y - 64, 1).setOrigin(0.5);
                        this.physics.add.existing(this.bunPickup);
                        this.bunPickup.body.collideWorldBounds = true;
                        this.physics.add.collider(this.bunPickup, ground);
                        this.bunPickup.setVelocityY(-500);
                        poopOnce = false;
                        break;
        
                    case 2:
                        this.meatPickup = new IngredientObject(this, enemyAffected.x, enemyAffected.y - 64, 1).setOrigin(0.5);
                        this.physics.add.existing(this.meatPickup);
                        this.meatPickup.body.collideWorldBounds = true;
                        this.physics.add.collider(this.meatPickup, ground);
                        this.meatPickup.setVelocityY(-500);
                        poopOnce = false;
                        break;
        
                    case 3:
                        this.lettucePickup = new IngredientObject(this, enemyAffected.x, enemyAffected.y - 64, 1).setOrigin(0.5);
                        this.physics.add.existing(this.lettucePickup);
                        this.lettucePickup.body.collideWorldBounds = true;
                        this.physics.add.collider(this.lettucePickup, ground);
                        this.lettucePickup.setVelocityY(-500);
                        poopOnce = false;
                        poopOnce = false;
                        break;
                }
            }
            enemyAffected.body.collideWorldBounds = false;
            enemyAffected.toTheVoid();
    }




}