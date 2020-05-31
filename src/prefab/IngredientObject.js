class IngredientObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, ingredientNumber){
        super(scene, x, y);

        //Adds the object to the scene
        scene.add.existing(this);

        //Ingredient Key
        /// 1 - Buns
        /// 2 - Meat
        /// 3 - Lettuce
        this.ingredientKey = ingredientNumber;

        switch(ingredientNumber){
            case 1:
                this.setTexture('bunsDroppable');
                break;
            case 2:
                this.setTexture('burgerDroppable');
                break;
            case 3:
                this.setTexture('lettuceDroppable')
                break;
        }
    }

    update(){

    }

}