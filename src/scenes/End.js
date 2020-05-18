// Our Play scene

class End extends Phaser.Scene{
    constructor(){
        super('endScene');
    }
    preload(){

    }
    create(){
        this.cameras.main.setBackgroundColor(0xA3E01D);
        this.add.text(centerX, centerY - 200, 'END SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff', align:'center'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.add.text(centerX, centerY - 100, 'Thank you for playing our Hamburger game demo!!', {fill: '#fff', align:'center'}).setOrigin(0.5);
        
    }   
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('creditScene');
        }

    }
}