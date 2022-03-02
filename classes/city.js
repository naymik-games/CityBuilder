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
  evaluateDay(){
    var employment
  var totalPop = Math.round(censusHistory.resPopulation + censusHistory.comPopulation + censusHistory.indPopulation);
  if (gameStats.resPopulation > 10){
    employment = (censusHistory.comPopulation + censusHistory.indPopulation) / censusHistory.workforce;
   } else {
    employment = 1;
   }
   
   var migration = censusHistory.workforce * (employment -1)
   var births = censusHistory.workforce * gameStats.birthRate;
   var projectedResPop = censusHistory.workforce + migration + births
   
   // Examine how many zones require workers
    var labourBase = censusHistory.comPopulation + censusHistory.indPopulation;
    if (labourBase > 0.0){
      labourBase = censusHistory.workforce / labourBase;
    } else {
      labourBase = 1;
    }
    labourBase = clamp(labourBase, 0.0, gameStats.labourBaseMax);
      // Project future industry and commercial needs, taking into account available labour, and competition from
    // other global cities
    var extMarketParamTable = [1.2, 1.1, 0.98];
    var internalMarket = (censusHistory.workforce + censusHistory.comPopulation + censusHistory.indPopulation) / gameStats.internalMarketDenom;
    var projectedComPop = internalMarket * labourBase;
    var projectedIndPop = censusHistory.indPopulation * labourBase * extMarketParamTable[0];
    projectedIndPop = Math.max(projectedIndPop, gameStats.projectedIndPopMin);
      console.log('res project ' + projectedResPop + ', com project ' + projectedComPop + ', ind pro ' + projectedIndPop)
    
    // Calculate the expected percentage changes in each population type
    var resRatio;
    if (censusHistory.workforce > 0){
      resRatio = projectedResPop / censusHistory.workforce;
    } else {
      resRatio = gameStats.resRatioDefault;
    }

    var comRatio;
    if (censusHistory.comPopulation > 0){
      comRatio = projectedComPop / censusHistory.comPopulation;
    } else {
      comRatio = projectedComPop;
    }

    var indRatio;
    if (censusHistory.indPopulation > 0){
      indRatio = projectedIndPop / censusHistory.indPopulation;
    } else {
      indRatio = projectedIndPop;
    }

    resRatio = Math.min(resRatio, gameStats.resRatioMax);
    comRatio = Math.min(comRatio, gameStats.comRatioMax);
    indRatio = Math.min(indRatio, gameStats.indRatioMax);

    // Constrain growth according to the tax level.
    var taxTableScale = 600
    var taxTable = [
    200, 150, 120, 100, 80, 50, 30, 0, -10, -40, -100,
    -150, -200, -250, -300, -350, -400, -450, -500, -550, -600];
    var RES_VALVE_RANGE = 2000;
    var COM_VALVE_RANGE = 1500;
    var IND_VALVE_RANGE = 1500;
    var resCap = false;
    var comCap = false;
    var indCap = false;
    //var z = Math.min((budget.cityTax + gameLevel), taxMax);
    var z = 7;
    resRatio = (resRatio - 1) * taxTableScale + taxTable[z];
    comRatio = (comRatio - 1) * taxTableScale + taxTable[z];
    indRatio = (indRatio - 1) * taxTableScale + taxTable[z];

    gameStats.resValve = clamp(gameStats.resValve + Math.round(resRatio), -RES_VALVE_RANGE, RES_VALVE_RANGE);
    gameStats.comValve = clamp(gameStats.comValve + Math.round(comRatio), -COM_VALVE_RANGE, COM_VALVE_RANGE);
    gameStats.indValve = clamp(gameStats.indValve + Math.round(indRatio), -IND_VALVE_RANGE, IND_VALVE_RANGE);

    if (this.resCap && gameStats.resValve > 0)
      gameStats.resValve = 0;

    if (this.comCap && gameStats.comValve > 0)
        gameStats.comValve = 0;

    if (this.indCap && gameStats.indValve > 0)
        gameStats.indValve = 0;
    
    //console.log('res v ' + gameStats.resValve + ', com v ' + gameStats.comValve + ', ind v ' + gameStats.indValve)
    
    //////
  }
  ////////////////////////////////////////////
  //
  // update land values
  //
  //////////////////////////////////////////////
  landValueUpdate(grid){
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if(grid[y][x].zone < 8){
          grid[y][x].landValue = 0;
          //get average polution index of surrounding tiles range 5, normalized 0-10
          var avPI = this.getAveragePollution(grid, this.getPoint(x,y), 5);
          var normalPI = (avPI - 0) / (100 - 0) * 10;
          grid[y][x].landValue -= normalPI
          // get average iq normal
          var avIQ = this.getAverageIQ(grid, this.getPoint(x,y), 5);
          var normalIQ = (avIQ - 0) / (100 - 0) * 10;
          grid[y][x].landValue += normalIQ

          
          
          //hospital
          if(this.nearZone(grid, this.getPoint(x,y), 18, 5)){
            grid[y][x].landValue += 10
          } 
          //open land
          if(this.nearZone(grid, this.getPoint(x,y), 10, 1)){
            grid[y][x].landValue += 10
          }
          //near open water
          if (this.nearOpenWater(grid, this.getPoint(x, y), 2)) {
            grid[y][x].landValue += 20
          }
          //park count
          var park = this.nearZoneCount(grid, this.getPoint(x,y), 13, 3)
          if(park > 0){
            grid[y][x].landValue += 10 * park
          }
          //heavy ind count
          var hI = this.nearZoneCount(grid, this.getPoint(x,y), 7, 4)
          if(hI > 0){
            grid[y][x].landValue -= 20 * hI
          }
          //light ind count
          var lI = this.nearZoneCount(grid, this.getPoint(x,y), 6, 3)
          if(lI > 0){
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
  iqValueUpdate(grid){
    var total = 0
    var count = 0
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if(grid[y][x].zone < 3){
         grid[y][x].IQ = 0 
          //elem
         grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x,y), 3, 'Elementary School')
          //high
         grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x,y), 4, 'High School')
        //privite
         grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x,y), 2, 'Private School')
        //community
         grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x,y), 5, 'Community College')
        //university
         grid[y][x].IQ += this.nearZoneEduVal(grid, this.getPoint(x,y), 15, 'University')
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
  makePollutionIndex(grid, point){
    var score =0;
    var tiles = this.getTilesInRange(grid, point, 3)
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
  
  
  
  
  ////////////////////
  //helpers
  ///////////////////
  isWatered(grid, point){
    if(grid[point.y][point.x].hasWater){
      return true
    } else {
      return false
    }
  }
  isConnected(grid, point){
    if(grid[point.y][point.x].hasRoad){
      return true
    } else {
      return false
    }
  }
  nearZone(grid, point, zone, range){
    var tiles = this.getTilesInRange(grid, point, range)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == zone) {
        return true
      }
    }
    return false
  }
  nearOpenWater(grid, point, range) {
    var tiles = this.getTilesInRange(grid, point, range)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 10) {
        if (tiles[i].curIndex == 0) {
          return true
        }
      }
    }
    return false
  }
   nearZoneCount(grid, point, zone, range){
    var tiles = this.getTilesInRange(grid, point, range)
    var count = 0
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == zone) {
        count++
      }
    } 
    return count    
  }
  nearZoneEduVal(grid,point,range,kind){
    
    
    var tiles = this.getTilesInRange(grid, point, range, kind)
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].zone == 19) {
        
        if (tiles[i].type == kind) {
          return tiles[i].info.addIQ
        }
      }
    }
    return 0
  
  }
  getAveragePollution(grid, point, range){
    var tiles = this.getTilesInRange(grid, point, range)
    var pITotal = 0
    for (var i = 0; i < tiles.length; i++) {
      pITotal += tiles[i].pI
    }
    var pIAverage = Math.round(pITotal / tiles.length)
    return pIAverage
  }
  getAverageIQ(grid, point, range){
    var tiles = this.getTilesInRange(grid, point, range)
    var iqTotal = 0
    for (var i = 0; i < tiles.length; i++) {
      iqTotal += tiles[i].IQ
    }
    var iqAverage = Math.round(iqTotal / tiles.length)
    return iqAverage
  }
  getCityCenterDistance(point){
    var centerX = Math.floor(this.width / 2);
    var centerY = Math.floor(this.height / 2);
    var xDis, yDis
    if(point.x > centerX){
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
  getTilesInRange(grid, point, range) {
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
  getPoint(x,y){
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
