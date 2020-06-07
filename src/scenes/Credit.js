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
            fontFamily: 'VT323',
            fill: '#ffffff',
            fontSize: '30px',
            align: "center",
            
        }
         
        let textConfig2 = {
            fontFamily: 'VT323',
            fill: '#fa0',
            fontSize: '50px'
        }
        
        //add credit bg
        this.add.image(centerX, centerY, "creditbg").setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'Burger Quest★\nis made by Angela Jiang, Xiao Qing Yu, & Nikolas Sanchez', textConfig).setOrigin(0.5);

        //music credit text
        this.add.text(centerX, centerY + 50, 'Music credits: \"Le Grand Chase\" Kevin MacLeod (incompetech.com)\n\"Cupid\'s Revenge\" Kevin MacLeod (incompetech.com)\n\"Midnight Tale\" Kevin MacLeod \(incompetech.com\)\nLicensed under Creative Commons: By Attribution 4.0 License\nhttp://creativecommons.org/licenses/by/4.0/', textConfig).setOrigin(0.5);
        
         //return to menu button
         this.menu = this.add.text(centerX, centerY+250, "return to menu", textConfig).setOrigin(0.5)
         .setInteractive()
         .on('pointerdown', ()=>{this.menu.setStyle(textConfig2);
         this.clock = this.time.delayedCall(100, () =>{
             this.scene.start("menuScene");
         }, null, this);
         })
         .on('pointerover', ()=>{this.menu.setStyle(textConfig2); })
         .on('pointerout', ()=>{this.menu.setStyle(textConfig); });
         
   
    }
}