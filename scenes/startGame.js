let mapLoad;
class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
   // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');
    
  }
  create() {
	
    gameStats = JSON.parse(localStorage.getItem('cityStats'));
    if (gameStats === null || gameStats.length <= 0) {
      localStorage.setItem('cityStats', JSON.stringify(defaultStats));
      gameStats = defaultStats;
    }
	 var bg = this.add.image(game.config.width / 2, game.config.height, 'skyline', 0).setOrigin(.5, 1);
    this.cameras.main.setBackgroundColor(0xf7eac6);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'CityBuilder', 150).setOrigin(.5).setTint(0xc76210);

    var startNew = this.add.bitmapText(game.config.width / 2, 275, 'topaz', 'New Game', 50).setOrigin(.5, .5).setTint(0x000000);
    startNew.setInteractive();
    startNew.on('pointerdown', this.clickHandler, this);
    
    var mOption1 = this.add.image(50, 375, 'maps', 0).setOrigin(0).setInteractive();
    mOption1.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:30,
        height: 30,
        eastCost: false,
        westCost: false,
        northCost: false,
        southCost: false,
        eWRiver: false,
        nSRiver: false,
        numLakes: 0
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption2 = this.add.image(200, 375, 'maps', 1).setOrigin(0).setInteractive();
    mOption2.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:40,
        height: 40,
        eastCost: false,
        westCost: false,
        northCost: true,
        southCost: false,
        eWRiver: false,
        nSRiver: false,
        numLakes: 2
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption3 = this.add.image(350, 375, 'maps', 2).setOrigin(0).setInteractive();
    mOption3.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:40,
        height: 40,
        eastCost: false,
        westCost: false,
        northCost: false,
        southCost: false,
        eWRiver: false,
        nSRiver: true,
        numLakes: 1
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption4 = this.add.image(500, 375, 'maps', 3).setOrigin(0).setInteractive();
    mOption4.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:50,
        height: 50,
        eastCost: true,
        westCost: false,
        northCost: false,
        southCost: true,
        eWRiver: false,
        nSRiver: false,
        numLakes: 2
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
   var mOption5 = this.add.image(650, 375, 'maps', 4).setOrigin(0).setInteractive();
    mOption5.on('pointerdown', function(){
      mapLoad = 'new';
       mapConfig = {
        width:50,
        height: 50,
        eastCost: false,
        westCost: true,
        northCost: false,
        southCost: false,
        eWRiver: true,
        nSRiver: false,
        numLakes: 3
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption6 = this.add.image(50, 500, 'maps', 5).setOrigin(0).setInteractive();
    mOption6.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:60,
        height: 60,
        eastCost: false,
        westCost: true,
        northCost: false,
        southCost: false,
        eWRiver: false,
        nSRiver: false,
        numLakes: 0
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption7 = this.add.image(200, 500, 'maps', 6).setOrigin(0).setInteractive();
    mOption7.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:60,
        height: 60,
        eastCost: false,
        westCost: true,
        northCost: false,
        southCost: false,
        eWRiver: false,
        nSRiver: false,
        numLakes: 3
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption8 = this.add.image(350, 500, 'maps', 7).setOrigin(0).setInteractive();
    mOption8.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:80,
        height: 80,
        eastCost: false,
        westCost: false,
        northCost: false,
        southCost: false,
        eWRiver: true,
        nSRiver: false,
        numLakes: 3
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption9 = this.add.image(500, 500, 'maps', 8).setOrigin(0).setInteractive();
    mOption9.on('pointerdown', function(){
      mapLoad = 'new';
      mapConfig = {
        width:80,
        height: 80,
        eastCost: false,
        westCost: true,
        northCost: false,
        southCost: true,
        eWRiver: false,
        nSRiver: false,
        numLakes: 4
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
   
    var mOption10 = this.add.image(650, 500, 'maps', 9).setOrigin(0).setInteractive();
    mOption9.on('pointerdown', function(){
      mapLoad = 'new';
       mapConfig = {
        width:80,
        height: 80,
        eastCost: false,
        westCost: false,
        northCost: false,
        southCost: true,
        eWRiver: false,
        nSRiver: false,
        numLakes: 5
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    
    var mOption11 = this.add.image(450, 625, 'maps', 10).setOrigin(0).setInteractive();
    mOption11.on('pointerdown', function(){
      mapLoad = 'new';
      var ran = Phaser.Math.Between (30,80)
      var ran2 = Phaser.Math.Between (0,5)
       mapConfig = {
        width: ran,
        height: ran,
        eastCost: this.ranBoolean(),
        westCost: this.ranBoolean(),
        northCost: this.ranBoolean(),
        southCost: this.ranBoolean(),
        eWRiver: this.ranBoolean(),
        nSRiver: this.ranBoolean(),
        numLakes: ran2
      }
      this.scene.start('playGame');
      this.scene.launch('UI');
      this.scene.launch('Menu');
    }, this);
    var startSaved = this.add.bitmapText(game.config.width / 2, 875, 'topaz', 'Load Game', 50).setOrigin(.5, .5).setTint(0x000000);
    startSaved.setInteractive();
    startSaved.on('pointerdown', this.clickHandler2, this);

    var day = this.add.bitmapText(50, 975, 'topaz', 'Day: ' + gameStats.day, 50).setOrigin(0, .5).setTint(0xc76210);
    var funds = this.add.bitmapText(450, 975, 'topaz', '$' + gameStats.funds, 50).setOrigin(.5, .5).setTint(0xc76210);
    var pop = this.add.bitmapText(850, 975, 'topaz', 'Pop: ' + gameStats.population, 50).setOrigin(1, .5).setTint(0xc76210);



    

  }
  ranBoolean(){
    if(Phaser.Math.Between (1, 100) > 49){
      return true
    } else {
      return false
    }
  }
  clickHandler()
  {
    mapLoad = 'new'
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('Menu');
  }
  clickHandler2()
  {
    mapLoad = 'load'
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('Menu');
  }
  
}
