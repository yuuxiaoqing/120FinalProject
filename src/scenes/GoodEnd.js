// Our Play scene

class GoodEnd extends Phaser.Scene{
    //tweaked from Prof.Nathan's dialog example
    constructor(){
        super("goodEndScene");
        //center the text
        this.TEXT_X = centerX;
        this.TEXT_Y = centerY + 100;
        
        //how fast the letters appear
        this.LETTER_TIMER = 10;
        //counter for lines
        this.goodEndLine = 0;
        //check if the letters are still appearing
        this.goodEndTyping = false;
    }

    create(){
        //Music stuff
        if(gameSong.isPlaying)
            gameSong.stop();
        if(!creditSong.isPlaying)
            creditSong.play();
        if(menuSong.isPlaying)
            menuSong.stop();
        //put the good end story here and type it out letter by letter out
        //get the good end story json
        this.goodEnd = this.cache.json.get('goodEnd');
        //console.log(this.goodEnd);
        let textConfig = {
            fontFamily: 'VT323',
            fill: '#ffffff',
            fontSize: '30px',
            align: "center",
            
        }

        //add storybg
        this.add.image(centerX,centerY, 'storybg').setOrigin(0.5);
        //for transitioning story lines
        cursors = this.input.keyboard.createCursorKeys();
        this.goodEndText = this.add.text(this.TEXT_X, this.TEXT_Y, '', textConfig).setOrigin(0.5);
        this.typeText();
        this.spaceText = this.add.text(centerX, centerY + 175, "press SPACE to continue").setOrigin(0.5);
        this.add.image(centerX,centerY - 100, 'endgame').setOrigin(0.5);

       
    }
    update(){
        
        
        if(Phaser.Input.Keyboard.JustDown(cursors.space)&& !this.dialogTyping){
            this.typeText();
        }
     
    }

    typeText() {
        this.dialogTyping = true;
        this.goodEndText.text = '';
      
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
        if(this.goodEndLine >= this.goodEnd.length){
            //end the story scene if there's no more lines, return to menu
            console.log("end of good end")
            this.goodEndLine = 0; 
            this.spaceText.destroy();
            console.log(this.spaceText)
           

            //return to menu button
            this.menu = this.add.text(centerX, centerY+200, "return to menu", textConfig).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', ()=>{this.menu.setStyle(textConfig2);
            this.clock = this.time.delayedCall(100, () =>{
                this.scene.start("menuScene");
            }, null, this);
            })
            .on('pointerover', ()=>{this.menu.setStyle(textConfig2); })
            .on('pointerout', ()=>{this.menu.setStyle(textConfig); });
        
            //this.scene.start("menuScene")
        }else{
            this.goodEndLines = this.goodEnd[this.goodEndLine]['good'];

            this.add.text(this.goodEndLines);
            let currentChar = 0;
           
            //type out each letter one by one
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.goodEndLines.length - 1,
                callback: () => {
                    this.goodEndText.text += this.goodEndLines[currentChar];
                    currentChar++;
                    
                    if(this.textTimer.getRepeatCount() == 0){
                        this.dialogTyping = false;
                        this.spaceText.setText("press SPACE to continue").setOrigin(0.5);
                        //this.spaceText.setVisible(true);
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this
            });
            //go to the next line
            this.goodEndLine++;
            console.log(this.goodEndLine)
        }
       

    }


}