class EnemyObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture, ingredientKey){
        super(scene, x, y, texture);
        scene.add.existing(this);
        
        //Health of the enemy
        this.health = 60;
        //EnemyTesting
        this.health = 1;

        //Original Positions
        this.originalX = x;
        this.originalY = y;

        //States for attacking and being attacked 
        this.attacking = false;
        this.attackingNoise = 0;
        this.attackedByPlayer = false;

        //Creates a detection circle
        this.detectionField = this.scene.physics.add.sprite(this.x, this.y, 'detectionHitbox').setScale(8);
        this.detectionField.body.allowGravity = false;
        this.detectionField.alpha = 0;
        this.detectionField.body.setCircle(62);

        //Creates a variable to tell if it's being bounced back
        this.bouncingBack = false;

        //Creates a variable for Direction Facing
        //// 1 = right
        //// -1 = left
        this.directionFacing = 1;

        //Creates a variable for the living situation
        this.alive = true;

        //Ingredient key for which ingredient it is
        this.ingredientKey = ingredientKey;

        //Creates a variable to check if the enemy is voided or not
        this.voided = false;

    }

    create(){
        
    }

    update(){
        //Updates the detection field
        this.detectionFieldUpdate();

        //Checks the direction of the enemy
        if(!this.bouncingBack)
            this.checkDirection();

        //Resets bounceBack
        if(this.bouncingBack)
            this.resetBounce();

    }

    //Bounce back bounces the enemy backwards
    bounceBack(speed){
        this.bouncingBack = true;
        this.setVelocityX(speed * this.directionFacing * -1);
        this.setVelocityY(-1 * speed);
    }

    //Resets bounceback
    resetBounce(){
        //If it's not falling down then set bouncingBack to false
        if(this.body.velocity.y == 0){
            this.setVelocityX(0);
            this.bouncingBack = false;
        }
    }

    //Checks the direction of the player then updates the facing function
    checkDirection(){
        //If it's facing right
        if(this.body.velocity.x > 0)
            this.directionFacing = 1;

        //If it's facing left
        if(this.body.velocity.x < 0)
            this.directionFacing = -1;
    }

    //Move towards player
    detectionFieldUpdate(){
        //this.detectionField.body.velocity.x = this.body.velocity.x;
        //this.detectionField.body.velocity.y = this.body.velocity.y;

        this.detectionField.x = this.x;
        this.detectionField.y = this.y;
    }

    //Reset Attack
    resetAttacking(){
        this.attacking = false;
        this.attackingNoise = 0;
        this.setVelocityX(0);
        this.setAccelerationX(0);
    }

    //Lose health
    loseHealth(healthLost){
        if(this.attackedByPlayer){
            this.health -= healthLost;
            this.attackedByPlayer = false;
        }
    }

    //Checks if the enemy is still alive, if it isn't send it to the voice
    toTheVoid(){
        //Deleting objects straight up crashes the game
        //To the void they go.
        if(this.health <= 0){
            this.x = 69420;
            this.y = 69420
            this.detectionField.x = 69420;
            this.detectionField.y = 69420
            this.voided = true;
        }
        //Plays death noise
        this.scene.sound.play('enemyDie');
    }

}