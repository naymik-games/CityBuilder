let game;


window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    render: {
      pixelArt: true
    },
    scene: [preloadGame, startGame, playGame, UI, infoScene, mayor, Menu, Messages]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
var tilesize

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {
    var url;
    url = 'classes/pinch.min.js'
    //url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    // url2 = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);


  }
  create() {
    let testMap = []
    gameMap = JSON.parse(localStorage.getItem('cityMap'));
    if (gameMap === null || gameMap.length <= 0) {
      localStorage.setItem('cityMap', JSON.stringify(testMap));
      gameMap = testMap;
    }
    //console.log('load h' + gameMap.length)
    var dragScale = this.plugins.get('rexpinchplugin').add(this);


    this.cameras.main.setBackgroundColor(0x000000);

    //this.player = this.add.image(game.config.width / 2, game.config.height /2, 'gems', 0).setInteractive();
    // this.player.on("pointerdown", this.addScore, this);

    tilesize = 32;
    this.cameras.main.setZoom(2)
    this.cam = this.cameras.main

    this.drag = false;

    dragScale
      .on('drag1', function(dragScale) {
        if (this.drag) {
          var drag1Vector = dragScale.drag1Vector;
          this.cam.scrollX -= drag1Vector.x / this.cam.zoom;
          this.cam.scrollY -= drag1Vector.y / this.cam.zoom;
        }
        //this.drag = true;
      }, this)
      .on('pinch', function(dragScale) {
        if (this.drag) {
          var scaleFactor = dragScale.scaleFactor;
          this.cam.zoom *= scaleFactor;
        }
      }, this)

    

    //console.log(zones)

    //this.cameras.main.centerOn(800,400)
    this.xOffset = 200;
    this.yOffset = 200;
    this.grid = []
    this.selected = []
    this.buildingQue = []
    this.lightResidentialQue = []
    this.mediumResidentialQue = []
    this.denseResidentialQue = []
    this.lightCommercialQue = []
    this.mediumCommercialQue = []
    this.denseCommercialQue = []
    this.lightIndustrialQue = []
    this.heavyIndustrialQue = []
    this.residentialTiles = []
    //console.log(mapLoad)
    //crate game grid/map
    if (mapLoad == 'load') {
      this.gridWidth = gameMap.length
      this.gridHeight = gameMap[0].length
      this.cameras.main.setBounds(0, 0, (this.gridWidth * tilesize) + 200, (this.gridHeight * tilesize) + 200)

      this.loadMap()
    } else {
      this.gridWidth = mapConfig.width
      this.gridHeight = mapConfig.height
      this.cameras.main.setBounds(0, 0, (this.gridWidth * tilesize) + 200, (this.gridHeight * tilesize) + 200)

      this.createMap()
    }
    this.city = new City(this, this.gridWidth, this.gridHeight)
    this.traffic = new Traffic(this, this.gridWidth, this.gridHeight)
    this.census = new Census(this, this.gridWidth, this.gridHeight);
   // this.census.doCensus();
    // y, x
    //this.grid[0][5].tile.setTint(0xff0000);


    var UI = this.scene.get('UI');
    var Menu = this.scene.get('Menu');
    UI.events.on('cursor', function() {
      this.toggleCursor()
    }, this);
    /*  UI.events.on('info', function() {
        this.toggleInfo()
      }, this);*/
    Menu.events.on('place', function(data) {
      this.placeItem(data)
    }, this);
    Menu.events.on('zone', function(data) {
      this.placeZone(data)
    }, this);
    UI.events.on('endDay', function(data) {
      this.endDay()
    }, this);
    UI.events.on('view', function(data) {
      if(data == 0){
        this.showPower()
      } else if(data == 1){
        this.showWater()
      } else if(data == 2){
        this.showPolice()
      } else if(data == 3){
        this.showFire()
      } else if(data == 4){
        this.showHealth()
      } else if(data == 5){
        this.showEdu()
      }
      
    }, this);
    UI.events.on('viewClear', function(){
      this.powerGraphics.clear();
      this.waterGraphics.clear();
      this.policeGraphics.clear();
      this.fireGraphics.clear();
      this.healthGraphics.clear();
      this.eduGraphics.clear();
    }, this)
    //var test = this.add.image(this.xOffset + (10 * tilesize + tilesize / 2), this.yOffset + (20 * tilesize + tilesize / 2), 'utilities', 0)
    this.actionGraphics = this.add.graphics({ lineStyle: { width:2, color: 0xe0e33b, }, fillStyle: { color: 0x497640, alpha: .3 } })
    
    this.powerGraphics = this.add.graphics({ lineStyle: { width: 5, color: 0xe0e33b, }, fillStyle: { color: 0x497640, alpha: .3 } })
    this.waterGraphics = this.add.graphics({ lineStyle: { width: 5, color: 0x61b3fa, }, fillStyle: { color: 0x497640, alpha: .3 } })
    this.policeGraphics = this.add.graphics({ lineStyle: { width: 5, color: 0xf55bed, }, fillStyle: { color: 0x497640, alpha: .3 } })
    this.fireGraphics = this.add.graphics({ lineStyle: { width: 5, color: 0xe85035, }, fillStyle: { color: 0x497640, alpha: .3 } })
    this.healthGraphics = this.add.graphics({ lineStyle: { width: 5, color: 0xe89a35, }, fillStyle: { color: 0x497640, alpha: .3 } })
    this.eduGraphics = this.add.graphics({ lineStyle: { width: 5, color: 0x4838f5, }, fillStyle: { color: 0x497640, alpha: .3 } })

    var mess = new Message('Welcome to the game', 3)
    gameStats.messages.push(mess)

    this.input.on("pointerdown", this.downController, this);
    this.input.on("pointermove", this.moveController, this);
    this.input.on("pointerup", this.upContoller, this);
    //console.log('pd main' + gameStats.policeMaintenance)
    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {

  }
  ////////////////////////////////////////////
  //
  // END DAY
  //
  //////////////////////////////////////////////
  endDay() {
    /*
    
    
    */
    //rci
    this.city.evaluateDay()
    
    this.city.landValueUpdate(this.grid)
    if(gameStats.day % 2 == 0){
      
    }
    this.city.iqValueUpdate(this.grid)
    this.buildZones(this.buildingQue);
    //this.clearQues();
    this.totalZonedTiles = gameStats.lR + gameStats.mR + gameStats.dR + gameStats.lC + gameStats.mC + gameStats.dC + gameStats.lI + gameStats.hI;
/*
    // calculate population capacity
    //start tile with minimum population

    //calculate population
    this.population = gameStats.lR * 8 + gameStats.mR * 40 + gameStats.dR * 100
    //labor stats
    this.jobsAvailable = gameStats.lI * 10 + gameStats.hI * 20 + gameStats.lC * 5 + gameStats.mC * 15, gameStats.dC * 30
    this.comJobsAvailable = gameStats.lC * 5 + gameStats.mC * 15, gameStats.dC * 30
    this.indJobsAvailable = gameStats.lI * 10 + gameStats.hI * 20
    this.workforceAvailable = Math.floor(this.population * .65)

    //power stats
    this.powerDraw = gameStats.lR * 5 + gameStats.mR * 15 + gameStats.dR * 30 + gameStats.lC * 5 + gameStats.mC * 20 + gameStats.dC * 40 + gameStats.lI * 10 + gameStats.hI * 40;
    //console.log('power capacity' + gameStats.powerCapacity)
    //console.log('power draw' + this.powerDraw)
    //console.log('power' + this.powerDraw + '/' + gameStats.powerCapacity)
    //safety stats
    this.policeNeed = gameStats.lR * 1 + gameStats.mR * 2 + gameStats.dR * 3 + gameStats.lC * 1 + gameStats.mC * 2 + gameStats.dC * 3 + gameStats.lI * 1 + gameStats.hI * 2;
    var percentPoliced = Math.floor((gameStats.policeCapacity / this.policeNeed) * 100);
    //console.log('police coverage ' + percentPoliced + '%')

    this.fireNeed = gameStats.lR * 1 + gameStats.mR * 1 + gameStats.dR * 3 + gameStats.lC * 1 + gameStats.mC * 1 + gameStats.dC * 2 + gameStats.lI * 2 + gameStats.hI * 3;
    var percentFire = Math.floor((gameStats.fireCapacity / this.fireNeed) * 100);
    //console.log('fire coverage ' + percentFire + '%')
    // console.log('police coverage ' + percentPoliced + '%')
    //Budget stuff
    this.income = Math.floor((this.workforceAvailable * 1000) * .01)
    this.income += Math.floor((this.indJobsAvailable * 1000) * .01)
    this.income += Math.floor((this.comJobsAvailable * 1000) * .01)

    this.expenditures = calculateExpenditures()
    this.desireability = calculateDesirabilty()
    //console.log(this.expenditures)
    //
    this.balance = this.income - this.expenditures
    gameStats.funds += this.balance
    gameStats.population = this.population
    //console.log('jobs ' + this.jobsAvailable)
    //console.log('workers ' + this.workforceAvailable)
    var unemp = Math.floor((this.jobsAvailable / this.workforceAvailable) * 100);

    //console.log('unemployment ' + unemp + '%')
    //console.log(gameStats)
*/
this.expenditures = calculateExpenditures()
this.income = calculateIncome()
gameStats.funds = this.income - this.expenditures
console.log(this.income + ' ' + this.expenditures)
    this.census.doCensus(this.grid)
    this.events.emit('newDay')
    this.driveTimes();
    var mess = new Message('end of day', 6)
    gameStats.messages.push(mess)

  }
  ////////////////////////////////////////////
  //
  // calculate drive times from zone to zone. record in tile
  //
  //////////////////////////////////////////////
  driveTimes() {

    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        // traffic res to industry
        if (this.grid[y][x].zone == 0 || this.grid[y][x].zone == 1 || this.grid[y][x].zone == 2) {
          var tr = this.traffic.tryDriveTo(this.grid, this.point(x, y), [6, 7])
          if (tr) {
            this.grid[y][x].driveToWork = tr;
          } else {
            this.grid[y][x].driveToWork = 0
          }
        }
        // traffic res to com
        if (this.grid[y][x].zone == 0 || this.grid[y][x].zone == 1 || this.grid[y][x].zone == 2) {
          var tc = this.traffic.tryDriveTo(this.grid, this.point(x, y), [3, 4, 5])
          if (tc) {
            this.grid[y][x].driveToShop = tc;
          } else {
            this.grid[y][x].driveToShop = 0
          }
        }
        // traffic industry to comm 
        if (this.grid[y][x].zone == 6 || this.grid[y][x].zone == 7) {
          var ti = this.traffic.tryDriveTo(this.grid, this.point(x, y), [3, 4, 5])
          if (ti) {
            this.grid[y][x].delivery = ti;
          } else {
            this.grid[y][x].delivery = 0
          }
        }



      }
    }
    // console.log('test count ' + count)
  }
  ////////////////////////////////////////////
  //
  // BUILD ZONES
  //
  //////////////////////////////////////////////
  buildZones(que) {
    var amount = que.length;
    if(amount == 0){return}
    //console.log(amount)
    for (var i = amount - 1; i > -1; i--) {
      var point = que[i]
    
      var zone = this.grid[point.y][point.x].zone
      var chance = 11
      if(zone == 0){
        if(gameStats.resValve < 0){
          chance = 1
          //continue;
        } else if(gameStats.resValve < 1000){
          chance = 5
        } else {
          chance = 9
        }
        if(this.city.nearZone(this.grid, point, 19, 3)){
          chance += 1
        }
      } else if(zone == 3){
        if (gameStats.comValve < 0) {
          chance = 1
          //continue;
        } else if (gameStats.comValve < 750) {
          chance = 5
        } else {
          chance = 9
        }
      } else if(zone == 6){
        if (gameStats.indValve < 0) {
          chance = 1
          //continue;
        } else if (gameStats.indValve < 750) {
          chance = 5
        } else {
          chance = 9
        }
      }
      
      if(Math.random()*10 < chance){
       
      
      
    
        var point = que.pop()

        var zone = this.grid[point.y][point.x].zone
        //console.log(zones[zone])
        var ran = Phaser.Math.Between(zones[zone].zoneMin, zones[zone].zoneMax)

        if (zone == 0 || zone == 1 || zone == 2) {
          var currentArray = residential
        } else if (zone == 3 || zone == 4 || zone == 5) {
          var currentArray = commercial
        } else if (zone == 6 || zone == 7) {
          var currentArray = industrial
        }
        //console.log(currentArray[0])
        this.grid[point.y][point.x].tile.setTexture(currentArray[ran].sheet, currentArray[ran].index);
        this.grid[point.y][point.x].type = currentArray[ran].name
        this.grid[point.y][point.x].cursheet = currentArray[ran].sheet;
        this.grid[point.y][point.x].curIndex = currentArray[ran].index;
        this.grid[point.y][point.x].landValue = 0
       var pi = this.city.makePollutionIndex(this.grid, point)
        if (this.roadInRange(point) && this.waterInRange(point)) {
          if(this.depotInRange(point)){
            this.grid[point.y][point.x].hasRail = true
          }
          this.grid[point.y][point.x].hasWater = true;
          this.grid[point.y][point.x].hasRoad = true;
          this.grid[point.y][point.x].pI = pi
          //increment zone count
          if (zone == 0) {
            gameStats.lR++
          } else if (zone == 1) {
            gameStats.mR++
          } else if (zone == 2) {
            gameStats.dR++
          } else if (zone == 3) {
            gameStats.lC++
          } else if (zone == 4) {
            gameStats.mC++
          } else if (zone == 5) {
            gameStats.dC++
          } else if (zone == 6) {
            gameStats.lI++
          } else if (zone == 7) {
            gameStats.hI++
          }
          //this.city.evaluateDay()
        } else {
          this.grid[point.y][point.x].tile.setAlpha(.5)
          this.grid[point.y][point.x].hasWater = false;
          this.grid[point.y][point.x].hasRoad = false;
        }
      }
    }
    gameStats.bQ = this.buildingQue
    this.saveStats()
    this.saveMap();
  }

  clearQues() {
    this.buildingQue = []
  }

  ////////////////////////////////////////////
  //
  // TOGGLE CURSOR
  //
  //////////////////////////////////////////////
  toggleCursor() {
    ;
    if (this.drag) {
      this.drag = false;
    } else {
      this.drag = true;
    }
  }
  ////////////////////////////////////////////
  //
  // show views
  //
  //////////////////////////////////////////////
  showPower(){
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if(this.grid[y][x].type == 'Water Tower'){
         // this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (gameStats.waterRange * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.powerGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        }
      }
    }
  }
  showWater(){
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if(this.grid[y][x].type == 'Water Tower'){
         // this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (gameStats.waterRange * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.waterGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        }
      }
    }
  }
  showPolice(){
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if(this.grid[y][x].type == 'Police Station'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (gameStats.policeRange * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.policeGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        }
      }
    }
  }
  showFire(){
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if(this.grid[y][x].type == 'Fire Station'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (gameStats.fireRange * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.fireGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        }
      }
    }
  }
  showHealth(){
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if(this.grid[y][x].type == 'Hospital'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (gameStats.healthRange * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.healthGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        }
      }
    }
  }
  showEdu(){
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if(this.grid[y][x].type == 'Elementary School'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (this.grid[y][x].info.range * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.eduGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        } else if(this.grid[y][x].type == 'High School'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (this.grid[y][x].info.range * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.eduGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        } else if(this.grid[y][x].type == 'Private School'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (this.grid[y][x].info.range * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.eduGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        } else if(this.grid[y][x].type == 'Private School'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (this.grid[y][x].info.range * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.eduGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        } else if(this.grid[y][x].type == 'Community College'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (this.grid[y][x].info.range * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.eduGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        } else if(this.grid[y][x].type == 'University'){
          //this.grid[y][x].tile.setAlpha(.5)
          var rectWidth = tilesize * (this.grid[y][x].info.range * 2 + 1)
          var xPos = this.grid[y][x].tile.x - (rectWidth / 2)
          var yPos = this.grid[y][x].tile.y - (rectWidth / 2)
          this.eduGraphics.strokeRect(xPos, yPos, rectWidth, rectWidth)
        }
      }
    }
  }
  ////////////////////////////////////////////
  //
  // INPUT CONTROLLERS
  //
  //////////////////////////////////////////////
  downController(e) {
    if (gameMode == GM_INFO) {
      this.startInfo(e)
    }
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD) {
      this.startSelect(e)
    } else if (gameMode == GM_PLACE) {
      this.doPlace(e)
    } else if (gameMode == GM_ERASE) {
      this.doErase(e)
    } else if (gameMode == GM_SELECT) {
      this.startZone(e)
    } else if (gameMode == GM_INFO) {
      this.startInfo(e)
    } else if (gameMode == GM_RAIL) {
      this.startRRSelect(e)
    }
  }
  moveController(e) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD) {
      this.drawPath(e)
    } else if (gameMode == GM_RAIL) {
      this.drawRRPath(e)
    } else if (gameMode == GM_SELECT) {
      this.drawZone(e)
    }
  }
  upContoller(e) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD) {
      this.endSelect(e)
    } else if (gameMode == GM_SELECT) {
      this.endZone(e)
    } else if (gameMode == GM_RAIL) {
      this.endRRSelect(e)
    }
  }
  ////////////////////////////////////////////
  //
  // INFO BUTTON
  //
  //////////////////////////////////////////////
  startInfo(e) {
    if (gameMode == GM_INFO) {
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }

      var point = this.point(pickedCol, pickedRow)
      this.scene.pause()
      this.scene.pause('UI')
      this.scene.pause('Menu')
      this.scene.launch('infoScene', this.grid[pickedRow][pickedCol])
      //console.log('name ' + this.grid[pickedRow][pickedCol].type)
      //console.log('zone ' + this.grid[pickedRow][pickedCol].zone)

    }
  }
  ////////////////////////////////////////////
  //
  // PLACE ZONES
  //
  //////////////////////////////////////////////
  startZone(e) {
    if (gameMode == GM_SELECT) {
      this.zoneStart = true
      this.zoned = [];
      this.startXY = null;
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }

      var point = this.point(pickedCol, pickedRow)
      // if(this.grid[y][x].cursheet != 'terrain'){return}
      if (this.grid[pickedRow][pickedCol].cursheet != 'terrain') {
        return
      }


      this.startXY = point;

      this.rect = new Phaser.Geom.Rectangle(this.grid[pickedRow][pickedCol].tile.x - 16, this.grid[pickedRow][pickedCol].tile.y - 16, 0, 0)
      this.actionGraphics.fillRectShape(this.rect);

    }
  }
  drawZone(e) {
    if (gameMode == GM_SELECT && this.zoneStart) {
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }
      var point = this.point(pickedCol, pickedRow)
      //allow tile selection regardless if occumpied. sort out later
      /*if (this.grid[pickedRow][pickedCol].cursheet != 'terrain') {
        return
      }*/
      this.actionGraphics.clear();

      var wx = ((point.x + 1) - this.startXY.x) * tilesize
      var wy = ((point.y + 1) - this.startXY.y) * tilesize

      this.rect.setSize(wx, wy)
      this.actionGraphics.fillRectShape(this.rect);
      this.actionGraphics.strokeRectShape(this.rect);




    }
  }
  endZone(e) {
    if (gameMode == GM_SELECT && this.zoneStart) {

      this.actionGraphics.clear()

      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }
      var point = this.point(pickedCol, pickedRow)
      if (this.grid[pickedRow][pickedCol].cursheet != 'terrain') {
        return
      }
      if (this.newTile(point)) {
        var tempArray = []
        for (var y = this.startXY.y; y < pickedRow + 1; y++) {
          var ta = []
          for (var x = this.startXY.x; x < pickedCol + 1; x++) {

            if (this.grid[y][x].cursheet == 'terrain') {
              this.grid[y][x].tile.setTexture(this.zoneToPlace.sheet, this.zoneToPlace.index)
              this.grid[y][x].type = this.zoneToPlace.name
              this.grid[y][x].zone = this.zoneToPlace.zone
              this.grid[y][x].cursheet = this.zoneToPlace.sheet
              this.grid[y][x].curIndex = this.zoneToPlace.index
              this.events.emit('lowerFund', this.zoneToPlace.cost * gameStats.inflation);


              this.zoned.push(this.point(x, y))
            }
            ta.push(this.point(x, y))
          }
          tempArray.push(ta)
        }
        //console.log(tempArray)
        //set up build
        this.buildingQue.push.apply(this.buildingQue, this.zoned)
        this.zoned = []
       // console.log(this.buildingQue[0])
        gameMode = GM_MENU
        this.zoneStart = false
        //end set up build
      }
    }
  }
  
  ////////////////////////////////////////////
  //
  // PLACE ROAD
  //
  //////////////////////////////////////////////
  startSelect(e) {


    if (gameMode == GM_ROAD) {
      this.selected = []
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }
      // if(this.grid[pickedRow][pickedCol])
      var point = this.point(pickedCol, pickedRow)
      this.events.emit('lowerFund', gameStats.roadCost * gameStats.inflation);

      this.selected.push(point)
      //this.grid[pickedRow][pickedCol].tile.setTint(0xff0000);
      var roadValue = this.calculateRoad(point)
      if (roadValue > 0) {
        this.grid[pickedRow][pickedCol].tile.setTexture('roads', roadValue)
        this.grid[pickedRow][pickedCol].type = 'road'
        this.grid[pickedRow][pickedCol].zone = 11
        this.grid[pickedRow][pickedCol].cursheet = 'roads'
        this.grid[pickedRow][pickedCol].curIndex = roadValue
        gameStats.rT++
      } else {
        this.grid[pickedRow][pickedCol].tile.setTexture('roads', 1)
        this.grid[pickedRow][pickedCol].type = 'road'
        this.grid[pickedRow][pickedCol].zone = 11
        this.grid[pickedRow][pickedCol].cursheet = 'roads'
        this.grid[pickedRow][pickedCol].curIndex = 1
        gameStats.rT++
      }
    }


  }
  drawPath(e) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD) {
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }
      var point = this.point(pickedCol, pickedRow)
      // console.log('index ' + this.selected.indexOf(point))


      if (this.newTile(point) && this.areNext(point, this.selected[this.selected.length - 1]) && this.canContinueRoad(point)) {
        var preTile = this.selected[this.selected.length - 1]

        var roadValue = this.calculateRoad(point)
        if(this.grid[pickedRow][pickedCol].curIndex == 0){
          if(roadValue == 2 || roadValue == 4){
            roadValue = 17
          } else if(roadValue == 1 || roadValue == 8){
            roadValue = 18
          }      
        }
        if (roadValue > 0) {
          this.grid[pickedRow][pickedCol].tile.setTexture('roads', roadValue)
          this.grid[pickedRow][pickedCol].type = 'road'
          this.grid[pickedRow][pickedCol].cursheet = 'roads'
          this.grid[pickedRow][pickedCol].curIndex = roadValue

        }







        if (this.selected.length > 0) {
          var roadValueP = this.calculateRoad(preTile)
          if (this.grid[preTile.y][preTile.x].curIndex == 17){
            roadValueP = 17
          } else if (this.grid[preTile.y][preTile.x].curIndex == 18){
            roadValueP = 18
          }
          if (roadValueP > 0) {
            this.grid[preTile.y][preTile.x].tile.setTexture('roads', roadValueP)
            this.grid[preTile.y][preTile.x].type = 'road'
            this.grid[preTile.y][preTile.x].cursheet = 'roads'
            this.grid[preTile.y][preTile.x].curIndex = roadValueP
            this.grid[pickedRow][pickedCol].zone = 11
            gameStats.rT++
          }
        }



        /*
        
        if (this.grid[pickedRow][pickedCol].zone = 15){
          if (roadValue == 6){
            this.grid[pickedRow][pickedCol].tile.setTexture('crossing', 0)
            this.grid[pickedRow][pickedCol].type = 'crossing'
            this.grid[pickedRow][pickedCol].cursheet = 'crossing'
           this.grid[pickedRow][pickedCol].curIndex = 0
          } else if (roadValue == 9){
            this.grid[pickedRow][pickedCol].tile.setTexture('crossing', 1)
            this.grid[pickedRow][pickedCol].type = 'crossing'
            this.grid[pickedRow][pickedCol].cursheet = 'crossing'
            this.grid[pickedRow][pickedCol].curIndex = 1
          }
        }
        
        */


        // 
        //this.grid[pickedRow][pickedCol].direction = direction
        //console.log(this.grid[pickedRow][pickedCol].id);
        this.events.emit('lowerFund', gameStats.roadCost * gameStats.inflation);

        this.selected.push(point)
      }
    }
  }
  endSelect() {
    this.saveMap();
    //this.drag = false;
    //console.log(this.selected.length)
    //this.clearSelect();
  }
  clearSelect() {
    for (var i = 0; i < this.selected.length; i++) {
      this.grid[this.selected[i].y][this.selected[i].x].tile.clearTint()
    }
  }
  ////////////////////////////////////////////
  //
  // PLACE RAIL
  //
  //////////////////////////////////////////////
  startRRSelect(e) {

    if (gameMode == GM_RAIL) {
      this.selected = []
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }
      // if(this.grid[pickedRow][pickedCol])
      var point = this.point(pickedCol, pickedRow)
      this.events.emit('lowerFund', gameStats.railCost * gameStats.inflation);

      this.selected.push(point)
      //this.grid[pickedRow][pickedCol].tile.setTint(0xff0000);
      var railValue = this.calculateRail(point)
      if (railValue > 0) {
        this.grid[pickedRow][pickedCol].tile.setTexture('rail', roadValue)
        this.grid[pickedRow][pickedCol].type = 'rail'
        this.grid[pickedRow][pickedCol].zone = 15
        this.grid[pickedRow][pickedCol].cursheet = 'rail'
        this.grid[pickedRow][pickedCol].curIndex = railValue
        gameStats.rrT++
      } else {
        this.grid[pickedRow][pickedCol].tile.setTexture('rail', 1)
        this.grid[pickedRow][pickedCol].type = 'rail'
        this.grid[pickedRow][pickedCol].zone = 15
        this.grid[pickedRow][pickedCol].cursheet = 'rail'
        this.grid[pickedRow][pickedCol].curIndex = 1
        gameStats.rrT++
      }
    }


  }
  drawRRPath(e) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_RAIL) {
      var posX = e.worldX - this.xOffset;
      var posY = e.worldY - this.yOffset;
      var pickedRow = Math.floor(posY / tilesize);
      var pickedCol = Math.floor(posX / tilesize);
      // console.log('r ' + pickedRow + ', c ' + pickedCol)
      if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
        return
      }
      var point = this.point(pickedCol, pickedRow)
      // console.log('index ' + this.selected.indexOf(point))


      if (this.newTile(point) && this.areNext(point, this.selected[this.selected.length - 1]) && this.canContinueRail(point)) {
        var preTile = this.selected[this.selected.length - 1]

        var railValue = this.calculateRail(point)
        if(this.grid[pickedRow][pickedCol].curIndex == 0){
          if(railValue == 2 || railValue == 4){
            railValue = 17
          } else if(railValue == 1 || railValue == 8){
            railValue = 18
          }      
        }
        if (railValue > 0) {
          this.grid[pickedRow][pickedCol].tile.setTexture('rail', railValue)
          this.grid[pickedRow][pickedCol].type = 'rail'
          this.grid[pickedRow][pickedCol].cursheet = 'rail'
          this.grid[pickedRow][pickedCol].curIndex = railValue

        }

        /*
        if (this.grid[pickedRow][pickedCol].zone = 11){
          if (railValue == 6){
            this.grid[pickedRow][pickedCol].tile.setTexture('crossing', 0)
            this.grid[pickedRow][pickedCol].type = 'crossing'
            this.grid[pickedRow][pickedCol].cursheet = 'crossing'
           this.grid[pickedRow][pickedCol].curIndex = 0
          } else if (railValue == 9){
            this.grid[pickedRow][pickedCol].tile.setTexture('crossing', 1)
            this.grid[pickedRow][pickedCol].type = 'crossing'
            this.grid[pickedRow][pickedCol].cursheet = 'crossing'
            this.grid[pickedRow][pickedCol].curIndex = 1
          }
        }
        */

        if (this.selected.length > 0) {
          var railValueP = this.calculateRail(preTile)
          if (this.grid[preTile.y][preTile.x].curIndex == 17){
            railValueP = 17
          } else if (this.grid[preTile.y][preTile.x].curIndex == 18){
            railValueP = 18
          }
          if (railValueP > 0) {
            this.grid[preTile.y][preTile.x].tile.setTexture('rail', railValueP)
            this.grid[preTile.y][preTile.x].type = 'rail'
            this.grid[preTile.y][preTile.x].cursheet = 'rail'
            this.grid[preTile.y][preTile.x].curIndex = railValueP
            this.grid[pickedRow][pickedCol].zone = 15
            gameStats.rrT++
          }
        }
        // 
        //this.grid[pickedRow][pickedCol].direction = direction
        //console.log(this.grid[pickedRow][pickedCol].id);
        this.events.emit('lowerFund', gameStats.railCost * gameStats.inflation);

        this.selected.push(point)
      }
    }
  }
  endRRSelect() {
    this.saveMap();
    //this.drag = false;
    //console.log(this.selected.length)
    //this.clearSelect();
  }
  ////////////////////////////////////////////
  //
  // PLACE CIVIC, UTILITIES, SPECIAL
  //
  //////////////////////////////////////////////
  doPlace(e) {
    this.selected = []
    var posX = e.worldX - this.xOffset;
    var posY = e.worldY - this.yOffset;
    var pickedRow = Math.floor(posY / tilesize);
    var pickedCol = Math.floor(posX / tilesize);
    //  console.log('r ' + pickedRow + ', c ' + pickedCol)
    if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
      return
    }
    var point = this.point(pickedCol, pickedRow)
    //console.log('size ' + this.itemToPlace.size)
    if (this.canFit(point, this.itemToPlace.size)) {

      this.grid[point.y][point.x].tile.setTexture(this.itemToPlace.sheet, this.itemToPlace.index).setDepth(1)
      // this.children.bringToTop(this.grid[point.y][point.x].tile)
      this.grid[point.y][point.x].type = this.itemToPlace.name;
      this.grid[point.y][point.x].size = this.itemToPlace.size;
      if (this.itemToPlace.size == 3) {
        this.addSize(this.grid[point.y][point.x].xy);
      }
      if (this.itemToPlace.size == 2) {
        this.addSizeSquare(this.grid[point.y][point.x].xy);
        this.grid[point.y][point.x].tile.setOrigin(.25)
      }
      this.grid[point.y][point.x].zone = this.itemToPlace.zone;
      this.grid[point.y][point.x].cursheet = this.itemToPlace.sheet;
      this.grid[point.y][point.x].curIndex = this.itemToPlace.index;
      this.grid[point.y][point.x].info = this.itemToPlace;
      this.events.emit('lowerFund', this.itemToPlace.cost * gameStats.inflation);
      if (this.itemToPlace.zone == 12) {
        gameStats.powerCapacity += this.itemToPlace.capacity
      } else if (this.itemToPlace.zone == 16) {
        gameStats.waterTowers++;
        this.addWater(this.point(pickedCol, pickedRow))
      } else if (this.itemToPlace.zone == 22 || this.itemToPlace.zone == 23) {     
        this.addDepot(this.point(pickedCol, pickedRow))
      } else if (this.itemToPlace.zone == 21) {
        gameStats.policeCapacity += this.itemToPlace.capacity
      } else if (this.itemToPlace.zone == 17) {
        gameStats.fireCapacity += this.itemToPlace.capacity
      } else if (this.itemToPlace.zone == 18) {
        gameStats.healthCapacity += this.itemToPlace.capacity
      } else if (this.itemToPlace.zone == 19) {
        gameStats.educationCapacity += this.itemToPlace.capacity
      } else if (this.itemToPlace.zone == 20) {
        gameStats.govBuildings++
      }
      //18 health
      //19 education
      //20 government
      this.itemToPlace = null;
      gameMode = GM_MENU
      this.saveMap()

    }
  }
  placeItem(data) {

    this.itemToPlace = data
  }
  placeZone(data) {

    this.zoneToPlace = data
    // console.log(this.zoneToPlace)
  }
  canFit(point, size) {
    if (size == 1) {
      return this.grid[point.y][point.x].type == 'dirt' || this.grid[point.y][point.x].type == 'grass' || this.grid[point.y][point.x].type == 'road' || this.grid[point.y][point.x].type == 'rail'
    } else if (size == 2) {
      //home point is upper left
      var tiles = this.getTilesSquare(point);
      if (tiles.length < 4) {
        return false
      }
      for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].type == 'dirt' || tiles[i].type == 'grass') {

        } else if (tiles[i].type == 'road' || tiles[i] == 'rail') {

        } else {
          return false
        }
      }
      return true
    } else {
      //home point is center
      var tiles = this.getTilesInRange(point, 1);
      //console.log('tiles length' + tiles.length)
      if (tiles.length < 9) {
        return false
      }
      for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].type == 'dirt' || tiles[i].type == 'grass') {

        } else {
          return false
        }
      }
      return true
    }
  }
  addSize(point) {
    var tiles = this.getTilesInRange(point, 1)

    for (var i = 0; i < tiles.length; i++) {
      tiles[i].partOf = point
      tiles[i].type = this.itemToPlace.name
      tiles[i].zone = this.itemToPlace.zone
      //tiles[i].size = 3
    }
  }
  addSizeSquare(point) {
    var tiles = this.getTilesSquare(point)

    for (var i = 0; i < tiles.length; i++) {
      tiles[i].partOf = point
      tiles[i].type = this.itemToPlace.name
      tiles[i].zone = this.itemToPlace.zone
      //tiles[i].size = 2
    }
  }
  ////////////////////////////////////////////
  //
  // BULLDOZER
  //
  //////////////////////////////////////////////
  doErase(e) {
    var posX = e.worldX - this.xOffset;
    var posY = e.worldY - this.yOffset;
    var pickedRow = Math.floor(posY / tilesize);
    var pickedCol = Math.floor(posX / tilesize);
    //  console.log('r ' + pickedRow + ', c ' + pickedCol)
    if (pickedRow < 0 || pickedRow > this.gridHeight - 1 || pickedCol < 0 || pickedCol > this.gridWidth - 1) {
      return
    }
    if (this.grid[pickedRow][pickedCol].partOf != null) {
      var centerY = this.grid[pickedRow][pickedCol].partOf.y
      var centerX = this.grid[pickedRow][pickedCol].partOf.x
      pickedRow = centerY;
      pickedCol = centerX;
      if (this.grid[pickedRow][pickedCol].size == 3) {
        this.clearSize(this.point(centerX, centerY))
      } else {
        this.clearSizeSquare(this.point(centerX, centerY))
      }

    }
    if (this.grid[pickedRow][pickedCol].type == 'road') {
      this.events.emit('raiseFund', gameStats.roadCost * gameStats.inflation);
      gameStats.rT--
    }
    if (this.grid[pickedRow][pickedCol].zone == 0) {
      gameStats.lR--;
    } else if (this.grid[pickedRow][pickedCol].zone == 1) {
      gameStats.mR--;
    } else if (this.grid[pickedRow][pickedCol].zone == 2) {
      gameStats.dR--;
    } else if (this.grid[pickedRow][pickedCol].zone == 3) {
      gameStats.lC--;
    } else if (this.grid[pickedRow][pickedCol].zone == 4) {
      gameStats.mC--;
    } else if (this.grid[pickedRow][pickedCol].zone == 5) {
      gameStats.dC--;
    } else if (this.grid[pickedRow][pickedCol].zone == 6) {
      gameStats.lI--;
    } else if (this.grid[pickedRow][pickedCol].zone == 7) {
      gameStats.hI--;
    } else if (this.grid[pickedRow][pickedCol].zone == 12) {
      gameStats.powerCapacity -= this.grid[pickedRow][pickedCol].info.capacity
    } else if (this.grid[pickedRow][pickedCol].zone == 16) {
      gameStats.waterTowers--;
      this.removeWater(this.point(pickedCol, pickedRow))
    } else if (this.grid[pickedRow][pickedCol].zone == 21) {
      gameStats.policeCapacity -= this.grid[pickedRow][pickedCol].info.capacity
    } else if (this.grid[pickedRow][pickedCol].zone == 17) {
      gameStats.fireCapacity -= this.grid[pickedRow][pickedCol].info.capacity
    } else if (this.grid[pickedRow][pickedCol].zone == 18) {
      gameStats.healthCapacity -= this.grid[pickedRow][pickedCol].info.capacity
    } else if (this.grid[pickedRow][pickedCol].zone == 19) {
      gameStats.educationCapacity -= this.grid[pickedRow][pickedCol].info.capacity
    } else if (this.grid[pickedRow][pickedCol].zone == 20) {
      gameStats.govBuildings--
    } else if (this.grid[pickedRow][pickedCol].zone == 22 || this.grid[pickedRow][pickedCol].zone == 23) {
      this.removeDepot(this.point(pickedCol, pickedRow))
    }
    this.grid[pickedRow][pickedCol].tile.setTexture('terrain', this.grid[pickedRow][pickedCol].oldIndex)
    this.grid[pickedRow][pickedCol].type = 'dirt'
    this.grid[pickedRow][pickedCol].zone = 10
    this.grid[pickedRow][pickedCol].cursheet = 'terrain'
    this.grid[pickedRow][pickedCol].curIndex = this.grid[pickedRow][pickedCol].oldIndex
    this.saveMap()
  }
  clearSize(point) {
    var tiles = this.getTilesInRange(point, 1)
    // console.log(tiles.length)
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].partOf = null
      tiles[i].type = 'dirt'
      tiles[i].zone = 10;
      tiles[i].tile.setDepth(0)
      tiles[i].size = 1
    }
  }
  clearSizeSquare(point) {
    var tiles = this.getTilesSquare(point)
    //console.log(tiles.length)
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].partOf = null
      tiles[i].type = 'dirt'
      tiles[i].zone = 10;
      tiles[i].tile.setDepth(0)
      tiles[i].tile.setOrigin(.5)
      tiles[i].size = 1
    }
  }
  ////////////////////////////////////////////
  //
  // HELPERS
  //
  //////////////////////////////////////////////
  setPrev(dir) {
    if (dir == 'l') {

    } else if (dir == 'l') {

    }
  }
  getId(point) {
    return this.grid[point.y][point.x].id
  }
  roadInRange(point) {
    var tiles = this.getTilesInRange(point, gameStats.roadRange)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 11) {
        return true
      }
    }
    return false
  }
  depotInRange(point) {
    var tiles = this.getTilesInRange(point, gameStats.depotRange)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 22 || tiles[i].zone == 23) {
        return true
      }
    }
    return false
  }
  addDepot(point) {
    var tiles = this.getTilesInRange(point, gameStats.depotRange)
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].hasRail = true;
    }
  }
  removeDepot(point) {
    var tiles = this.getTilesInRange(point, gameStats.depotRange)
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].hasRail = false;
    }
  }
  waterInRange(point) {
    var tiles = this.getTilesInRange(point, gameStats.waterRange)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 16) {
        return true
      }
    }
    return false
  }
  removeWater(point) {
    var tiles = this.getTilesInRange(point, gameStats.waterRange)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 0) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.lR--
      } else if (tiles[i].zone == 1) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.mR--
      } else if (tiles[i].zone == 2) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.dR--
      } else if (tiles[i].zone == 3) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.lC--
      } else if (tiles[i].zone == 4) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.mC--
      } else if (tiles[i].zone == 5) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.dC--
      } else if (tiles[i].zone == 6) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.lI--
      } else if (tiles[i].zone == 7) {
        tiles[i].hasWater = false;
        tiles[i].tile.setAlpha(.5);
        gameStats.hI--
      }
    }
  }
  addWater(point) {
    var tiles = this.getTilesInRange(point, gameStats.waterRange)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 0) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.lR++
      } else if (tiles[i].zone == 1) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.mR++
      } else if (tiles[i].zone == 2) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.dR++
      } else if (tiles[i].zone == 3) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.lC++
      } else if (tiles[i].zone == 4) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.mC++
      } else if (tiles[i].zone == 5) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.dC++
      } else if (tiles[i].zone == 6) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.lI++
      } else if (tiles[i].zone == 7) {
        tiles[i].hasWater = true;
        tiles[i].tile.setAlpha(1);
        gameStats.hI++
      }
    }
  }
  getTilesInRange(point, range) {
    var tilesInRange = [];
    for (var y = point.y - range; y <= point.y + range; y++) {
      for (var x = point.x - range; x <= point.x + range; x++) {
        if (this.validPoint(x, y)) {
          tilesInRange.push(this.grid[y][x])
        }

      }
    }
    return tilesInRange
  }
  getTilesSquare(point) {
    var tilesInSquare = [];
    if (this.validPoint(point.x, point.y)) {
      tilesInSquare.push(this.grid[point.y][point.x])
    }
    if (this.validPoint(point.x + 1, point.y)) {
      tilesInSquare.push(this.grid[point.y][point.x + 1])
    }
    if (this.validPoint(point.x, point.y + 1)) {
      tilesInSquare.push(this.grid[point.y + 1][point.x])
    }
    if (this.validPoint(point.x + 1, point.y + 1)) {
      tilesInSquare.push(this.grid[point.y + 1][point.x + 1])
    }
    return tilesInSquare
  }

  validPoint(x, y) {
    return x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight
  }
  canContinueRoad(point) {
    if (this.grid[point.y][point.x].zone == 11) {
      return true
    } else if (this.grid[point.y][point.x].zone == 10) {
      return true
    } else if (this.grid[point.y][point.x].zone == 15) {
      if (this.grid[point.y][point.x].curIndex == 6 || this.grid[point.y][point.x].curIndex == 9) {
        return true
      }
    }
    return false
  }
  canContinueRail(point) {
    if (this.grid[point.y][point.x].zone == 15) {
      return true
    } else if (this.grid[point.y][point.x].zone == 10) {
      return true
    } else if (this.grid[point.y][point.x].zone == 11) {
      if (this.grid[point.y][point.x].curIndex == 6 || this.grid[point.y][point.x].curIndex == 9) {
        return true
      }
    }
    return false
  }
  newTile(point) {
    for (var i = 0; i < this.selected.length; i++) {
      if (this.selected[i].x == point.x && this.selected[i].y == point.y) {
        return false
      }

    }
    return true
  }

  areNext(p1, p2) {
    return (Math.abs(p1.x - p2.x) == 1 && p1.y - p2.y == 0 || Math.abs(p1.y - p2.y) == 1 && p1.x - p2.x == 0)
  }

  calculateRoad(point) {
    var value = 0
    if (this.grid[point.y - 1][point.x].type == 'road' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 1;
    }
    if (this.grid[point.y + 1][point.x].type == 'road' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 8;
    }
    if (this.grid[point.y][point.x - 1].type == 'road' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 2;
    }
    if (this.grid[point.y][point.x + 1].type == 'road' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 4;
    }
    return value
  }
  calculateRail(point) {
    var value = 0
    if (this.grid[point.y - 1][point.x].type == 'rail' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 1;
    }
    if (this.grid[point.y + 1][point.x].type == 'rail' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 8;
    }
    if (this.grid[point.y][point.x - 1].type == 'rail' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 2;
    }
    if (this.grid[point.y][point.x + 1].type == 'rail' || this.grid[point.y - 1][point.x].type == 'crossing') {
      value += 4;
    }
    return value
  }
  isNeighbour_(newP, lastP) {
    var x = lastP.x - newP.x;
    var y = lastP.y - newP.y;
    //console.log('x' + x + ',y' + y)
    if (x === -1 && y === 0) {
      return 'l';
    } else if (x === 1 && y === 0) {
      return 'r';
    } else if (x === 0 && y === -1) {
      return 't';
    } else if (x === 0 && y === 1) {
      return 'b';
    }

    return false;
    //returns located of previous tile
    // return (Math.abs(point1.x - point2.x) === 1 && Math.abs(point1.y - point2.y) === 0) ||
    //     (Math.abs(point1.x - point2.x) === 0 && Math.abs(point1.y - point2.y) === 1);
  }
  getNeighbors(point) {
    var nArray = []
    nArray.push(this.grid[point.y - 1][point.x])
    nArray.push(this.grid[point.y + 1][point.x])
    nArray.push(this.grid[point.y][point.x - 1])
    nArray.push(this.grid[point.y][point.x + 1])
    return nArray
  }
  point(x, y) {
    return {
      x: x,
      y: y
    }
  }
  addScore() {
    this.events.emit('score');
  }
  ////////////////////////////////////////////
  //
  // CREATE NEW MAP
  //
  //////////////////////////////////////////////
  createMap() {
    //generate land/water map


    let m = new Map(mapConfig);
    m.generateMap()
    let mapData = m.getMap()
    //convert to autotile indexes
    const tiles = new autotile(mapData);

    var count = 0;
    for (var y = 0; y < mapConfig.height; y++) {
      let row = Array(mapConfig.width);
      for (var x = 0; x < mapConfig.width; x++) {
        var ind = tiles[y][x]
        row[x] = new Tile(this, x, y, ind, count, this.xOffset, tilesize, this.yOffset)
        count++;
      }
      this.grid[y] = row
    }
    this.saveMap()
  }


  ////////////////////////////////////////////
  //
  // LOAD EXISTING MAP
  //
  //////////////////////////////////////////////
  loadMap() {

    this.grid = gameMap;
    this.buildingQue = gameStats.bQ;
    censusHistory = gameStats.cH;
    for (var y = 0; y < this.gridHeight; y++) {
      for (var x = 0; x < this.gridWidth; x++) {
        if (this.grid[y][x].size == 1) {
          var d = 0
        } else {
          var d = 1
        }
        this.grid[y][x].tile = this.add.image(this.xOffset + (x * tilesize + tilesize / 2), this.yOffset + (y * tilesize + tilesize / 2), this.grid[y][x].cursheet, this.grid[y][x].curIndex).setDepth(d)
        if (this.grid[y][x].size == 2) {
          this.grid[y][x].tile.setOrigin(.25)
        }
      }

    }
  }
  ////////////////////////////////////////////
  //
  // SAVE MAP
  //
  //////////////////////////////////////////////
  saveMap() {
    gameMap = this.grid;
    localStorage.setItem('cityMap', JSON.stringify(gameMap));
  }
  saveStats() {
    localStorage.setItem('cityStats', JSON.stringify(gameStats));

  }



}
