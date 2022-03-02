class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {

    if (mapLoad == 'load') {

    } else {
      gameStats = defaultStats;
      this.saveStats()
    }
    
    this.drag = false;
    this.info = false;
    this.dayLength = 24000
    
var Main = this.scene.get('playGame');

    //day
    this.header = this.add.image(0, 0, 'blank').setOrigin(0, 0).setTint(0x3e5e71);
    this.header.displayWidth = 150;
    this.header.displayHeight = 200;

    this.progress = this.add.image(0, 0, 'blank').setOrigin(0)
    this.progress.displayWidth = 25
    this.progress.displayHeight = 0

    this.scoreText = this.add.bitmapText(72.5, 85, 'topaz', gameStats.day, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);
this.dayPartText = this.add.bitmapText(650, 225, 'topaz', 'morning', 40).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1).setInteractive();

    this.modeText = this.add.bitmapText(475, 225, 'topaz', gameMode, 40).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1).setInteractive();
    
    this.fundsText = this.add.bitmapText(315, 30, 'topaz', '$' + gameStats.funds, 50).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);
    this.popText = this.add.bitmapText(315, 100, 'topaz', 'P: --', 50).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);
    this.avgText = this.add.bitmapText(315, 170, 'topaz', 'LV: -- IQ: --', 50).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);
    this.rciText = this.add.bitmapText(15, 225, 'topaz', 'R:' + gameStats.resValve + ' C:' + gameStats.comValve + 'I:' + gameStats.indValve, 40).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);

    this.rcibg = this.add.image(150, 100, 'blank').setOrigin(0,.5).setTint(0xfafafa).setAlpha(.7)
    this.rcibg.displayWidth = 150
    this.rcibg.displayHeight = 200

    this.res = this.add.image(175, 100, 'blank').setOrigin(.5, 1).setTint(0x529345)
    this.res.displayWidth = 25
    this.res.displayHeight = -75

    this.com = this.add.image(225, 100, 'blank').setOrigin(.5, 1).setTint(0x45a0c6)
    this.com.displayWidth = 25
    this.com.displayHeight = -75

    this.ind = this.add.image(275, 100, 'blank').setOrigin(.5, 1).setTint(0xc6c245)
    this.ind.displayWidth = 25
    this.ind.displayHeight = -75

    this.rci = this.add.image(225, 100, 'blank').setOrigin(.5, 1).setTint(0x000000)
    this.rci.displayWidth = 150
    this.rci.displayHeight = 5
    
    this.cursorIcon = this.add.image(825, 1389, 'icons', 1).setOrigin(.5).setScale(3).setInteractive();
    this.cursorIcon.on('pointerdown', function() {
      this.events.emit('cursor');
      if (this.drag) {
        this.drag = false;
        this.cursorIcon.setFrame(1)
      } else {
        this.drag = true;
        this.cursorIcon.setFrame(2)
      }
    }, this)

    this.infoIcon = this.add.image(825, 1500, 'icons', 8).setOrigin(.5, 0).setScale(3).setInteractive();
    this.infoIcon.on('pointerdown', function() {
      //this.events.emit('info');
      if (this.info) {
        this.info = false;
        this.infoIcon.setFrame(8)
        gameMode = GM_MENU
      } else {
        this.info = true;
        this.infoIcon.setFrame(17)
        gameMode = GM_INFO
      }
    }, this)

    this.mayorIcon = this.add.image(825, 100, 'icons', 22).setOrigin(.5, 0).setScale(3).setInteractive();
    this.mayorIcon.on('pointerdown', function() {
      //this.events.emit('info');

      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
      this.scene.launch('mayor')

    }, this)

    this.messageIcon = this.add.image(825, 0, 'icons', 28).setOrigin(.5, 0).setScale(3).setInteractive();
    this.messageIcon.on('pointerdown', function() {
      //this.events.emit('info');

      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.pause('Menu')
      this.scene.launch('Messages')

    }, this)
    this.waterIcon = this.add.image(825, 325, 'mayor_icons', 16).setOrigin(.5, 0).setScale(2).setInteractive();
    this.waterIcon.on('pointerdown', function() {
      this.events.emit('view', 0);
    }, this)
    this.waterIcon = this.add.image(825, 400, 'mayor_icons', 15).setOrigin(.5, 0).setScale(2).setInteractive();
    this.waterIcon.on('pointerdown', function() {
      this.events.emit('view', 1);
    }, this)
    this.policeIcon = this.add.image(825, 475, 'mayor_icons', 2).setOrigin(.5, 0).setScale(2).setInteractive();
    this.policeIcon.on('pointerdown', function() {
      this.events.emit('view', 2);
    }, this)
    this.fireIcon = this.add.image(825, 550, 'mayor_icons', 3).setOrigin(.5, 0).setScale(2).setInteractive();
    this.fireIcon.on('pointerdown', function() {
      this.events.emit('view', 3);
    }, this)
    this.healthIcon = this.add.image(825, 625, 'mayor_icons', 1).setOrigin(.5, 0).setScale(2).setInteractive();
    this.healthIcon.on('pointerdown', function() {
      this.events.emit('view', 4);
    }, this)
    this.eduIcon = this.add.image(825, 700, 'mayor_icons', 4).setOrigin(.5, 0).setScale(2).setInteractive();
    this.eduIcon.on('pointerdown', function() {
      this.events.emit('view', 5);
    }, this)
    this.clearIcon = this.add.image(825, 775, 'mayor_icons', 17).setOrigin(.5, 0).setScale(2).setInteractive();
    this.clearIcon.on('pointerdown', function() {
      this.events.emit('viewClear');
    }, this)
    Main.events.on('score', function() {

      this.score += 1;
      //console.log('dots ' + string)

      this.scoreText.setText(this.score)

    }, this);

    Main.events.on('lowerFund', function(data) {
      gameStats.funds -= data
      this.fundsText.setText('$' + gameStats.funds)
      this.saveStats();
    }, this);
    Main.events.on('raiseFund', function(data) {
      gameStats.funds += data
      this.fundsText.setText('$' + gameStats.funds)
      this.saveStats();
    }, this);
    Main.events.on('newDay', function() {
      this.updateDisplay()
    }, this);
    

    this.day = this.time.addEvent({
      delay: this.dayLength,
      callback: function() {
        this.events.emit('endDay');
        gameStats.day++
        this.scoreText.setText(gameStats.day);
        this.saveStats()
      },
      callbackScope: this,
      loop: true
    })


  }

  update() {
    this.modeText.setText(this.getGM())
    this.rciText.setText('R:' + gameStats.resValve + ' C:' + gameStats.comValve + ' I:' + gameStats.indValve);

    this.res.displayHeight = 75 * (gameStats.resValve / 2000)
    this.com.displayHeight = 75 * (gameStats.comValve / 1500)
    this.ind.displayHeight = 75 * (gameStats.indValve / 1500)

    this.progress.displayHeight = 200 * (this.day.getElapsed() / this.dayLength)
    if(this.day.getElapsed() < 12000){
      this.dayPartText.setText('morning')
    } else {
      this.dayPartText.setText('night')
    }
  }
  updateDisplay() {

    this.fundsText.setText('$' + gameStats.funds)
    this.popText.setText('P:' + censusHistory.resPopulation + ' (' + censusHistory.comPopulation + ',' + censusHistory.indPopulation + ')')
    this.avgText.setText('LV:' + censusHistory.landValueAvg + ' IQ:' + censusHistory.iqAvg);
    this.saveStats();
  }
  
  getGM() {
    /* const GM_ROAD = 0
     const GM_PAN = 1
     const GM_PLACE = 2
     const GM_MENU = 3
     const GM_SELECT = 4
     const GM_ERASE = 5 */
    if (gameMode == GM_ROAD) {
      return 'GM_ROAD'
    } else if (gameMode == GM_PAN) {
      return 'GM_PAN'
    } else if (gameMode == GM_PLACE) {
      return 'GM_PLACE'
    } else if (gameMode == GM_MENU) {
      return 'GM_MENU'
    } else if (gameMode == GM_SELECT) {
      return 'GM_SELECT'
    } else if (gameMode == GM_ERASE) {
      return 'GM_ERASE'
    } else if (gameMode == GM_INFO) {
      return 'GM_INFO'
    }
  }
  saveStats() {
    localStorage.setItem('cityStats', JSON.stringify(gameStats));

  }
}
