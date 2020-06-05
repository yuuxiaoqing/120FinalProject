class Info extends Phaser.Scene{
    constructor(){
        super("infoScene")
        this.LINESPACE = 30;
    }
    create(){
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
        
        //add bg
        this.add.image(centerX, centerY, "infobg").setOrigin(0.5);
        //add info
        this.add.text(centerX, centerY-(this.LINESPACE*2), "Hi! We are Team Food Friends. Thank you for playing our game, Burger Quest★.",textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY-this.LINESPACE, "We were already friends before forming Team Food Friends.",textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, "All three of us love food, so all the games we made were food themed.",textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+(this.LINESPACE*1), "We encountered a lot of problems when making this game.",textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+(this.LINESPACE*2), "Building a game during the pandemic is extremely hard, but we made it!!",textConfig).setOrigin(0.5);
        
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