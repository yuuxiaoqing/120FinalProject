// Our Play scene

class GoodEnd extends Phaser.Scene{
    //tweaked from Prof.Nathan's dialog example
    constructor(){
        super("goodEndScene");
        //center the text
        this.TEXT_X = centerX;
        this.TEXT_Y = centerY;
        
        //how fast the letters appear
        this.LETTER_TIMER = 10;
        //counter for lines
        this.goodEndLine = 0;
        //check if the letters are still appearing
        this.goodEndTyping = false;

    }

    create(){
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
       
    }
    update(){
        
     
        if(Phaser.Input.Keyboard.JustDown(cursors.space)&& !this.dialogTyping){
            this.typeText();
        }
     
    }

    typeText() {
        this.dialogTyping = true;
        this.goodEndText.text = '';
        
        this.spaceText = this.add.text(centerX, centerY+200, "").setOrigin(0.5);
        let textConfig = {
            fontFamily: 'VT323',
            fill: '#2f631c',
            fontSize: '40px'
        }
        
        let textConfig2 = {
            fontFamily: 'VT323',
            fill: '#fa0',
            fontSize: '50px'
        }
        if(this.goodEndLine >= this.goodEnd.length){
            //end the story scene if there's no more lines, return to menu
            console.log("end of good end")
            
            this.spaceText.destroy();
              //retry button
            this.menu = this.add.text(centerX, centerY+250, "return to menu", textConfig).setOrigin(0.5)
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