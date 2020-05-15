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

        //Creates the obstacle groups for the parry and attacks
        this.attackGroup = this.add.group({
            runChildUpdate: true
        });
        this.parryGroup = this.add.group({
            runChildUpdate: true
        });

        //Creates the main player
        mainPlayer = new PlayerObject(this, centerX, centerY, 'playerSprite').setOrigin(0.5);

        //Adds physics to the player
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;


        //Debug
        this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){
        //Updates main player
        mainPlayer.update();

        //Debug
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }

    }
}