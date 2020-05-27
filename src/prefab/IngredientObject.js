class IngredientObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture, ingredientNumber){
        super(scene, x, y, texture);
        
        //Ingredient Key
        /// 1 - Buns
        /// 2 - Meat
        /// 3 - Lettuce
        this.ingredientKey = ingredientNumber;
    }

    update(){

    }

}