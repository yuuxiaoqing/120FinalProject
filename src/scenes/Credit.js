// Our Load scene

class Credit extends Phaser.Scene{
    constructor(){
        super('creditScene');
    }
    preload(){

    }
    create(){

        this.cameras.main.setBackgroundColor(0xE6B61C);
        this.add.text(centerX, centerY - 200, 'CREDIT SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff', align:'center'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.add.text(centerX, centerY - 100, 'by Angela, Xiao Qing, & Niko', {fill: '#fff', align:'center'}).setOrigin(0.5);

        this.add.text(centerX, centerY, '----in progress burger----', {fill: '#fff', align:'center'}).setOrigin(0.5);
    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }

    }
}