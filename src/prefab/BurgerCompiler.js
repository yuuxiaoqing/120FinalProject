class PlayerObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.ogX = x;
        this.ogY = y;
    }

    update(){

    }

}