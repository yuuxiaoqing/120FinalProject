// Our Menu scene

class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){

    }
    create(){
        this.cameras.main.setBackgroundColor(0xA3E01D);
        this.add.text(centerX, centerY - 200, 'MENU SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff', align:'center'}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //INSTRUCTIONS
        this.add.text(centerX, centerY - 100, 'SPACE to jump\n← → to move left & right\nZ to attack\nX to guard\nShift to dash', {fill: '#fff', align:'center'}).setOrigin(0.5);
        this.add.text(centerX, centerY , 'Bump into ingredients to collect them\nCollect enough to build a burger', {fill: '#fff', align:'center'}).setOrigin(0.5);
    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('playScene');
        }

    }
}