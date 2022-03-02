class infoScene extends Phaser.Scene {
  constructor() {
    super("infoScene");
  }
  preload() {
    


  }
  init(data){
	  this.tile = data;
	  
	  
  }
  create() {
	//this.cameras.main.setBackgroundColor(0xf7eac6);
	var timedEvent = this.time.addEvent({ delay: 300, callback: this.showPreview, callbackScope: this, loop: false });
	this.Main = this.scene.get('playGame');
	this.previewBox = this.add.container(1000,0);
	var background = this.add.image(450, 820, 'blank').setTint(0xfafafa);
	background.displayWidth = 800;
	background.displayHeight = 800
	this.previewBox.add(background);
	//var temp = this.level+1;
  
	var titleText = this.add.bitmapText(450,475, 'topaz', 'Info', 90).setOrigin(.5).setTint(0x333333).setAlpha(1);
  this.previewBox.add(titleText); 

	var typeText = this.add.bitmapText(100,575, 'topaz', this.tile.type, 50).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  var zoneText = this.add.bitmapText(100,650, 'topaz', 'Zone: ' + this.getZoneName(this.tile.zone) + '(' + this.tile.zone + ')', 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  if(this.tile.hasWater){
    var water = 'Yes'
  } else {
    var water = 'no'
  }
  var waterText = this.add.bitmapText(100,725, 'topaz','Water: ' + water, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);

  if(this.tile.hasRoad){
    var road = 'Yes'
  } else {
    var road = 'no'
  }
  var roadText = this.add.bitmapText(350,725, 'topaz','Road: ' + road, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
if (this.tile.hasRail) {
    var rail = 'Yes'
  } else {
    var rail = 'no'
  }
var railText = this.add.bitmapText(600,725, 'topaz','Rail: ' + rail, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);






  if(this.tile.driveToWork){
    
    var commute = this.tile.driveToWork * 5
  } else {
    var commute = 0;
  }
  if(this.tile.driveToShop){
    var shop = this.tile.driveToShop * 5
  } else {
    var shop = 0;
  }
  if(this.tile.delivery){
    var deliver = this.tile.delivery * 5
  } else {
    var deliver = 0;
  }
    var commuteText = this.add.bitmapText(100,800, 'topaz','Commute: ' + commute + ' Shop: ' + shop + ' Ship: ' + deliver, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);

 
  
var lvText = this.add.bitmapText(100,875, 'topaz','Land Value: ' + Math.floor(this.tile.landValue) + ' PI: ' + this.tile.pI+ ' IQ: ' + this.tile.IQ, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
 
var scale;
if(this.tile.info.size == 1){
  scale = 6
} else if(this.tile.info.size == 3){
  scale = 3
} else {
  scale = 2
}
  var tileImage = this.add.image(450, 1050, this.tile.cursheet, this.tile.curIndex).setScale(scale)
  
  console.log(this.tile.pI)
  var distance = this.Main.city.getCityCenterDistance(this.tile.xy)
  console.log('distance ' + distance)
  this.previewBox.add(typeText);
  this.previewBox.add(zoneText);
  this.previewBox.add(waterText);
  this.previewBox.add(roadText);
  this.previewBox.add(lvText);
  this.previewBox.add(railText);
  this.previewBox.add(commuteText);
	this.previewBox.add(tileImage);
  
	
	
	
	
	
	
	
//	var playText = this.add.bitmapText(625,1150, 'topaz', 'NEXT', 50).setOrigin(.5).setTint(0xcccccc).setAlpha(1).setInteractive();
  //  this.previewBox.add(playText); 
  //var cancelText = this.add.bitmapText(175,1150, 'atari', '[ X ]', 50).setOrigin(.5).setTint(0x000000).setAlpha(1).setInteractive();
    var cancelIcon = this.add.image(760, 450, 'icons', 20).setInteractive().setScale(1.5);
    this.previewBox.add(cancelIcon); 
	
	//playText.on('pointerdown', this.play, this);
	cancelIcon.on('pointerdown', this.cancel, this);
  //this.showPreview()
    
  }
  showPreview(){
	  var tween = this.tweens.add({
		  targets: this.previewBox,
		  duration: 500,
		  x: 0,
		  ease: 'bounce'
	  })
  }
  
  cancel(){
    //this.scene.start('startGame');
	  //this.scene.stop();
	  this.scene.stop();
    this.scene.resume('playGame')
    this.scene.resume('UI')
    this.scene.resume('Menu')
  }
  getZoneName(z){
    if (z == 0) {
      return 'Light Residential'
    } else if (z == 1) {
      return 'Medium Residential'
    } else if (z == 2) {
      return 'Dense Residential'
    } else if (z == 3) {
      return 'Light Commercial'
    } else if (z == 4) {
      return 'Medium Commercial'
    } else if (z == 5) {
      return 'Dense Commercial'
    } else if (z == 6) {
      return 'Light Industrial'
    } else if (z == 7) {
      return 'Heavy Industrial'
    } else if (z == 10) {
      return 'Terrain'
    } else if (z == 11) {
      return 'Road'
    } else if (z == 12) {
      return 'Power Utility'
    } else if (z == 13) {
      return 'Park'
    } else if (z == 14) {
      return 'Special'
    } else if (z == 15) {
      return 'Rail'
    } else if (z == 16) {
      return 'Water Utility'
    } else if (z == 17) {
      return 'Fire'
    } else if (z == 18) {
      return 'Health'
    } else if (z == 19) {
      return 'Education'
    } else if (z == 20) {
      return 'Government'
    } else if (z == 21) {
      return 'Police'
    } else if (z == 22) {
      return 'Passenger Depot'
    } else if (z == 23) {
      return 'Industrial Depot'
    }
  }
   saveSettings() {
    localStorage.setItem('stealthData', JSON.stringify(gameData));
  }
  
  
  
  
  
}

