class Info extends Phaser.Scene{
    constructor(){
        super("infoScene")
    }
    create(){
        this.add.text(centerX, centerY, "info about the creators, optional page").setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }
    }
}