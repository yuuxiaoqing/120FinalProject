class Prologue extends Phaser.Scene{
    //tweaked from Prof.Nathan's dialog example
    constructor(){
        super("prologueScene");
        //center the text
        this.TEXT_X = centerX;
        this.TEXT_Y = centerY;
        //how fast the letters appear
        this.LETTER_TIMER = 10;
        //counter for lines
        this.prologueLine = 0;
        //check if the letters are still appearing
        this.prologueTyping = false;

       

    }
    preload(){
        this.load.json('prologue', './assets/json/prologue.json');
    }

    create(){
        //put the dialog here and do a letter by letter type out
        this.prologue = this.cache.json.get('prologue');
        //console.log(this.prologue);
        let textConfig = {
            fontFamily: 'VT323',
            fill: '#ffffff',
            fontSize: '30px',
            align: "center",
            
        }
        let textConfig2 = {
            fontFamily: 'VT323',
            fill: '#fa0',
            fontSize: '35px'
        }
        //add the story bg
        this.add.image(centerX,centerY, "storybg").setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
        this.prologueText = this.add.text(this.TEXT_X, this.TEXT_Y, '', textConfig).setOrigin(0.5);
        this.nextText = this.add.text(centerX, centerY+200, '').setOrigin(0.5);
         //skip prologue button
        this.skip = this.add.text(centerX+310, centerY+200, "skip prologue\n&\nstart game", textConfig).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.skip.setStyle(textConfig2);
        this.clock = this.time.delayedCall(100, () =>{
            this.scene.start("playScene");
        }, null, this);
        })
        .on('pointerover', ()=>{this.skip.setStyle(textConfig2); })
        .on('pointerout', ()=>{this.skip.setStyle(textConfig); });
        this.typeText();

        this.spaceText = this.add.text(centerX, centerY+180, "press SPACE to continue").setOrigin(0.5);
       
    }
    update(){
        //transition throuhgh prologue
        if(Phaser.Input.Keyboard.JustDown(cursors.space)&& !this.dialogTyping){
            this.typeText();
        }
     
    }

    typeText() {

        this.dialogTyping = true;
        this.prologueText.text = '';
        this.nextText.text = '';

        if(this.prologueLine >= this.prologue.length){
            //console.log("prologueLine: ",this.prologueLine, "prologuelength: ", this.prologue.length)
            //end the story scene if there's no more lines, start game
            this.prologueLine = 0;
            this.spaceText.destroy();
            console.log("end of prologue")
            this.scene.start("playScene");
        }else{
            this.prologueLines = this.prologue[this.prologueLine]['prologue'];

            this.add.text(this.prologueLines);
            let currentChar = 0;

            //type out each letter one by one
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.prologueLines.length - 1,
                callback: () => {
                    this.prologueText.text += this.prologueLines[currentChar];
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
            this.prologueLine++;
            console.log(this.prologueLine)
        }
       

    }


}