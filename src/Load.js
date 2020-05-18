// Our Load scene

class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }
    preload(){
        //Player Sprites
    }
    create(){
        this.cameras.main.setBackgroundColor(0xE6B61C);
        //console.log(this.cameras.main);
        this.add.text(centerX, centerY - 200, 'LOAD SCENE\nPRESS S TO SKIP TO NEXT SCENE', {fill: '#fff', align:"center"}).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.add.text(centerX, centerY - 100, 'by Angela, Xiao Qing, & Niko', {fill: '#fff', align:'center'}).setOrigin(0.5);
        this.add.text(centerX, centerY, '----in progress burger----', {fill: '#fff', align:'center'}).setOrigin(0.5);
        this.add.text(centerX, centerY +40, 'this.cameras.main.startFollow(burger, 0.25,0.25);', {fill: '#fff', align:'center'}).setOrigin(0.5);
    }   
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }

    }
}