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
        
         //return to menu button
         this.menu = this.add.text(centerX, centerY+250, "return to menu", {fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}).setOrigin(0.5)
         .setInteractive()
         .on('pointerdown', ()=>{this.menu.setStyle({fill:'#fa0', fontSize: '50px',fontFamily: 'Caveat Brush'});
         this.clock = this.time.delayedCall(100, () =>{
             this.scene.start("menuScene");
         }, null, this);
         })
         .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0',fontSize: '50px',fontFamily: 'Caveat Brush'}); })
         .on('pointerout', ()=>{this.menu.setStyle({fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}); });
         
   
    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }

    }
}