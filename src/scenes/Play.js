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
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //from Prof. Nathan's Mappy tutorial
        const tutorial = this.add.tilemap('tutorialLevel');
        const groundSprites = tutorial.addTilesetImage("groundsheet", 'groundsheet');
        /* create a new layer specifically for the burger
        */
        //const background = tutorial.createDynamicLayer("background",groundSprites, 0,0);
        ground = tutorial.createStaticLayer("ground",groundSprites,0,0);

        ground.setCollisionByProperty({collide:true});
        const debugGraphics = this.add.graphics().setAlpha(0.75);


        ground.renderDebug(debugGraphics,{
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,134,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)

        });

        this.physics.world.bounds.setTo(0,0,tutorial.widthInPixels, tutorial.heightInPixels);
        
        /* PLAYER CODE */
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        playerGuard = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        playerDash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //Creates the main player
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

        this.burgerStation = new BurgerCompiler(this, 200, 700).setOrigin(0.5);
        this.physics.add.existing(this.burgerStation);
        this.burgerStation.body.allowGravity = false;

        //Debug
        this.bunEnemy1 = new EnemyObject(this, centerX, centerY - 300,  'enemytemp', 1).setOrigin(0.5);
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
        this.cameras.main.setBounds(0,0, tutorial.widthInPixels, tutorial.heightInPixels);
        //console.log(mainPlayer);
        this.cameras.main.startFollow(mainPlayer, true, 0.15,0.15);
        

    
    
        //temp scene title
        this.add.text(540, 350, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE\nGather '+ingredientAmt+" of each ingredients to build a burger!", {fill: '#fff', align:"center"}).setOrigin(0.5);

        //BURGER TEXT
        //this.add.text(540, 400, "↓おいしいハンバーガー↓\n↓delicious hamburger↓", {fill: '#fff', align:'center'}).setOrigin(0.5);

      
        //To Do list text bar
        this.ingredientBar = this.add.rectangle(centerX, 60, width, height/5, 0xe6ad12).setOrigin(0.5).setScrollFactor(0);
        this.add.text(centerX, 50, "TO DO LIST: Gather 2 buns, 1 meat, and 1 lettuce to build a burger!", {fill: '#fff', align:'center'}).setOrigin(0.5).setScrollFactor(0);
        this.toDoList = this.add.text(centerX,80,"top bun: "+ this.topBunCount
                                                +" lettuce: "+ this.lettuceCount
                                                +" meat: "+this.meatCount
                                                +" bottom bun: "+this.bottomBunCount, {fill:'#fff',align:"center"}).setOrigin(0.5).setScrollFactor(0);
           
    }
    
    update(){
        //Updates main player
        mainPlayer.update();
        this.bunEnemy1.update();
        this.burgerStation.update();
        //Debug
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('badEndScene');
        }

        //If the enemy is in the state to attack accerlate towards player
        //(it just runs towards player)
        if(this.bunEnemy1.attacking && this.bunEnemy1.alive){
            this.physics.accelerateTo(this.bunEnemy1, mainPlayer.x, this.bunEnemy1.y, 200, 500);
        }

        //Runs the behavior for enemies
        this.enemyBehavior(this.bunEnemy1);

        this.ingredientBehavior();
        
        this.toDoList.setText("Buns: "+ this.topBunCount
                            +" lettuce: "+ this.lettuceCount
                            +" meat: "+this.meatCount);

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