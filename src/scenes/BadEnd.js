class BadEnd extends Phaser.Scene{
    //tweaked from Prof.Nathan's dialog example
    constructor(){
        super("badEndScene");
   
        this.TEXT_X = centerX;
        this.TEXT_Y = centerY;
        //how fast the letters appear
        this.LETTER_TIMER = 10;
        //counter for lines
        this.badEndLine = 0;
        //check if the letters are still appearing
        this.badEndTyping = false;

    }

    create(){
        //put the bad end story here and typing out
        //get the bad end story json
        this.badEnd = this.cache.json.get('badEnd');
        console.log(this.prologue);

        cursors = this.input.keyboard.createCursorKeys();
        this.badEndText = this.add.text(this.TEXT_X, this.TEXT_Y, '', {align:'center'}).setOrigin(0.5);
        this.typeText();

      
       
    }
    update(){
        
     
        if(Phaser.Input.Keyboard.JustDown(cursors.space)&& !this.dialogTyping){
            this.typeText();
        }
     
    }

    typeText() {
        this.badEndTyping = true;
        this.badEndText.text = '';
    

        if(this.badEndLine >= this.badEnd.length){
            //end the story scene if there's no more lines, return to menu
              //retry button
            this.restart = this.add.text(centerX, centerY+250, "Try again?", {fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', ()=>{this.restart.setStyle({fill:'#fa0', fontSize: '50px',fontFamily: 'Caveat Brush'});
            this.clock = this.time.delayedCall(100, () =>{
                this.scene.start("playScene");
             }, null, this);
            })
            .on('pointerover', ()=>{this.restart.setStyle({fill:'#fa0',fontSize: '50px',fontFamily: 'Caveat Brush'}); })
            .on('pointerout', ()=>{this.restart.setStyle({fill:'#2f631c', fontSize: '40px',fontFamily: 'Caveat Brush'}); });
        
            console.log("end of bad end")
        }else{
            this.badEndLines = this.badEnd[this.badEndLine]['bad'];

            this.add.text(this.badEndLines);
            let currentChar = 0;

            //type out each letter one by one
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.badEndLines.length - 1,
                callback: () => {
                    this.badEndText.text += this.badEndLines[currentChar];
                    currentChar++;
                    
                    if(this.textTimer.getRepeatCount() == 0){
                        this.badEndTyping = false;
                        this.add.text(centerX, centerY+200, "press SPACE to continue").setOrigin(0.5);
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this
            });
            //go to the next line
            this.badEndLine++;
            console.log(this.badEndLine)
        }
       

    }


}