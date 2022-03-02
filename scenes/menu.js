class Menu extends Phaser.Scene {

  constructor() {

    super("Menu");
  }
  preload() {



  }
  create() {
    this.menuOpen = false;
    this.currentIcon = null
    var Main = this.scene.get('playGame');
    
    this.transportationIcon = this.add.image(15, 1500, 'icons', 5).setOrigin(0).setScale(2).setInteractive();
    this.transportationIcon.unselected = 5
    this.transportationIcon.on('pointerdown', function() {

      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }

      this.transportationIcon.setFrame(14)
      this.currentIcon = this.transportationIcon
      this.showMenu(this.transportationContainer)
    }, this)





    /*
        this.roadsIcon = this.add.image(15, 1500, 'icons', 5).setOrigin(0).setScale(2).setInteractive();
        this.roadsIcon.unselected = 5;
        this.roadsIcon.on('pointerdown', function() {
          gameMode = GM_ROAD

          if (this.currentIcon) {
            //this.menuContainer.destroy()
            this.currentIcon.setFrame(this.currentIcon.unselected)
            this.currentIcon = null
          }
          if (this.menuOpen) {
            this.closeMenu()
          }
          this.roadsIcon.setFrame(14)
          this.currentIcon = this.roadsIcon
        }, this)
    */
    
    /*
    this.rrIcon = this.add.image(94, 1500, 'icons', 18).setOrigin(0).setScale(2).setInteractive();
    this.rrIcon.unselected = 18;
    this.rrIcon.on('pointerdown', function() {
      gameMode = GM_RAIL

      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }
      if (this.menuOpen) {
        this.closeMenu()
      }
      this.rrIcon.setFrame(19)
      this.currentIcon = this.rrIcon
    }, this)
*/
    this.utilitiesIcon = this.add.image(173, 1500, 'icons', 3).setOrigin(0).setScale(2).setInteractive();
    this.utilitiesIcon.unselected = 3
    this.utilitiesIcon.on('pointerdown', function() {

      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }

      this.utilitiesIcon.setFrame(12)
      this.currentIcon = this.utilitiesIcon
      this.showMenu(this.utilitiesContainer)
    }, this)



    this.civicIcon = this.add.image(252, 1500, 'icons', 4).setOrigin(0).setScale(2).setInteractive();
    this.civicIcon.unselected = 4
    this.civicIcon.on('pointerdown', function() {

      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }
      this.civicIcon.setFrame(13)
      this.currentIcon = this.civicIcon
      this.showMenu(this.civicContainer)
    }, this)

    this.specialIcon = this.add.image(331, 1500, 'icons', 6).setOrigin(0).setScale(2).setInteractive();
    this.specialIcon.unselected = 6
    this.specialIcon.on('pointerdown', function() {

      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }

      this.specialIcon.setFrame(15)
      this.currentIcon = this.specialIcon
      this.showMenu(this.specialContainer)
    }, this)

    this.zoneIcon = this.add.image(410, 1500, 'icons', 7).setOrigin(0).setScale(2).setInteractive();
    this.zoneIcon.unselected = 7;
    this.zoneIcon.on('pointerdown', function() {
      //gameMode = GM_SELECT
      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }
      this.zoneIcon.setFrame(16)
      this.currentIcon = this.zoneIcon
      this.showMenu(this.zoneContainer)
    }, this)

    this.educationIcon = this.add.image(489, 1500, 'icons', 24).setOrigin(0).setScale(2).setInteractive();
    this.educationIcon.unselected = 24;
    this.educationIcon.on('pointerdown', function() {
      //gameMode = GM_SELECT
      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }
      this.educationIcon.setFrame(25)
      this.currentIcon = this.educationIcon
      this.showMenu(this.educationContainer)
    }, this)

    this.safetyIcon = this.add.image(568, 1500, 'icons', 26).setOrigin(0).setScale(2).setInteractive();
    this.safetyIcon.unselected = 26;
    this.safetyIcon.on('pointerdown', function() {
      //gameMode = GM_SELECT
      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }
      this.safetyIcon.setFrame(27)
      this.currentIcon = this.safetyIcon
      this.showMenu(this.safetyContainer)
    }, this)


    this.bulldozeIcon = this.add.image(647, 1500, 'icons', 0).setOrigin(0).setScale(2).setInteractive();
    this.bulldozeIcon.unselected = 0
    this.bulldozeIcon.on('pointerdown', function() {

      if (this.currentIcon) {
        //this.menuContainer.destroy()
        this.currentIcon.setFrame(this.currentIcon.unselected)
        this.currentIcon = null
      }

      this.bulldozeIcon.setFrame(9)
      this.currentIcon = this.bulldozeIcon
      gameMode = GM_ERASE
    }, this)
    // this.panText = this.add.bitmapText(450, 130, 'topaz', 'pan', 50).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1).setInteractive();

    this.createTransportationMenu();
    this.createUtilitiesMenu();
    this.createCivicMenu();
    this.createSpecialMenu();
    this.createZoneMenu();
    this.createEducationMenu();
    this.createSafetyMenu();
    
    this.input.on('gameobjectdown', this.selectItem, this)
    
  }
  selectItem(e, item) {
    if (item.id != undefined) {
      if (item.type == 'place') {
        this.events.emit('place', item.data);
        this.closeMenu()
        gameMode = GM_PLACE;
      } else if (item.type == 'Zone') {
        this.events.emit('zone', item.data);
        this.closeMenu()
        gameMode = GM_SELECT;
      } else if (item.type == 'close') {
        this.closeMenu()
        gameMode = GM_MENU;
      } else if(item.type == 'road'){
        gameMode = GM_ROAD
        this.closeMenu()
      } else if(item.type == 'rail'){
        gameMode = GM_RAIL
        this.closeMenu()
      } else if (item.type == 'trans') {
      
      }
    }
  }
  closeMenu() {
    this.currentMenu.setPosition(-700, 0)
    this.menuOpen = false 
  }
  showMenu(menu) {
    if (this.menuOpen) {
      this.closeMenu()
    }
    this.currentMenu = menu;
    menu.setPosition()
    this.menuOpen = true
  }
  createTransportationMenu() {
    this.transportationContainer = this.add.container();
    var transbg = this.add.image(0, 1400 + 64, 'blank').setOrigin(0, 1).setAlpha(.8)
    transbg.displayWidth = 600
    transbg.displayHeight = 32 + transportation.length * 111
    this.transportationContainer.add(transbg)
    for (var u = transportation.length; u >= 0; u--) {
      if (u == transportation.length) {
        var menuItem = this.add.image(50, 1400 - 111 * u, 'icons', 20).setScale(2).setInteractive();
        this.transportationContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else if (u == 0) {
        
        var menuItem = this.add.image(60, 1400 - 111 * u, transportation[u].sheet, transportation[u].index).setScale(3).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * u, 'topaz', transportation[u].name + '\n $' + transportation[u].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
        menuItem.type = 'road';
        this.transportationContainer.add(menuItem)
        this.transportationContainer.add(itemText)
        menuItem.id = transportation[u].id
        menuItem.data = transportation[u];
      } else if (u == 1) {
        
        var menuItem = this.add.image(60, 1400 - 111 * u, transportation[u].sheet, transportation[u].index).setScale(3).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * u, 'topaz', transportation[u].name + '\n $' + transportation[u].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
        menuItem.type = 'rail';
        this.transportationContainer.add(menuItem)
        this.transportationContainer.add(itemText)
        menuItem.id = transportation[u].id
        menuItem.data = transportation[u];
      } else {
        if (transportation[u].size == 1) {
          var menuItem = this.add.image(60, 1400 - 111 * u, transportation[u].sheet, transportation[u].index).setScale(3).setInteractive();
        } else if (transportation[u].size == 2) {
          var menuItem = this.add.image(60, 1400 - 111 * u, transportation[u].sheet, transportation[u].index).setScale(1.5).setInteractive();
        } else {
          var menuItem = this.add.image(60, 1400 - 111 * u, transportation[u].sheet, transportation[u].index).setScale(1).setInteractive();
        }
        var itemText = this.add.bitmapText(120, 1400 - 111 * u, 'topaz', transportation[u].name + '\n $' + transportation[u].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);

        // var menuItem = this.add.image(50, 1400 - 79 * u, utilities[u].sheet, utilities[u].index).setScale(2).setInteractive();
        this.transportationContainer.add(menuItem)
        this.transportationContainer.add(itemText)
        menuItem.id = transportation[u].id
        menuItem.data = transportation[u];
        menuItem.type = 'place';
      }

    }


    this.transportationContainer.setPosition(-700, 0)

  }
  createUtilitiesMenu() {
    this.utilitiesContainer = this.add.container();

    var utilbg = this.add.image(0, 1400 + 64, 'blank').setOrigin(0, 1).setAlpha(.8)
    utilbg.displayWidth = 600
    utilbg.displayHeight = 32 + utilities.length * 111
    this.utilitiesContainer.add(utilbg)
    for (var u = utilities.length; u >= 0; u--) {
      if (u == utilities.length) {
        var menuItem = this.add.image(50, 1400 - 111 * u, 'icons', 20).setScale(2).setInteractive();
        this.utilitiesContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else {
        if (utilities[u].size == 1) {
          var menuItem = this.add.image(60, 1400 - 111 * u, utilities[u].sheet, utilities[u].index).setScale(3).setInteractive();
        } else if (utilities[u].size == 2) {
          var menuItem = this.add.image(60, 1400 - 111 * u, utilities[u].sheet, utilities[u].index).setScale(1.5).setInteractive();
        } else {
          var menuItem = this.add.image(60, 1400 - 111 * u, utilities[u].sheet, utilities[u].index).setScale(1).setInteractive();
        }
        var itemText = this.add.bitmapText(120, 1400 - 111 * u, 'topaz', utilities[u].name + '\n $' + utilities[u].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);

        // var menuItem = this.add.image(50, 1400 - 79 * u, utilities[u].sheet, utilities[u].index).setScale(2).setInteractive();
        this.utilitiesContainer.add(menuItem)
        this.utilitiesContainer.add(itemText)
        menuItem.id = utilities[u].id
        menuItem.data = utilities[u];
        menuItem.type = 'place';
      }

    }
    this.utilitiesContainer.setPosition(-700, 0)
  }
  createCivicMenu() {
    this.civicContainer = this.add.container();

    var civbg = this.add.image(0, 1400 + 64, 'blank').setOrigin(0, 1).setAlpha(.7)
    civbg.displayWidth = 600
    civbg.displayHeight = 32 + civic.length * 111
    this.civicContainer.add(civbg)

    for (var c = civic.length; c >= 0; c--) {
      if (c == civic.length) {
        var menuItem = this.add.image(50, 1400 - 111 * c, 'icons', 20).setScale(2).setInteractive();
        this.civicContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else {
        if (civic[c].size == 1) {
          var menuItem = this.add.image(50, 1400 - 111 * c, civic[c].sheet, civic[c].index).setScale(3).setInteractive();
        } else if (civic[c].size == 2) {
          var menuItem = this.add.image(50, 1400 - 111 * c, civic[c].sheet, civic[c].index).setScale(1.5).setInteractive();
        } else {
          var menuItem = this.add.image(50, 1400 - 111 * c, civic[c].sheet, civic[c].index).setScale(1).setInteractive();
        }
        //var menuItem = this.add.image(50, 1400 - 79 * c, civic[c].sheet, civic[c].index).setScale(2).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * c, 'topaz', civic[c].name + '\n $' + civic[c].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);

        this.civicContainer.add(menuItem)
        this.civicContainer.add(itemText)
        menuItem.id = civic[c].id
        menuItem.data = civic[c]
        menuItem.type = 'place';
      }
    }
    this.civicContainer.setPosition(-700, 0)
  }
  createSpecialMenu() {
    this.specialContainer = this.add.container();

    var specbg = this.add.image(0, 1400 + 96, 'blank').setOrigin(0, 1).setAlpha(.7)
    specbg.displayWidth = 600
    specbg.displayHeight = 32 + special.length * 111
    this.specialContainer.add(specbg)

    for (var s = special.length; s >= 0; s--) {
      if (s == special.length) {
        var menuItem = this.add.image(50, 1400 - 111 * s, 'icons', 20).setScale(2).setInteractive();
        this.specialContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else {
        if (special[s].size == 1) {
          var menuItem = this.add.image(50, 1400 - 111 * s, special[s].sheet, special[s].index).setScale(3).setInteractive();
        } else if (special[s].size == 2) {
          var menuItem = this.add.image(50, 1400 - 111 * s, special[s].sheet, special[s].index).setScale(1.5).setInteractive();
        } else {
          var menuItem = this.add.image(50, 1400 - 111 * s, special[s].sheet, special[s].index).setScale(1).setInteractive();
        }
        //var menuItem = this.add.image(50, 1400 - 111 * s, special[s].sheet, special[s].index).setScale(3).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * s, 'topaz', special[s].name + '\n $' + special[s].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);

        this.specialContainer.add(menuItem)
        this.specialContainer.add(itemText)
        menuItem.id = special[s].id
        menuItem.data = special[s]
        menuItem.type = 'place';
      }

    }
    this.specialContainer.setPosition(-700, 0)
  }
  createEducationMenu() {
    this.educationContainer = this.add.container();

    var specbg = this.add.image(0, 1400 + 96, 'blank').setOrigin(0, 1).setAlpha(.7)
    specbg.displayWidth = 600
    specbg.displayHeight = 32 + education.length * 111
    this.educationContainer.add(specbg)

    for (var s = education.length; s >= 0; s--) {
      if (s == education.length) {
        var menuItem = this.add.image(50, 1400 - 111 * s, 'icons', 20).setScale(2).setInteractive();
        this.educationContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else {
        if (education[s].size == 1) {
          var menuItem = this.add.image(50, 1400 - 111 * s, education[s].sheet, education[s].index).setScale(3).setInteractive();
        } else if (education[s].size == 2) {
          var menuItem = this.add.image(50, 1400 - 111 * s, education[s].education, education[s].index).setScale(1.5).setInteractive();
        } else {
          var menuItem = this.add.image(50, 1400 - 111 * s, education[s].sheet, education[s].index).setScale(1).setInteractive();
        }
        //var menuItem = this.add.image(50, 1400 - 111 * s, special[s].sheet, special[s].index).setScale(3).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * s, 'topaz', education[s].name + '\n $' + education[s].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
        this.educationContainer.add(itemText)
        this.educationContainer.add(menuItem)
        menuItem.id = education[s].id
        menuItem.data = education[s]
        menuItem.type = 'place';
      }

    }
    this.educationContainer.setPosition(-700, 0)
  }

  createSafetyMenu() {
    this.safetyContainer = this.add.container();

    var specbg = this.add.image(0, 1400 + 96, 'blank').setOrigin(0, 1).setAlpha(.7)
    specbg.displayWidth = 600
    specbg.displayHeight = 32 + safety.length * 111
    this.safetyContainer.add(specbg)

    for (var s = safety.length; s >= 0; s--) {
      if (s == safety.length) {
        var menuItem = this.add.image(50, 1400 - 111 * s, 'icons', 20).setScale(2).setInteractive();
        this.safetyContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else {
        if (safety[s].size == 1) {
          var menuItem = this.add.image(50, 1400 - 111 * s, safety[s].sheet, safety[s].index).setScale(3).setInteractive();
        } else if (safety[s].size == 2) {
          var menuItem = this.add.image(50, 1400 - 111 * s, safety[s].education, safety[s].index).setScale(1.5).setInteractive();
        } else {
          var menuItem = this.add.image(50, 1400 - 111 * s, safety[s].sheet, safety[s].index).setScale(1).setInteractive();
        }
        //var menuItem = this.add.image(50, 1400 - 111 * s, special[s].sheet, special[s].index).setScale(3).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * s, 'topaz', safety[s].name + '\n $' + safety[s].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
        this.safetyContainer.add(itemText)
        this.safetyContainer.add(menuItem)
        menuItem.id = safety[s].id
        menuItem.data = safety[s]
        menuItem.type = 'place';
      }

    }
    this.safetyContainer.setPosition(-700, 0)
  }

  createZoneMenu() {
    this.zoneContainer = this.add.container();

    var zonebg = this.add.image(0, 1400 + 64, 'blank').setOrigin(0, 1).setAlpha(.7)
    zonebg.displayWidth = 600
    zonebg.displayHeight = 32 + zones.length * 111
    this.zoneContainer.add(zonebg)


    for (var z = zones.length; z >= 0; z--) {
      if (z == zones.length) {
        var menuItem = this.add.image(50, 1400 - 111 * z, 'icons', 20).setScale(2).setInteractive();
        this.zoneContainer.add(menuItem)
        menuItem.id = -5
        menuItem.type = 'close'
      } else {
        var menuItem = this.add.image(50, 1400 - 111 * z, zones[z].sheet, zones[z].index).setScale(2).setInteractive();
        var itemText = this.add.bitmapText(120, 1400 - 111 * z, 'topaz', zones[z].name + '\n $' + zones[z].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
        this.zoneContainer.add(itemText)
        this.zoneContainer.add(menuItem)
        menuItem.id = zones[z].id
        menuItem.data = zones[z]
        menuItem.type = 'Zone';
      }

    }



    this.zoneContainer.setPosition(-700, 0)
  }
}
