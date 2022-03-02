class mayor extends Phaser.Scene {
  constructor() {
    super("mayor");
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
	var titleText = this.add.bitmapText(450,275, 'topaz', 'City Stats', 90).setOrigin(.5).setTint(0x333333).setAlpha(1);
  this.previewBox.add(titleText); 
  var backgroundOverview = this.add.image(450, 400, 'blank').setTint(0xffffff);
  backgroundOverview.displayWidth = 750;
  backgroundOverview.displayHeight = 100
  this.previewBox.add(backgroundOverview);
  var fundIcon = this.add.image(100, 400, 'mayor_icons', 1).setOrigin(0.5).setScale(1.5)
  this.previewBox.add(fundIcon)
	var fundsText = this.add.bitmapText(140,400, 'topaz', '$' + gameStats.funds, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  var popText = this.add.bitmapText(600,400, 'topaz', 'Pop' + gameStats.population, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  
  //road info
  var backgroundOverview2 = this.add.image(450, 525, 'blank').setTint(0xffffff);
  backgroundOverview2.displayWidth = 750;
  backgroundOverview2.displayHeight = 100
  this.previewBox.add(backgroundOverview2);
  var roadAmountText = this.add.bitmapText(100,525, 'topaz', 'Miles: ' + gameStats.rT + ' x ' + gameStats.roadMaintenance, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
 //var roadCostText = this.add.bitmapText(325,650, 'topaz', 'Cost/Ml: ' + gameStats.roadMaintenance, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  var roadCostTotalText = this.add.bitmapText(525,525, 'topaz', 'Total: ' + gameStats.rT * gameStats.roadMaintenance, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  
  
  //power
  var backgroundPower = this.add.image(450, 650, 'blank').setTint(0xffffff);
  backgroundPower.displayWidth = 750;
  backgroundPower.displayHeight = 100
  this.previewBox.add(backgroundPower);
  var powerDraw = gameStats.lR * 5 + gameStats.mR * 15 + gameStats.dR * 30 + gameStats.lC * 5 + gameStats.mC * 20 + gameStats.dC * 40 + gameStats.lI * 10 + gameStats.hI * 40;
  var powerText = this.add.bitmapText(100,650, 'topaz', 'P: ' + powerDraw + '/' + gameStats.powerCapacity + ' $' + gameStats.powerCapacity * gameStats.powerMaintenance, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  
  var waterText = this.add.bitmapText(785,650, 'topaz', 'W: ' + gameStats.waterTowers + ' $' + gameStats.waterTowers * gameStats.waterMaintenance, 40).setOrigin(1,.5).setTint(0xbf5846).setAlpha(1);
  
  
  //police
  var backgroundPolice = this.add.image(450, 775, 'blank').setTint(0xffffff);
  backgroundPolice.displayWidth = 750;
  backgroundPolice.displayHeight = 100
  this.previewBox.add(backgroundPolice);
  var policeNeed = gameStats.lR * 1 + gameStats.mR * 2 + gameStats.dR * 3 + gameStats.lC * 1 + gameStats.mC * 2 + gameStats.dC * 3 + gameStats.lI * 1 + gameStats.hI * 2;
  var policeCost = gameStats.policeCapacity * gameStats.policeMaintenance;
  var policeText = this.add.bitmapText(100,775, 'topaz', 'P: ' + policeNeed + '/' + gameStats.policeCapacity + ' $' + policeCost, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  
  
  //fire

   var fireNeed = gameStats.lR * 1 + gameStats.mR * 1 + gameStats.dR * 3 + gameStats.lC * 1 + gameStats.mC * 1 + gameStats.dC * 2 + gameStats.lI * 2 + gameStats.hI * 3;
   var fireCost = gameStats.fireCapacity * gameStats.fireMaintenance
   var fireText = this.add.bitmapText(785, 775, 'topaz', 'F: ' + fireNeed + '/' + gameStats.fireCapacity  + ' $' + fireCost, 40).setOrigin(1,.5).setTint(0xbf5846).setAlpha(1);
 // var percentFire = Math.floor((gameStats.fireCapacity / fireNeed) * 100);
  //var firePerText = this.add.bitmapText(500, 900, 'topaz', 'Police Cov' + percentFire + '%', 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
  
  //health education
    var backgroundFire = this.add.image(450, 900, 'blank').setTint(0xffffff);
  backgroundFire.displayWidth = 750;
  backgroundFire.displayHeight = 100
  this.previewBox.add(backgroundFire);
  var healthCost = gameStats.healthCapacity * gameStats.healthMaintenance

  var healthText = this.add.bitmapText(100, 900, 'topaz', 'H: ' + gameStats.population + '/' + gameStats.healthCapacity  + ' $' + healthCost, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
var educationCost = gameStats.educationCapacity * gameStats.educationMaintenance
//5-14 = .13, 15-19 .065, school age .195
var educationText = this.add.bitmapText(785, 900, 'topaz', 'E: ' + (Math.floor(censusHistory.resPopulation * .195)) + '/' + gameStats.educationCapacity  + ' $' + educationCost, 40).setOrigin(1,.5).setTint(0xbf5846).setAlpha(1);

  //gov
  var backgroundFire = this.add.image(450, 1025, 'blank').setTint(0xffffff);
  backgroundFire.displayWidth = 750;
  backgroundFire.displayHeight = 100
  this.previewBox.add(backgroundFire);
  var govCost = gameStats.govBuildings * gameStats.governmentMaintenance;
  var govText = this.add.bitmapText(100, 1025, 'topaz', 'G: ' + gameStats.govBuildings + ' $' + govCost, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);

  //empty
  var backgroundFire = this.add.image(450, 1150, 'blank').setTint(0xffffff);
  backgroundFire.displayWidth = 750;
  backgroundFire.displayHeight = 100
  this.previewBox.add(backgroundFire);
 //jobs
    var jobsAvailable = gameStats.lI * 10 + gameStats.hI * 20 + gameStats.lC * 5 + gameStats.mC * 15 + gameStats.dC * 30
    var comJobsAvailable = gameStats.lC * 5 + gameStats.mC * 15 + gameStats.dC * 30
    var indJobsAvailable = gameStats.lI * 10 + gameStats.hI * 20
    var workforceAvailable = Math.floor(gameStats.population * .65)
    var unemp = Math.floor(((workforceAvailable - jobsAvailable) / workforceAvailable) * 100);
    
    var backgroundJobs = this.add.image(450, 1275, 'blank').setTint(0xffffff);
    backgroundJobs .displayWidth = 750;
    backgroundJobs .displayHeight = 100;
    this.previewBox.add(backgroundJobs);
    var availableWorkText = this.add.bitmapText(100, 1275, 'topaz', 'W: ' + workforceAvailable, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
    var jobAvailableText = this.add.bitmapText(350, 1275, 'topaz', 'J: ' + jobsAvailable, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
    var unemployedText = this.add.bitmapText(550, 1275, 'topaz', 'Unemp.: ' + unemp + '%', 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);

  //Budget stuff
  var expenditures = calculateExpenditures()
  var income = calculateIncome()
  
    
    var balance = income - expenditures
  
 var financesText = this.add.bitmapText(100, 1375, 'topaz', 'B: ' + balance + ' = ' + 'I: ' + income + ' - ' + 'E: ' + expenditures, 40).setOrigin(0,.5).setTint(0xbf5846).setAlpha(1);
   
  this.previewBox.add(titleText);
  this.previewBox.add(fundsText);
  this.previewBox.add(popText);
  this.previewBox.add(roadAmountText);
  this.previewBox.add(govText);
  this.previewBox.add(roadCostTotalText);
	this.previewBox.add(powerText);
  this.previewBox.add(educationText);
  this.previewBox.add(policeText);
  this.previewBox.add(healthText);
  this.previewBox.add(fireText);
  this.previewBox.add(waterText);
  this.previewBox.add(jobAvailableText);
  this.previewBox.add(availableWorkText);
  this.previewBox.add(unemployedText);
  this.previewBox.add(financesText);

    var cancelIcon = this.add.image(775, 275, 'icons', 20).setInteractive().setScale(1.5);
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
  play(){
	 
   
      this.events.emit('new');
	  this.scene.stop();
	  
      this.scene.start('preview');
     
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
    }
  }
   saveSettings() {
    localStorage.setItem('stealthData', JSON.stringify(gameData));
  }
  
  
  
  
  
}

