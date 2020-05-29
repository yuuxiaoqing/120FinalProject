// Our Menu scene

class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){

    }
    create(){
        this.cameras.main.setBackgroundColor(0xA3E01D);
        this.add.image(centerX, centerY, 'title');
        let textConfig = {
            fontFamily: 'Caveat Brush',
            fill: '#ffffff',
            fontSize: '40px'
        }
        //this.add.text(centerX, centerY + 250, 'PRESS S TO START', textConfig).setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //start button
        this.start = this.add.text(centerX, centerY+250, "start game", {fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.start.setStyle({fill:'#fa0', fontSize: '50px',fontFamily: 'Caveat Brush'});
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("playScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.start.setStyle({fill:'#fa0',fontSize: '50px',fontFamily: 'Caveat Brush'}); })
        .on('pointerout', ()=>{this.start.setStyle({fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}); });
        //tutorial button
        this.tutorial = this.add.text(centerX-400, centerY+250, "how to play", {fill:'#2f631c', fontSize: '32px',fontFamily: 'Caveat Brush'}).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.tutorial.setStyle({fill:'#fa0', fontSize: '40px',fontFamily: 'Caveat Brush'})
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("tutorialScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.tutorial.setStyle({fill:'#fa0',fontSize: '40px',fontFamily: 'Caveat Brush'}); })
        .on('pointerout', ()=>{this.tutorial.setStyle({fill:'#2f631c', fontSize: '32px',fontFamily: 'Caveat Brush'}); });
        //credit button
        this.credits = this.add.text(centerX+330, centerY+250, "credits", {fill:'#2f631c', fontSize: '32px',fontFamily: 'Caveat Brush'}).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.credits.setStyle({fill:'#fa0', fontSize: '40px',fontFamily: 'Caveat Brush'})
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("creditScene");
        }, null, this)
        })
        .on('pointerover', ()=>{this.credits.setStyle({fill:'#fa0',fontSize: '40px',fontFamily: 'Caveat Brush'}); })
        .on('pointerout', ()=>{this.credits.setStyle({fill:'#2f631c', fontSize: '32px',fontFamily: 'Caveat Brush'}); });

        //about us button
        this.about = this.add.text(centerX+330, centerY-300, "about us", {fill:'#2f631c', fontSize: '32px',fontFamily: 'Caveat Brush'}).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.about.setStyle({fill:'#fa0', fontSize: '40px',fontFamily: 'Caveat Brush'})
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("infoScene");
        }, null, this)
        })
        .on('pointerover', ()=>{this.about.setStyle({fill:'#fa0',fontSize: '40px',fontFamily: 'Caveat Brush'}); })
        .on('pointerout', ()=>{this.about.setStyle({fill:'#2f631c', fontSize: '32px',fontFamily: 'Caveat Brush'}); });
        
    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('playScene');
        }

    }
}