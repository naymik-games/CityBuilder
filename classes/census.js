class Census {
  constructor(scene, width, height) {
    this.width = width;
    this.height = height;
   this.census = {
				Road: 0,
				Residential: 0,
				Commercial: 0,
				Industrial: 0,
				CoalPower: 0,
				NuclearPower: 0,
				PoliceStation: 0,
				FireStation: 0,
				Fire: 0,
				resPopulation: 0,
				comPopulation: 0,
				indPopulation: 0,
				unpoweredZones: 0,
				poweredZones: 0,
        landValueAvg: 0,
        iqAvg: 0
			}
    
  }
  doCensus(grid){
    //update these values.
    this.census = {
				Road: 0,
				Residential: 0,
				Commercial: 0,
				Industrial: 0,
				CoalPower: 0,
				NuclearPower: 0,
				PoliceStation: 0,
				FireStation: 0,
				Fire: 0,
				resPopulation: (gameStats.lR * 8 + gameStats.mR * 40 + gameStats.dR * 100) * 1,
				comPopulation: gameStats.lC * 4 + gameStats.mC * 15 + gameStats.dC * 60,
				indPopulation: gameStats.lI * 4 + gameStats.hI * 25,
				unpoweredZones: 0,
				poweredZones: 0,
        landValueAvg: this.getLandValueAvg(grid),
        iqAvg: this.getIQAvg(grid)
			}
    censusHistory = this.census
    gameStats.cH = censusHistory;
    gameStats.population = censusHistory.resPopulation
    console.log('avg iq ' + censusHistory.iqAvg)
    

  }
  getLandValueAvg(grid){
    var count = 0
    var totalLV = 0
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if(grid[y][x].zone == 0 || grid[y][x].zone == 1 || grid[y][x].zone == 2 || grid[y][x].zone == 3 || grid[y][x].zone == 4 || grid[y][x].zone == 5 || grid[y][x].zone == 6 || grid[y][x].zone == 7){
          totalLV += grid[y][x].landValue
          count++
        }
      }
    }
    return Math.floor(totalLV / count)
  }
  getIQAvg(grid) {
    var count = 0
    var totalIQ = 0
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (grid[y][x].zone == 0 || grid[y][x].zone == 1 || grid[y][x].zone == 2 || grid[y][x].zone == 3 || grid[y][x].zone == 4 || grid[y][x].zone == 5 || grid[y][x].zone == 6 || grid[y][x].zone == 7) {
          totalIQ += grid[y][x].IQ
          count++
        }
      }
    }
    return Math.floor(totalIQ / count)
  }
}
