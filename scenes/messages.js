class Messages extends Phaser.Scene {
  constructor() {
    super("Messages");
  }
  preload() {
    


  }
  /*init(data){
	  this.tile = data;
	  
	  
  }*/
  create() {
	//this.cameras.main.setBackgroundColor(0xf7eac6);
	var timedEvent = this.time.addEvent({ delay: 300, callback: this.showPreview, callbackScope: this, loop: false });
	
	this.previewBox = this.add.container(1000,0);
	var background = this.add.image(450, 820, 'blank').setTint(0xe4e5e5);
	background.displayWidth = 800;
	background.displayHeight = 1200
	this.previewBox.add(background);
	//var temp = this.level+1;
	var titleText = this.add.bitmapText(450,275, 'topaz', 'Messages', 90).setOrigin(.5).setTint(0x333333).setAlpha(1);
  this.previewBox.add(titleText); 
  if(gameStats.messages.length > 0){
    for(var i = 0; i < gameStats.messages.length; i++){
      var backgroundMessage = this.add.image(450, 400 + i * 125, 'blank').setTint(0xffffff);
      backgroundMessage.displayWidth = 750;
      backgroundMessage.displayHeight = 100
      this.previewBox.add(backgroundMessage);
      var messageIcon = this.add.image(115, 400 + i * 125, 'mayor_icons', gameStats.messages[i].category).setOrigin(0.5).setScale(2).setAlpha(.5).setInteractive()
      messageIcon.id = i
      this.previewBox.add(messageIcon)
      var messageText = this.add.bitmapText(155, 400 + i * 125, 'topaz', gameStats.messages[i].text, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
      this.previewBox.add(messageText);
    }
  }
  
  var cancelIcon = this.add.image(775, 275, 'icons', 20).setInteractive().setScale(1.5);
    
    this.previewBox.add(cancelIcon); 
	this.input.on('pointerdown', function(e, objects){
	  if(objects[0].id){
	  objects[0].setAlpha(0)
	  //objects[0].remove(objects[0].id)
	  gameStats.messages.splice(objects[0].id, 1)
	  }
	}, this)
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
  
   saveSettings() {
    localStorage.setItem('stealthData', JSON.stringify(gameData));
  }
  
  
  
  
  
}

