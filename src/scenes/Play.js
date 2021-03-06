// Our Play scene
//ハンバーガーが食べたいなあー　
class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
        //create ingredient count
        this.topBunCount = 0, this.meatCount = 0, this.lettuceCount = 0, this.bottomBunCount =0;
    }
    preload(){
      
    }

    //Create Function
    create(){
        //Adds the background
        this.gamebackground = this.add.tileSprite(1920, 1100, 4800, 3125, 'gamebackground').setOrigin(.5);
        this.gamebackground.depth = -69;

        //music stuff
        if(!gameSong.isPlaying)
            gameSong.play();
        if(creditSong.isPlaying)
            creditSong.stop();
        if(menuSong.isPlaying)
            menuSong.stop();


        let textConfig = {
            fontFamily: 'VT323',
            fill: '#ffffff',
            fontSize: '30px'
        }
        //text config for the menu button
        let textConfig2 = {
            fontFamily: 'VT323',
            fill: '#2f631c',
            fontSize: '35px'
        }
        let textConfig3 = {
            fontFamily: 'VT323',
            fill: '#ffffff',
            fontSize: '40px'
        }
        burgerArray = [];
        //from Prof. Nathan's Mappy tutorial
        const mainLevel = this.add.tilemap('mainLevel');
        const groundSprites = mainLevel.addTilesetImage("groundsheet", 'groundsheet');
        ground = mainLevel.createStaticLayer("ground",groundSprites,0,0);
        ground.setCollisionByProperty({collide:true});
        this.physics.world.bounds.setTo(0,0,mainLevel.widthInPixels, mainLevel.heightInPixels);

        /*
        const debugGraphics = this.add.graphics().setAlpha(0.75);

        ground.renderDebug(debugGraphics,{
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,134,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)

        });
        */

        /* PLAYER CODE */
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        playerGuard = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        playerDash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //Creates the main player
        mainPlayer = new PlayerObject(this, 3520, 1280, 'playeridle').setOrigin(0.5);
        this.physics.add.existing(mainPlayer);
        mainPlayer.setSize(32, 32, true);
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

        //Temp ingredients so the game doesn't crash, shoved into the void.
        this.bunPickup = new IngredientObject(this, 69420, 69420, 1).setOrigin(0.5);
        this.meatPickup = new IngredientObject(this, 69420, 69420, 2).setOrigin(0.5);
        this.lettucePickup = new IngredientObject(this, 69420, 69420, 3).setOrigin(0.5);

        this.burgerStation = new BurgerCompiler(this, 3650, 1340).setOrigin(0.5);
        this.physics.add.existing(this.burgerStation);
        this.burgerStation.body.allowGravity = false;
        this.burgerLocationMessage = this.add.text(3650, 1250, "Burger will be here\nonce completed.", {align:"center"}).setOrigin(0.5);

        //Enemy Spawns
        this.bunEnemy1 = new EnemyObject(this, 1696, 1998,  'enemytemp', 1).setOrigin(0.5);
        this.physics.add.existing(this.bunEnemy1);
        this.bunEnemy1.body.collideWorldBounds = true;
        this.physics.add.collider(this.bunEnemy1, ground);

        this.bunEnemy2 = new EnemyObject(this, 1920, 320,  'enemytemp', 1).setOrigin(0.5);
        this.physics.add.existing(this.bunEnemy2);
        this.bunEnemy2.body.collideWorldBounds = true;
        this.physics.add.collider(this.bunEnemy2, ground);

        this.meatEnemy = new EnemyObject(this, 320, 1536,  'enemytemp', 2).setOrigin(0.5);
        this.physics.add.existing(this.meatEnemy);
        this.meatEnemy.body.collideWorldBounds = true;
        this.physics.add.collider(this.meatEnemy, ground);

        this.lettuceEnemy = new EnemyObject(this, 1792, 1152,  'enemytemp', 3).setOrigin(0.5);
        this.physics.add.existing(this.lettuceEnemy);
        this.lettuceEnemy.body.collideWorldBounds = true;
        this.physics.add.collider(this.lettuceEnemy, ground);

        //Debug
        buildBurgerButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        addBun = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        addMEAT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        addLettuce = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //Camera setup: from Prof. Nathan's repo
        //Camera follows the mainPlayer
        this.cameras.main.setBounds(0,0, mainLevel.widthInPixels, mainLevel.heightInPixels);
        //console.log(mainPlayer);
        this.cameras.main.startFollow(mainPlayer, true, 0.15,0.15);
        
            
        //To Do list text bar
        this.ingredientBar = this.add.image(centerX, 50,'hud').setOrigin(0.5).setScrollFactor(0);
        this.add.text(centerX+50, 30, "TO DO LIST: Gather 2 buns, 1 meat, and 1 lettuce to build a burger!", textConfig).setOrigin(0.5).setScrollFactor(0);
        this.add.rectangle(centerX+50, 65, 800, 25, 0x7D4E04, 0.7).setOrigin(0.5).setScrollFactor(0);
        this.toDoList = this.add.text(centerX+50,65,"bun: "+ this.topBunCount
                                                +" meat: "+ this.meatCount
                                                +" lettuce: "+this.lettuceCount, textConfig).setOrigin(0.5).setScrollFactor(0);

         //menu button
        this.menu = this.add.text(60, 50, "menu", textConfig2).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle(textConfig3);
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("menuScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.menu.setStyle(textConfig3); })
        .on('pointerout', ()=>{this.menu.setStyle(textConfig2); }).setScrollFactor(0);
           
        //For the win sound
        this.winSoundOnce = false;
    }
    
    update(){
        //Updates main player
        mainPlayer.update();

        if(mainPlayer.body.velocity.x < 0){
            this.gamebackground.x += 0.2;
        } else if(mainPlayer.body.velocity.x > 0){
            this.gamebackground.x -= 0.2;
        }

        if(mainPlayer.body.velocity.y < 0){
            this.gamebackground.y += 0.2;
        } else if(mainPlayer.body.velocity.y > 0){
            this.gamebackground.y -= 0.2;
        }
        
        //Updates enemies
        this.bunEnemy1.update();
        this.bunEnemy2.update();
        this.meatEnemy.update();
        this.lettuceEnemy.update();

        //Updates the burger station
        this.burgerStation.update();
        
        //Runs the behavior for enemies
        this.enemyBehavior(this.bunEnemy1);
        this.enemyBehavior(this.bunEnemy2);
        this.enemyBehavior(this.meatEnemy);
        this.enemyBehavior(this.lettuceEnemy);
        this.enemySpriteUpdates();

        //Runs behavior for ingredients
        this.ingredientBehavior();
        
        this.toDoList.setText("buns: "+ this.topBunCount
                            +" meat: "+ this.meatCount
                            +" lettuce: "+this.lettuceCount);

        //If the burger is complete, you can touch it to get oUUT
        if(this.burgerStation.burgerComplete){
            this.burgerLocationMessage.setText("Touch the burger!").setOrigin(0.5);
            this.toDoList.setText("Go back to the completed burger to hand it to the demon king!");
            if(this.physics.overlap(this.burgerStation, mainPlayer)){
                mainPlayer.pushUp();
                if(!this.winSoundOnce){
                    this.winSoundOnce = true;
                    this.sound.play('mkhappy');
                }
                this.time.delayedCall(1000, () => {
                    this.scene.start('goodEndScene');
                }, null, this);
            }
        }

       
    }

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
            console.log("Bun colliding");
            this.ingredientPickup(this.bunPickup);
            this.topBunCount += 1;
        }
        if(this.physics.overlap(this.meatPickup, mainPlayer)){
            this.ingredientPickup(this.meatPickup);
            this.meatCount += 1;
        }
        if(this.physics.overlap(this.lettucePickup, mainPlayer)){
            this.ingredientPickup(this.lettucePickup);
            this.lettuceCount += 1;
        }
    }

    //Adds ingredient to the burger array then rebuilds the burger accordingly
    ingredientPickup(ingredientToAdd){
            this.burgerStation.addIngredient(ingredientToAdd.ingredientKey);
            this.burgerStation.buildBurger();
            ingredientToAdd.destroy();
            this.sound.play('pickup');
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

        //Plays noise to alert player they're being targeted
        if(enemyAffected.attackingNoise == 1){
            this.sound.play('enemyDetection');
            enemyAffected.attackingNoise = 2;
        }

        //Checks if the player is in the detection field, if it is set attacking to true if not dont attack
        if(this.physics.overlap(enemyAffected.detectionField, mainPlayer)){
            enemyAffected.attacking = true;
            if(enemyAffected.attackingNoise == 0)
                enemyAffected.attackingNoise = 1;
        } else {
            enemyAffected.resetAttacking();
            enemyAffected.attackingNoise = 0;
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
            enemyAffected.loseHealth(6);
            mainPlayer.attackConnected = true;
            console.log(enemyAffected.health);
        }

        //Sends the enemy to the void if they're "dead"
        if(enemyAffected.health <= 0 && !enemyAffected.voided)
            this.enemyPoop(enemyAffected);

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
            console.log("HELLO I AM THE NUMBER " + enemyAffected.ingredientKey);
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
                        this.meatPickup = new IngredientObject(this, enemyAffected.x, enemyAffected.y - 64, 2).setOrigin(0.5);
                        this.physics.add.existing(this.meatPickup);
                        this.meatPickup.body.collideWorldBounds = true;
                        this.physics.add.collider(this.meatPickup, ground);
                        this.meatPickup.setVelocityY(-500);
                        poopOnce = false;
                        break;
        
                    case 3:
                        this.lettucePickup = new IngredientObject(this, enemyAffected.x, enemyAffected.y - 64, 3).setOrigin(0.5);
                        this.physics.add.existing(this.lettucePickup);
                        this.lettucePickup.body.collideWorldBounds = true;
                        this.physics.add.collider(this.lettucePickup, ground);
                        this.lettucePickup.setVelocityY(-500);
                        poopOnce = false;
                        break;
                }
            }
            //Turns off collision and sends to the void
            enemyAffected.body.collideWorldBounds = false;
            enemyAffected.toTheVoid();
    }

    //Changes the sprites fot the enemies
    enemySpriteUpdates(){
        //Sprite changes for the enemies
        if(this.bunEnemy1.body.velocity.x > 0){
            this.bunEnemy1.setTexture('bunright');
        } else if(this.bunEnemy1.body.velocity.x < 0){
            this.bunEnemy1.setTexture('bunleft');
        } else if(this.bunEnemy1.body.velocity.x == 0){
            this.bunEnemy1.anims.play('bunidling', true);
        }
        if(this.bunEnemy2.body.velocity.x > 0){
            this.bunEnemy2.setTexture('bunright');
        } else if(this.bunEnemy2.body.velocity.x < 0){
            this.bunEnemy2.setTexture('bunleft');
        } else if(this.bunEnemy2.body.velocity.x == 0){
            this.bunEnemy2.anims.play('bunidling', true);
        }
        if(this.meatEnemy.body.velocity.x > 0){
            this.meatEnemy.setTexture('meatright');
        } else if(this.meatEnemy.body.velocity.x < 0){
            this.meatEnemy.setTexture('meatleft');
        } else if(this.meatEnemy.body.velocity.x == 0){
            this.meatEnemy.anims.play('meatidling', true);
        }
        if(this.lettuceEnemy.body.velocity.x > 0){
            this.lettuceEnemy.setTexture('lettuceright');
        } else if(this.lettuceEnemy.body.velocity.x < 0){
            this.lettuceEnemy.setTexture('lettuceleft');
        } else if(this.lettuceEnemy.body.velocity.x == 0){
            this.lettuceEnemy.anims.play('lettuceidling', true);
        }
    }
}