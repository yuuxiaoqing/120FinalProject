class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene")
    }
    create(){
           
       
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        const tutorial = this.add.tilemap('tutorialLevel');
        const groundSprites = tutorial.addTilesetImage("groundsheet", 'groundsheet');
        ground = tutorial.createStaticLayer("ground",groundSprites,0,0);
        ground.setCollisionByProperty({collide:true});


        /* PLAYER CODE */
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        playerGuard = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        playerDash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //Creates the main player in tutorial
        mainPlayer = new PlayerObject(this, 82, 50, 'playerPrototype').setOrigin(0.5);
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;
        //make sure mainPlayer don't fall through the ground
        this.physics.add.collider(mainPlayer, ground);  

        //Instruction bar: need to prettify
        this.instructionBar = this.add.rectangle(centerX, 40, width, height/5, 0xe6ad12).setOrigin(0.5).setScrollFactor(0);
        this.add.text(centerX, 50, "UP to jump, ← → to move left & right, Z to attack, X to guard, Shift to dash\n\nBump into ingredients to collect them\n\nCollect enough to build a burger", {fill: '#fff', align:'center'}).setOrigin(0.5).setScrollFactor(0);
        
        //Camera
        this.physics.world.bounds.setTo(0,0,tutorial.widthInPixels, tutorial.heightInPixels);
        this.cameras.main.setBounds(0,0, tutorial.widthInPixels, tutorial.heightInPixels);
        this.cameras.main.startFollow(mainPlayer, true, 0.15,0.15);
        
        //Back button
        this.menu = this.add.text(70, 50, "menu", {fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill:'#fa0', fontSize: '50px',fontFamily: 'Caveat Brush'});
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("menuScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0',fontSize: '50px',fontFamily: 'Caveat Brush'}); })
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}); }).setScrollFactor(0);
    
    
    
    
    
    }

    update(){

        //Updates main player
        mainPlayer.update();
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }
    }
}