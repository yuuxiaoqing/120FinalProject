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
        const map02 = this.add.tilemap('map02');
        const tileset02 = map02.addTilesetImage('proto_sheet', 'proto_sheet')
        /* create a new layer specifically for the burger
        */
        const background = map02.createDynamicLayer("background",tileset02, 0,0);
        const ground = map02.createStaticLayer("ground",tileset02,0,0);

        ground.setCollisionByProperty({collide:true});
        const debugGraphics = this.add.graphics().setAlpha(0.75);


        ground.renderDebug(debugGraphics,{
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,134,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)

        });

        this.physics.world.bounds.setTo(0,0,map02.widthInPixels, map02.heightInPixels);
        
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

        this.burgerStation = new BurgerCompiler(this, 200, 300).setOrigin(0.5);
        this.physics.add.existing(this.burgerStation);
        this.burgerStation.body.allowGravity =false ;



        //Debug
        this.bunEnemy1 = new EnemyObject(this, centerX, centerY + 500,  'enemytemp', 1).setOrigin(0.5);
        //this.enemyGroup.add(this.enemy);
        this.physics.add.existing(this.bunEnemy1);
        this.bunEnemy1.body.collideWorldBounds = true;
        this.physics.add.collider(this.bunEnemy1, ground);



        //Debug
       // this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
       

        //Camera setup: from Prof. Nathan's repo
        //Camera follows the mainPlayer
        this.cameras.main.setBounds(0,0, map02.widthInPixels, map02.heightInPixels);
        //console.log(mainPlayer);
        this.cameras.main.startFollow(mainPlayer, true, 0.15,0.15);
        

    
    
        //temp scene title
        this.add.text(540, 350, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE\nGather '+ingredientAmt+" of each ingredients to build a burger!", {fill: '#fff', align:"center"}).setOrigin(0.5);

        //BURGER TEXT
        //this.add.text(540, 400, "↓おいしいハンバーガー↓\n↓delicious hamburger↓", {fill: '#fff', align:'center'}).setOrigin(0.5);

      
        //To Do list text bar
        this.ingredientBar = this.add.rectangle(centerX, 60, width, height/5, 0xe6ad12).setOrigin(0.5).setScrollFactor(0);
        this.add.text(centerX, 50, "TO DO LIST: Gather "+ingredientAmt+" of each ingredients to build a burger!", {fill: '#fff', align:'center'}).setOrigin(0.5).setScrollFactor(0);
        this.toDoList = this.add.text(centerX,80,"top bun: "+ this.topBunCount
                                                +" lettuce: "+ this.lettuceCount
                                                +" meat: "+this.meatCount
                                                +" bottom bun: "+this.bottomBunCount, {fill:'#fff',align:"center"}).setOrigin(0.5).setScrollFactor(0);
           
     
   
   
   
       
    }
    
    update(){
        //Updates main player
        mainPlayer.update();
        this.bunEnemy1.update();
        //this.topBunAmt.setText(540,400,"topBun: "+this.topBunCount);
        //Debug
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('badEndScene');
        }
        
        //sounds
        if(mainPlayer.jumping)
            this.sound.play('jump');

        if(mainPlayer.attacking)
            this.sound.play('hit');

        //If the enemy is in the state to attack accerlate towards player
        //(it just runs towards player)
        if(this.bunEnemy1.attacking && this.bunEnemy1.alive){
            this.physics.accelerateTo(this.bunEnemy1, mainPlayer.x, this.bunEnemy1.y, 200, 500);
        }

        //Checks if the player is in the detection field, if it is set attacking to true if not dont attack
        if(this.physics.overlap(this.bunEnemy1.detectionField, mainPlayer)){
            this.bunEnemy1.attacking = true;
        } else {
            this.bunEnemy1.resetAttacking();
        }

        //Checks if a player runs into an enemy, lose health and set invuln for a time
        if(this.physics.overlap(mainPlayer, this.bunEnemy1)){
            mainPlayer.loseHealth()
            console.log(mainPlayer.health);
        }

        //Checks if a player is parrying the enemy
        if(this.physics.overlap(this.bunEnemy1, this.parryGroup)){
            console.log("Enemy Parried");
            this.bunEnemy1.bounceBack(500);
        }

        //Sends the enemy to the void if they're "dead"
        if(this.bunEnemy1.health <= 0){
            this.bunEnemy1.body.collideWorldBounds = false;
            this.bunEnemy1.toTheVoid();
        }
        

        //Checks if the player is attacking the enemy
        if(this.physics.overlap(this.bunEnemy1, this.attackGroup)){
            console.log("Enemy Attacked");
            this.bunEnemy1.bounceBack(100);
            this.bunEnemy1.attackedByPlayer = true;
            this.bunEnemy1.loseHealth();
            mainPlayer.attackConnected = true;
            console.log(this.bunEnemy1.health);
        }

      

    }

    
    bun1Text(){
        this.topBunCount++;
        this.topBunAmt.setText(540,400,"top bun: "+this.topBunCount);
    }

  
    bun1Trigger(){
        //add bun1 to world
        for(i =0; i<5 ; i++){
            this.bun01 = this.physics.add.sprite(100,100,'kenney_sheet', 850);
            this.bun01.body.setSize(24,24);

        }
        
        
    }


    //each time it's call, it takes a sprite from the sprite sheet and stack it 
    //on top of the burger
    burgerStack(removeElement, burgerArray, ingredientCount, background, cooked=null){
        //delete the elements from the burgerArray when player gather enough resources
        //delete just leave the index empty and doesn't change the array index or change array length
        //so no reindexing array problem
        if(removeElement == "bottomBun" && ingredientCount >= ingredientAmt){
           //if the ingredient is bottom bun and ingredientCount is more than #, remove ingredient from list
           //display the ingredient
           
           this.add.image(540, 500, 'bun2').setOrigin(0.5);
           //background.putTilesAt([1024+1,1025+1,1026+1], 32, 35); //ADD SPECIFIC TILES TO THIS LOCATION ON THE DYNAMIC LAYER
           delete burgerArray[0];
           //console.log("remove bottom bun")
        }
        if(removeElement == "meat" && ingredientCount >= ingredientAmt){

            //background.putTilesAt([946+1,946+1,946+1], 32, 33);
            this.add.image(540, 505,  'meat').setOrigin(0.5);
           
           
            delete burgerArray[1];
           // console.log("remove meat");
        }
        if(removeElement == "lettuce" && ingredientCount >= ingredientAmt){
           // background.putTilesAt([994+1,994+1,994+1], 32, 34);
            this.add.image(540, 515,  'lettuce').setOrigin(0.5);
           
           
            delete burgerArray[2];
           // console.log("remove lettuce");
        }
        if(removeElement == "topBun" && ingredientCount >= ingredientAmt){
            //background.putTilesAt([928+1, 929+1, 930+1], 32, 32);
            this.add.image(540, 520,  'bun1').setOrigin(0.5);

            
            delete burgerArray[3];
           // console.log("remove top bun")
        }
        console.log(burgerArray)
    }

}