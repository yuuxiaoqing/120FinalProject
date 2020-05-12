// Our Play scene

class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    preload(){

    }
    create(){

        this.add.text(centerX, centerY - 200, 'PLAY SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }

    }
}