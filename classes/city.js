class City {
  constructor(scene, width, height) {
    this.width = width;
    this.height = height;
    this.main = scene
  }
  ////////////////////////////////////////////
  //
  // Calculate RCI demand
  //
  //////////////////////////////////////////////
  evaluateDay() {
    var taxMax = 20;

    var employment = 0,
      migration = 0,
      births = 0,
      projectedResPop = 0,
      projectedComPop = 0,
      projectedIndPop = 0,
      laborBase = 0;

    //Not sure why this is done but it works in Sim City so it works here.. =)
    //var normalizedResPop = censusHistory.resPopulation;
    var normalizedResPop = censusHistory.workforce;

    //City's total population
    this._population = normalizedResPop + censusHistory.comPopulation + censusHistory.indPopulation;

    //Employment ratio is determined by historic data
    //more jobs than pop = >1
    //less jobs than pop = <1
    if (censusHistory.resPopulation > 0) {
      employment = (censusHistory.comPopulation + censusHistory.indPopulation) / normalizedResPop
    }
    else {
      employment = 1;
    }
    console.log('employment: ' + employment)
    //Determine how much people come from elsewhere to the city
    //Availability of employment and existing population affect this
    migration = normalizedResPop * (employment - 1);

    //Births are determined by pop and birthrate which is 0.02
    births = normalizedResPop * 0.02;

    //This is the projected new population for the next year
    projectedResPop = normalizedResPop + migration + births;

    //Determine how much labor is needed at the city based on previous populations
    //affects how much industry city requires
    var prevLaborNeed = censusHistory.comPopulation + censusHistory.indPopulation;
    if (prevLaborNeed > 0) {
      //Divide by 8 to make into normalized res pop
      //laborBase = (this._censusHistory.resPopulation / 8) / prevLaborNeed;
      laborBase = (normalizedResPop) / prevLaborNeed;
    }
    else {
      laborBase = 1;
    }

    laborBase = clamp(laborBase, 0, 1.3);

    var internalMarket = (normalizedResPop + censusHistory.comPopulation + censusHistory.indPopulation) / 3.7;

    //how much commercial will be needed in the future
    projectedComPop = internalMarket * laborBase;

    //1.2 for easy in original		
    projectedIndPop = censusHistory.indPopulation * laborBase * 1.2;

    //there's always projectedIndPopMin amount of industrial demand
    projectedIndPop = projectedIndPop > 5 ? projectedIndPop : 5;

    //projected pop vs actual pop -ratios
    var resRatio = 1.3; //defaults to 1.3
    if (normalizedResPop > 0) {
      resRatio = projectedResPop / normalizedResPop;
    }

    var comRatio = projectedComPop;
    if (censusHistory.comPopulation > 0) {
      comRatio = projectedComPop / censusHistory.comPopulation;
    }

    var indRatio = projectedIndPop;
    if (censusHistory.indPopulation > 0) {
      indRatio = projectedIndPop / censusHistory.indPopulation;
    }

    resRatio = resRatio < 2 ? resRatio : 2;
    comRatio = comRatio < 2 ? comRatio : 2;
    indRatio = indRatio < 2 ? indRatio : 2;

    //Effect of each tax ratio on demand
    var taxRatioEffects = [200, 150, 120, 100, 80, 50, 30, 0, -10, -40, -100,
      -150, -200, -250, -300, -350, -400, -450, -500, -550, -600];

    //"counter weight" for tax effect
    var taxScale = 600;
    //var taxModifier = min(this._taxRatio, taxMax);
    var taxModifier = Math.min(7, taxMax);
    resRatio = (resRatio - 1) * taxScale + taxRatioEffects[taxModifier];
    comRatio = (comRatio - 1) * taxScale + taxRatioEffects[taxModifier];
    indRatio = (indRatio - 1) * taxScale + taxRatioEffects[taxModifier];

    gameStats.resValve = clamp(gameStats.resValve + Math.round(resRatio), -2000, 2000);
    gameStats.comValve = clamp(gameStats.comValve + Math.round(comRatio), -1500, 1500);
    gameStats.indValve = clamp(gameStats.indValve + Math.round(indRatio), -1500, 1500);
    //console.log('res v ' + gameStats.resValve + ', com v ' + gameStats.comValve + ', ind v ' + gameStats.indValve)
    // gameStats.resValve = clamp(gameStats.resValve + Math.round(resRatio), -RES_VALVE_RANGE, RES_VALVE_RANGE);
    // gameStats.comValve = clamp(gameStats.comValve + Math.round(comRatio), -COM_VALVE_RANGE, COM_VALVE_RANGE);
    // gameStats.indValve = clamp(gameStats.indValve + Math.round(indRatio), -IND_VALVE_RANGE, IND_VALVE_RANGE);
    //////
  }
  ////////////////////////////////////////////
  //
  // update land values
  //
  //////////////////////////////////////////////
  landValueUpdate(grid) {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (grid[y][x].zone < 8) {
          grid[y][x].landValue = 0;
          //get average polution index of surrounding tiles range 5, normalized 0-10
          var avPI = this.getAveragePollution(grid, this.getPoint(x, y), 5);
          var normalPI = (avPI - 0) / (100 - 0) * 10;
          grid[y][x].landValue -= normalPI
          // get average iq normal
          var avIQ = this.getAverageIQ(grid, this.getPoint(x, y), 5);
          var normalIQ = (avIQ - 0) / (100 - 0) * 10;
          grid[y][x].landValue += normalIQ



          //hospital
          if (this.nearZone(grid, this.getPoint(x, y), 18, 5)) {
            grid[y][x].landValue += 10
          }
          //open land
          if (this.nearZone(grid, this.getPoint(x, y), 10, 1)) {
            grid[y][x].landValue += 10
          }
          //near open water
          if (this.nearOpenWater(grid, this.getPoint(x, y), 2)) {
            grid[y][x].landValue += 20
          }
          //park count
          var park = this.nearZoneCount(grid, this.getPoint(x, y), 13, 3)
          if (park > 0) {
            grid[y][x].landValue += 10 * park
          }
          //heavy ind count
          var hI = this.nearZoneCount(grid, this.getPoint(x, y), 7, 4)
          if (hI > 0) {
            grid[y][x].landValue -= 20 * hI
          }
          //light ind count
          var lI = this.nearZoneCount(grid, this.getPoint(x, y), 6, 3)
          if (lI > 0) {
            grid[y][x].landValue -= 10 * lI
          }

          //police station within half coverage for LV bonus
          if (this.nearZone(grid, this.getPoint(x, y), 21, Math.floor(gameStats.policeRange / 2))) {
            grid[y][x].landValue += 10
          }
          //fire station within half coverage for LV bonus
          if (this.nearZone(grid, this.getPoint(x, y), 17, Math.floor(gameStats.fireRange / 2))) {
            grid[y][x].landValue += 10
          }
        }
      }
    }
  }
  ////////////////////////////////////////////
  //
  // update IQ
  //
  //////////////////////////////////////////////
  iqValueUpdate(grid) {
    var total = 0
    var count = 0
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (grid[y][x].zone < 3) {
          grid[y][x].IQ = 0
          //elem
          grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x, y), 3, 'Elementary School')
          //high
          grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x, y), 4, 'High School')
          //privite
          grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x, y), 2, 'Private School')
          //community
          grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x, y), 5, 'Community College')
          //university
          grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x, y), 15, 'University')
          total += grid[y][x].IQ;
          count++;
        }
      }

    }
    var avg = Math.floor(total / count)
    console.log('IQ avg' + avg)
    // grid,point,range,kind
    //elem 3 'Elementary School'
    //high 4 'High School'
    //private 2 'Private School'
    //community 5 'Community College'
    //university 15 'University'
  }
  ////////////////////////////////////////////
  //
  // Calculate pollution
  //
  //////////////////////////////////////////////
  makePollutionIndex(grid, point) {
    var score = 0;
    var tiles = this.getTilesInRange(point, 3)
    for (var i = 0; i < tiles.length; i++) {
      //low ind
      if (tiles[i].zone == 6) {
        score += 10
      }
      //heavy ind
      if (tiles[i].zone == 7) {
        score += 20
      }
      //open terrain
      if (tiles[i].zone == 10) {
        score -= 3
      }
      //park
      if (tiles[i].zone == 13) {
        score += tiles[i].info.pollution
      }
      //road
      if (tiles[i].zone == 11) {
        score += 3
      }
      //rail
      if (tiles[i].zone == 15) {
        score -= 3
      }
      //power
      if (tiles[i].zone == 12) {
        score -= tiles[i].info.pollution
      }
    }
    return score
  }

  ////////////////////////////////////////////
  //
  // BUILD ZONES
  //
  //////////////////////////////////////////////
  buildZones(que, grid) {
    var amount = que.length;
    if (amount == 0) { return }
    //console.log(amount)
    for (var i = amount - 1; i > -1; i--) {
      var point = que[i]

      var zone = grid[point.y][point.x].zone
      var chance = 11
      if (zone == 0) {
        if (gameStats.resValve < 0) {
          chance = 1
          //continue;
        } else if (gameStats.resValve < 1000) {
          chance = 5
        } else {
          chance = 9
        }
        if (this.nearZone(grid, point, 19, 3)) {
          chance += 1
        }
      } else if (zone == 3) {
        if (gameStats.comValve < 0) {
          chance = 1
          //continue;
        } else if (gameStats.comValve < 750) {
          chance = 5
        } else {
          chance = 9
        }
      } else if (zone == 6) {
        if (gameStats.indValve < 0) {
          chance = 1
          //continue;
        } else if (gameStats.indValve < 750) {
          chance = 5
        } else {
          chance = 9
        }
      }
      //  if (this.roadInRange(point) && this.nearWaterTower(point)) {
      if (Math.random() * 10 < chance) {




       point = que.pop()

        var zone = grid[point.y][point.x].zone
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
        grid[point.y][point.x].tile.setTexture(currentArray[ran].sheet, currentArray[ran].index);
        grid[point.y][point.x].type = currentArray[ran].name
        grid[point.y][point.x].cursheet = currentArray[ran].sheet;
        grid[point.y][point.x].curIndex = currentArray[ran].index;
        grid[point.y][point.x].landValue = 0
        var pi = this.makePollutionIndex(grid, point)

        //   if(this.depotInRange(point)){
        //     grid[point.y][point.x].hasRail = true
        //   }
        // grid[point.y][point.x].hasWater = true;
        // grid[point.y][point.x].hasRoad = true;
        grid[point.y][point.x].pI = pi
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

      }
    }
    gameStats.bQ = que

  }


  ////////////////////
  //helpers
  ///////////////////
  isWatered(grid, point) {
    if (grid[point.y][point.x].hasWater) {
      return true
    } else {
      return false
    }
  }
  isConnected(grid, point) {
    if (grid[point.y][point.x].hasRoad) {
      return true
    } else {
      return false
    }
  }
  nearZone(grid, point, zone, range) {
    var tiles = this.getTilesInRange(point, range)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == zone) {
        return true
      }
    }
    return false
  }
  nearWaterTower(point) {
    var tiles = this.getTilesInRange(point, gameStats.waterRange)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].type == "Water Tower") {
        return true
      }
    }
    return false
  }
  nearOpenWater(grid, point, range) {
    var tiles = this.getTilesInRange(point, range)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 10) {
        if (tiles[i].curIndex == 0) {
          return true
        }
      }
    }
    return false
  }
  nearZoneCount(grid, point, zone, range) {
    var tiles = this.getTilesInRange(point, range)
    var count = 0
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == zone) {
        count++
      }
    }
    return count
  }
  nearZoneEduVal(grid, point, range, kind) {


    var tiles = this.getTilesInRange(point, range)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 19) {

        if (tiles[i].type == kind) {
          return tiles[i].info.addIQ
        }
      }
    }
    return 0

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
  getAveragePollution(grid, point, range) {
    var tiles = this.getTilesInRange(point, range)
    var pITotal = 0
    for (var i = 0; i < tiles.length; i++) {
      pITotal += tiles[i].pI
    }
    var pIAverage = Math.round(pITotal / tiles.length)
    return pIAverage
  }
  getAverageIQ(grid, point, range) {
    var tiles = this.getTilesInRange(point, range)
    var iqTotal = 0
    for (var i = 0; i < tiles.length; i++) {
      iqTotal += tiles[i].IQ
    }
    var iqAverage = Math.round(iqTotal / tiles.length)
    return iqAverage
  }
  getCityCenterDistance(point) {
    var centerX = Math.floor(this.width / 2);
    var centerY = Math.floor(this.height / 2);
    var xDis, yDis
    if (point.x > centerX) {
      xDis = point.x - centerX;
    } else {
      xDis = centerX - point.x
    }
    if (point.y > centerY) {
      yDis = point.y - centerY;
    } else {
      yDis = centerY - point.y
    }
    return Math.min(xDis + yDis, 64)
    //console.log('center x ' + centerX + ', center y ' + centerY)

  }
  getTilesInRange(point, range) {
    var tilesInRange = [];
    for (var y = point.y - range; y <= point.y + range; y++) {
      for (var x = point.x - range; x <= point.x + range; x++) {
        if (this.validPoint(x, y)) {
          tilesInRange.push(this.main.grid[y][x])
        }

      }
    }
    return tilesInRange
  }
  validPoint(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
  getPoint(x, y) {
    return { x: x, y: y }
  }
}
/*
zones:
  0 low residential
1 medium residential
2 dense residential
3 low commercial
4 medium commercial
5 dense commercial
6 low industrial
7 heavy industrial
8--
9--
10 terrain
11 road
12 power
13 park
14 special
15 rail
16 water
17 fire
18 health
19 education
20 government
21 police
*/
