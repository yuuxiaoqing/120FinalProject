// Our Menu scene

class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){

    }
    create(){
        //music stuff
        if(gameSong.isPlaying)
            gameSong.stop();
        if(creditSong.isPlaying)
            creditSong.stop();
        if(!menuSong.isPlaying)
            menuSong.play();


        this.cameras.main.setBackgroundColor(0xA3E01D);
        this.add.image(centerX, centerY, 'title');
        let textConfig = {
            fontFamily: 'VT323',
            fill: '#2f631c',
            fontSize: '40px'
        }
        
        let textConfig2 = {
            fontFamily: 'VT323',
            fill: '#ffab24',
            fontSize: '45px'
        }
        
        //start button, start prologue
        this.start = this.add.text(centerX, centerY+250, "start game", textConfig).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.start.setStyle(textConfig2);
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("prologueScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.start.setStyle(textConfig2); })
        .on('pointerout', ()=>{this.start.setStyle(textConfig); });
        //tutorial button
        this.tutorial = this.add.text(centerX-400, centerY+250, "how to play", textConfig).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.tutorial.setStyle(textConfig2)
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("tutorialScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.tutorial.setStyle(textConfig2); })
        .on('pointerout', ()=>{this.tutorial.setStyle(textConfig); });
        //credit button
        this.credits = this.add.text(centerX+310, centerY+250, "credits", textConfig).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.credits.setStyle(textConfig2)
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("creditScene");
        }, null, this)
        })
        .on('pointerover', ()=>{this.credits.setStyle(textConfig2); })
        .on('pointerout', ()=>{this.credits.setStyle(textConfig); });

        //about us button
        this.about = this.add.text(centerX+310, centerY-300, "about us", textConfig).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.about.setStyle(textConfig2)
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("infoScene");
        }, null, this)
        })
        .on('pointerover', ()=>{this.about.setStyle(textConfig2); })
        .on('pointerout', ()=>{this.about.setStyle(textConfig); });
        
    }
    
}