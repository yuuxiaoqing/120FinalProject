class BurgerCompiler extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y){
        super(scene, x, y, 'plate');

        //Adds the object to the scene
        scene.add.existing(this);

        //Original Position
        this.ogX = x;
        this.ogY = y;

        //Array that holds the sprites of the pieces being added
        this.burgerPieces = [];

        //Burger Complete Variable
        this.burgerComplete = false;

    }

    update(){
    }

    //Builds the burger visually so it looks like a burger
    buildBurger(){
        this.deleteBurger();
        console.log("Building Burger...");
        //For the top and bottom bun
        var bunCount = 0;
        //For the placement of ingredients
        var yPlacement = this.y - 16;

        //Goes through the array to add ingrients in order
        for(var i = 0; i < burgerArray.length; i++){
            console.log("Spot: " + i +" is Ingredient Number: " + burgerArray[i]);
            //Switch statements to add the burger stuff
            switch(burgerArray[i]){
                //Adds the bun, checks if a bottom bun has been placed or not
                case 1:
                    if(bunCount == 0){
                        var burgerPiece = this.scene.physics.add.sprite(this.x, yPlacement, 'bun1').setOrigin(0.5);
                        burgerPiece.body.allowGravity = false;
                        this.burgerPieces.push(burgerPiece);
                    } else if(bunCount == 1){
                        var burgerPiece = this.scene.physics.add.sprite(this.x, yPlacement, 'bun2').setOrigin(0.5);
                        burgerPiece.body.allowGravity = false;
                        this.burgerPieces.push(burgerPiece);
                    }
                    bunCount++;
                    yPlacement -= 16;
                    break;
                
                //If it's meat add meat, increment by 16
                case 2:
                    var burgerPiece = this.scene.physics.add.sprite(this.x, yPlacement, 'meat').setOrigin(0.5);
                    burgerPiece.body.allowGravity = false;
                    this.burgerPieces.push(burgerPiece);
                    yPlacement -= 16;
                    break;

                //If it's lettuce add lettuce, increment by 16
                case 3:
                    var burgerPiece = this.scene.physics.add.sprite(this.x, yPlacement, 'lettuce').setOrigin(0.5);
                    burgerPiece.body.allowGravity = false;
                    this.burgerPieces.push(burgerPiece);
                    yPlacement -= 16;
                    break;
            }
        }

        //Checks if the burger is completed or not
        if(burgerArray.length == 4)
            this.burgerComplete = true;
    }

    //Clears the burger sprites so it doesn't make like 3 billion and crash the fucking game
    deleteBurger(){
        console.log(this.burgerPiece);
        if(this.burgerPieces != null){
            for(var i = 0; i < this.burgerPieces.length; i++){
                this.burgerPieces[i].destroy();
            }
        }
    }

    
    //Adds ingredients to the burger
    addIngredient(ingredientObj){
        //Special Case for buns
        if(ingredientObj == 1){
            //If it's an empty array the shove that baby in.
            if(burgerArray.length == 0){
                console.log("Burger Empty, placing bun");
                console.log(burgerArray);
                burgerArray.push(ingredientObj);
                console.log(burgerArray);
            } else if(burgerArray.length > 0){
                console.log(burgerArray);
                console.log("Burger Not Empty, checking...");
                console.log(burgerArray);
                //If it's not empty, check if a bun has been placed.
                //If there isn't a bun, put at the bottom
                if(burgerArray.indexOf(1) == -1){
                    console.log("No Bun has been placed, shifting and placing");
                    //Copies array
                    var temp = [];
                    for(var i = 0; i < burgerArray.length; i++){
                        temp.push(burgerArray[i]);
                    }
                    burgerArray = [];
                    burgerArray[0] = 1;
                    //Readds everything back into the array
                    for(var i = 0; i < temp.length; i++){
                        burgerArray.push(temp[i]);
                    }
                } else if(burgerArray.indexOf(1) > -1){
                    console.log("Bun placed adding top");
                    //If bun is in the array, then plop it on top
                    burgerArray.push(1);
                }
            }
        }

        //If it's not a bun
        if(ingredientObj != 1){
            //Checks if the top bun is placed, if it is, replace with ingredient then put bun on top.
            if(burgerArray[burgerArray.length - 1] == 1 && burgerArray.length > 1){
                burgerArray[burgerArray.length - 1] = ingredientObj;
                burgerArray.push(1);
            } else{
                //If there isn't a bun just put the ingredient on top.
                burgerArray.push(ingredientObj);
            }
        }
    }
    

}