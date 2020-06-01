class Boot extends Phaser.Scene{
    //boot load
    constructor(){
        super("bootScene")
    }
    preload(){
        //preload the hamburger animation sprite sheet here
        this.load.atlas("loadsheet", "./assets/loadAssets/loadsheet.png", "./assets/loadAssets/loadsheet.json");
        this.load.image("team", "./assets/loadAssets/team.png");

        //preload the prologue here
        this.load.json('prologue', './assets/prologue.json');
        this.load.json('badEnd', './assets/badEnd.json');
        this.load.json('goodEnd', './assets/goodEnd.json');

        this.load.bitmapFont('gem_font', './assets/gem.png','./assets/gem.xml');
    }
    create(){
        //add team logo
        this.add.image(centerX, centerY, "team").setOrigin(0.5);
       // this.add.bitmapText(centerX, centerY -32, "gem_font", "testing", 32).setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
        this.clock = this.time.delayedCall(1000, ()=>{
            this.scene.start("loadScene");
        }, null, this);

    }
}