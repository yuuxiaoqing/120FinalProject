class Boot extends Phaser.Scene{
    //boot load
    constructor(){
        super("bootScene")
    }
    preload(){
        //preload the hamburger animation sprite sheet here
        this.load.atlas("loadsheet", "./assets/loadAssets/loadsheet.png", "./assets/loadAssets/loadsheet.json");
        this.load.image("team", "./assets/loadAssets/team.png");

        //preload the story jsons here
        this.load.json('prologue', './assets/json/prologue.json');
        this.load.json('badEnd', './assets/json/badEnd.json');
        this.load.json('goodEnd', './assets/json/goodEnd.json');

    }
    create(){
        //add team logo
        this.add.image(centerX, centerY, "team").setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
        //load the actual load scene after a delay
        this.clock = this.time.delayedCall(1000, ()=>{
            this.scene.start("loadScene");
        }, null, this);

    }
}