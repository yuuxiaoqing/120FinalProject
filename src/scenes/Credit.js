// Our Load scene

class Credit extends Phaser.Scene{
    constructor(){
        super('creditScene');
    }
    preload(){

    }
    create(){

        this.cameras.main.setBackgroundColor(0xE6B61C);
        let textConfig = {
            fontFamily: 'Caveat Brush',
            fill: '#ffffff',
            fontSize: '30px',
            align: 'center'
        }
        //add credit bg
        this.add.image(centerX, centerY, "creditbg").setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'Burger Quest★\nis made by Angela Jiang, Xiao Qing Yu, & Nikolas Sanchez', textConfig).setOrigin(0.5);
        
        //music credit text
        this.add.text(centerX, centerY, 'Music credits:', textConfig).setOrigin(0.5);
        
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
}