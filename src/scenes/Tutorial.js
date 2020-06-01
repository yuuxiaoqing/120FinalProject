class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene")
    }
    create(){
           
        //INSTRUCTIONS 
        this.add.text(centerX, centerY - 100, 'SPACE to jump\n← → to move left & right\nZ to attack\nX to guard\nShift to dash', {fill: '#fff', align:'center'}).setOrigin(0.5);
        this.add.text(centerX, centerY , 'Bump into ingredients to collect them\nCollect enough to build a burger', {fill: '#fff', align:'center'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }
    }
}