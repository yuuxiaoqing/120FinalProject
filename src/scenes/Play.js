// Our Play scene
class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }

    //Preload
    preload(){
        this.load.image('playerSprite', './assets/penisfuckjesus.png');
        this.load.image('attackHitbox', './assets/attacktemp.png');
        this.load.image('guardHitbox', './assets/guardtemp.png');
        this.load.image('enemytemp', './assets/enemytemp.png');
    }

    //Create Function
    create(){
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        playerGuard = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        playerDash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

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

        //Creates the main player
        mainPlayer = new PlayerObject(this, centerX + 200, centerY, 'playerSprite').setOrigin(0.5);

        //Adds physics to the player
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;

        //Debug
        this.enemy = new EnemyObject(this, centerX, centerY, 'enemytemp').setOrigin(0.5);
        this.physics.add.existing(this.enemy);
        this.enemy.body.collideWorldBounds = true;



        //Debug
        this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    
    update(){
        //Updates main player
        mainPlayer.update();
        this.enemy.update();

        //Debug
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }

        if(this.enemy.attacking){
            this.physics.accelerateTo(this.enemy, mainPlayer.x, this.enemy.y, 500, 1000);
        }

        if(this.physics.overlap(this.enemy.detectionField, mainPlayer)){
            this.enemy.attacking = true;
        } else {
            this.enemy.resetAttacking();
        }


        //Checks if a player is parrying the enemy
        if(this.physics.overlap(this.enemy, this.parryGroup)){
            console.log("Enemy Parried");
            this.enemy.bounceBack(500);
        }

        //Checks if the player is attacking the enemy
        if(this.physics.overlap(this.enemy, this.attackGroup)){
            console.log("Enemy Attacked");
            this.enemy.bounceBack(100);
        }

    }
}