class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
  
	 
	 var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    } 
	  
	  
	  
	 
    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
    this.load.spritesheet("menu_icons", "assets/sprites/icons.png", {
      frameWidth: 96,
      frameHeight: 96
    });
    this.load.spritesheet("gems", "assets/sprites/gems.png", {
      frameWidth: 100,
      frameHeight: 100
    });
   
    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });
    this.load.spritesheet("rover", "assets/sprites/rover.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("maps", "assets/sprites/maps.png", {
      frameWidth: 100,
      frameHeight: 100,
      margin: 1,
      spacing: 1
    });
   this.load.spritesheet("terrain", "assets/sprites/terrain_long.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("zones", "assets/sprites/zones.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("roads", "assets/sprites/road_tiles_bit_with_bridge.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("rail", "assets/sprites/rr_tiles_bit.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("crossing", "assets/sprites/crossing.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("depot", "assets/sprites/depot.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("utilities", "assets/sprites/utilities.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("civic", "assets/sprites/civic.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("special", "assets/sprites/special.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("all_3", "assets/sprites/all_3.png", {
      frameWidth: 96,
      frameHeight: 96,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("all_2", "assets/sprites/all_2.png", {
      frameWidth: 64,
      frameHeight: 64,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("residential", "assets/sprites/residential.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("commercial", "assets/sprites/commercial.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("industrial", "assets/sprites/industrial.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    
    this.load.spritesheet("icons", "assets/sprites/menu_icons.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("mayor_icons", "assets/sprites/mayor_icons.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
	this.load.image('blank', 'assets/sprites/blank.png');
	this.load.image('skyline', 'assets/sprites/citybg.png');
  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








