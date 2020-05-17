class EnemyObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        
        //Health of the enemy
        this.health = 3;

        //Original Positions
        this.originalX = x;
        this.originalY = y;

        //States
        this.attacking = false;

        //Creates the detection circle variable
        this.detectionField;    

        //Creates a variable to tell if it's being bounced back
        this.bouncingBack = false;

        //Creates a variable for Direction Facing
        //// 1 = right
        //// -1 = left
        this.directionFacing = 1;
    }

    create(){
        //Creates a detection circle
        this.detectionField = this.scene.physics.add.sprite(this.x, this.y, 'guardHitbox').setScale(1.75);
        this.detectionField.allowGravity = false;
    }

    update(){
        //Checks if a player is parrying the enemy
        if(this.scene.physics.world.overlap(this, this.parryGroup)){
            console.log("Enemy Parried");
            this.bounceBack(500);
        }

        //Checks if the player is attacking the enemy
        if(this.scene.physics.world.overlap(this, this.attackGroup)){
            console.log("Enemy Attacked");
            this.bounceBack(100);
        }
    }

    //Bounce back bounces the enemy backwards
    bounceBack(speed){
        this.bouncingBack = true;
        this.setVelocityX(speed * this.directionFacing * -1);
        this.scene.time.delayedCall(250, () => {
            this.bouncingBack = false;
        }, null, this);
    }

}