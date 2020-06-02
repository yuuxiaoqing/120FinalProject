class PlayerObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //Adds the object to the scene
        scene.add.existing(this);

        //Saves the original coordinates
        this.originalX = x;
        this.originalY = y;

        //Creates player health
        this.health = 10;

        //Creates Player Movement Variables
        this.speed = 250;
        this.movingLeft;
        this.movingRight;

        //Creates the jump variables
        this.jumping;
        this.jumpCount = 2;       
        
        //Creates state variables for attacking and dashing
        //// 0 = nothing
        //// 1 = action
        //// 2 = resetting
        this.attacking = 0;
        
        //Sets upt he dash state
        this.dashing = false;

        //Direction to check where a player is facing
        ////By default it's right
        //// -1 = left
        //// 1 = right
        this.playerFacing = 1;

        //Guarding state
        this.guarding = false;

        //Creates the parry variable
        this.parrying = false;

        //Invulun State
        this.invuln = false;
    }

    create(){
        
    }

    update(){
        //Runs the functions
        this.playerInputs();

        //Player is allowed to move if they're not dashing
        //And if they're not attacking
        if(!this.dashing && this.attacking == 0  && !this.guarding)
            this.playerMovement();

        //Player is dashing
        if(this.dashing && this.attacking == 0 && !this.guarding)
            this.dash();

        //Player is attacking, starts phase 1
        if(!this.dashing && this.attacking == 1 && !this.guarding)
            this.attack();

        //Player is guarding
        if(!this.dashing && this.attacking == 0 && this.guarding)
            this.guard();

        //Creates the parry
        if(this.parrying)
            this.parry();

    }

    //Player Inputs
    //Gets the player inputs and checks them, passes them to
    //playerMovement variables
    playerInputs(){
        //Checks Left
        if(playerLeft.isDown){
            this.movingLeft = true;
            this.playerFacing = -1;
        } else {
            this.movingLeft = false;
        }

        //Checks Right
        if(playerRight.isDown){
            this.movingRight = true;
            this.playerFacing = 1;
        } else {
            this.movingRight = false;
        }

        //Checks Jumping
        if(Phaser.Input.Keyboard.JustDown(playerJump)){
            this.jumping = true;
            console.log("Space is being Pressed");
        } else {
            this.jumping = false;
        }

        //If the player dashes it checks for one press
        if(Phaser.Input.Keyboard.JustDown(playerDash) && !this.dashing){
            this.dashing = true;
            console.log("Player is dashing");
        }

        //If the player dashes it checks for one press
        if(Phaser.Input.Keyboard.JustDown(playerAttack) && this.attacking == 0){
            this.attacking = 1;
            console.log("Player is attacking");
        }
        
        //Checks for guarding
        if(playerGuard.isDown){
            this.guarding = true;
            console.log("Player is guarding");
        } else {
            this.guarding = false;
        }

        //If the player dashes it checks for one press
        if(Phaser.Input.Keyboard.JustDown(playerGuard) && !this.parrying){
            this.parrying = true;
            console.log("Player is parrying");
        }

    }

    //Novement functions
    //Focuses on the player movement, moving left and right and jumping
    playerMovement(){
        //Left and Right Movement
        if(this.movingLeft)
            this.setVelocityX(-1 * this.speed);
        if(this.movingRight)
            this.setVelocityX(this.speed);

        if(!this.movingLeft && !this.movingRight)
            this.setVelocityX(0);
            
        //The Actual Jump
        if(this.jumpCount > 0 && this.jumping){
            this.setVelocityY(-500);
            this.jumpCount -= 1;
            this.scene.sound.play('jump');
        }

        //Jump collision stuff
        //Resets the jump
        if(this.body.onFloor() && this.jumpCount == 0 && this.body.velocity.y == 0){
            this.resetJump();
        }

        //Handles jumping on objects (all objects)
        if(this.jumpCount == 0 && this.body.velocity.y == 0  && !this.body.onCeiling()) {
            this.resetJump();
        }
    }

    //Resets the jump for use outside of this player object.
    resetJump(){
        this.jumpCount = 2;
    }

    //If the thing gets stuck push the player back up
    pushUp(){
        this.setVelocityY(-600);
    }

    //Player Dashing
    dash(){
        //Dashes the playe rand gets the speed and direction
        var dashSpeed = this.playerFacing * 800;
        this.setVelocityX(dashSpeed);
        this.setVelocityY(0);

        //After a short time it'll allow the player to move again
        //And also exit out of this function
        this.scene.time.delayedCall(250, () => {
            this.dashing = false;
        }, null, this);
    }

    //Player attacking method
    attack(){
        //Creates the attack hitbox and stuff
        var attackHitBox = this.scene.physics.add.sprite(this.x + (32 * this.playerFacing), this.y, 'attackHitbox').setOrigin(0.5);
        attackHitBox.body.allowGravity = false;
        this.scene.attackGroup.add(attackHitBox);
        this.attacking = 2;
        this.scene.sound.play('hit');

        //stops player from moving, then deletes the hitbox
        if(this.attacking == 2){
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.scene.time.delayedCall(100, () => {
                attackHitBox.destroy();
                this.scene.time.delayedCall(200, () => {
                    this.attacking = 0;
                }, null, this);
            }, null, this);
        }

    }

    //Player Guards
    guard(){
        this.setVelocityX(0);
    }

    //Creates the parry
    parry(){
        //Creates a parry hitbox, cannot be attacked
        var parryHitbox = this.scene.physics.add.sprite(this.x, this.y, 'parryHitbox').setScale(1.8).setOrigin(0.5);
        parryHitbox.body.allowGravity = false;
        parryHitbox.body.setCircle(16);
        this.scene.parryGroup.add(parryHitbox);
        this.scene.time.delayedCall(50, () => {
            parryHitbox.destroy();
        }, null, this);        
        this.parrying = false;
    }

    //Lose health and sets invuln
    loseHealth(){
        //Only works if player is NOT invulnerable
        if(!this.invuln && !this.guarding){
            this.health -= 1;
            this.alpha = 0.5;
            this.invuln = true;
            this.pushUp();
            this.scene.time.delayedCall(1000, () => {
                this.invuln = false;
                this.alpha = 1;
            }, null, this);   
        }

        if(this.health <= 0 && !this.invuln){
            this.invuln = true;
            this.scene.time.delayedCall(1000, () => {
                this.x = centerX;
                this.y = centerY;
                this.health = 10;
                
            }, null, this); 
        }
    }
    
}