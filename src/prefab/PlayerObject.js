class PlayerObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //Adds the object to the scene
        scene.add.existing(this);

        //Creates player health
        this.health = 10;

        //Creates Player Movement Variables
        this.speed = 300;
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

        //Resets generic animation
        //if(!playerJump.isDown && !playerRight.isDown && !playerLeft.isDown)
        //    this.setTexture('playerSprite');

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
        this.setVelocityY(-500);
    }

    //Lets the player lose health, only if they're invuln
    //If not this wont work.
    loseHealth(){
        //Cant lose health if you're invuln
        if(this.invuln == 0){
            //Subtracts health
            this.health -= 1;
            //Pushes player up
            this.pushUp();
            
            //Sets invulun
            this.invuln = 1;

            //Invuln timer gonne
            this.scene.time.delayedCall(500, () => {
                this.invuln = 0;
            }, null, this);
        }
    }

    //Player Dashing
    dash(){
        //Dashes the playe rand gets the speed and direction
        var dashSpeed = this.playerFacing * 2000;
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
        var attackHitBox = this.scene.physics.add.sprite(this.x + (124 * this.playerFacing), this.y, 'attackHitbox');
        attackHitBox.body.allowGravity = false;
        this.scene.attackGroup.add(attackHitBox);
        this.attacking = 2;

        //stops player from moving, then deletes the hitbox
        if(this.attacking == 2){
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.scene.time.delayedCall(100, () => {
                attackHitBox.destroy();
                this.attacking = 0;
            }, null, this);
        }
    }

    //Player Guards
    guard(){
        this.setVelocityX(0);
        this.invuln = 1;
    }

    //Creates the parry
    parry(){
        //Creates a parry hitbox, cannot be attacked
        var parryHitbox = this.scene.physics.add.sprite(this.x, this.y, 'guardHitbox').setScale(1.75);
        parryHitbox.body.allowGravity = false;
        this.scene.parryGroup.add(parryHitbox);
        this.scene.time.delayedCall(100, () => {
            parryHitbox.destroy();
        }, null, this);        
        this.parrying = false;
    }





}