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

    create(){
        //put the dialog here and do a slow pan down + typing out
        this.prologue = this.cache.json.get('prologue');
        console.log(this.prologue);

        cursors = this.input.keyboard.createCursorKeys();
        this.prologueText = this.add.text(this.TEXT_X, this.TEXT_Y, '', {align:'center'}).setOrigin(0.5);
        this.nextText = this.add.text(centerX, centerY+200, '').setOrigin(0.5);
        this.typeText();
       
    }
    update(){
        
     
        if(Phaser.Input.Keyboard.JustDown(cursors.space)&& !this.dialogTyping){
            this.typeText();
        }
     
    }

    typeText() {
        this.dialogTyping = true;
        this.prologueText.text = '';
        this.nextText.text = '';

        if(this.prologueLine >= this.prologue.length){
            //end the story scene if there's no more lines, return to menu
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
                        this.add.text(centerX, centerY+200,"press SPACE to continue").setOrigin(0.5);
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