// Our Menu scene

class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){

    }
    create(){

        this.add.text(centerX, centerY - 200, 'MENU SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('playScene');
        }

    }
}