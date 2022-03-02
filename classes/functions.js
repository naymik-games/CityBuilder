function calculateIncome(){
  var income = Math.floor((censusHistory.workforce * gameStats.resEarning) * gameStats.resTax)
  //console.log('inc ' + income)
  income += Math.floor((censusHistory.comPopulation * gameStats.comEarning) * gameStats.comTax)
  income += Math.floor((censusHistory.indPopulation * gameStats.indEarning) * gameStats.indTax)
  //console.log('wf ' + workforceAvailable)
  return income
}

function calculateExpenditures(){
  
 var totalZonedTiles = gameStats.lR + gameStats.mR + gameStats.dR + gameStats.lC + gameStats.mC + gameStats.dC + gameStats.lI + gameStats.hI;
 
var expenditures = gameStats.rT * gameStats.roadMaintenance
    //general maintenance
  expenditures += totalZonedTiles * gameStats.zoneMaintenance
    //fire maintenance
    expenditures += gameStats.fireCapacity *  gameStats.fireMaintenance
    //police maintenance
   expenditures += gameStats.policeCapacity * gameStats.policeMaintenance
    //water maintenance
   expenditures += gameStats.waterTowers * gameStats.waterMaintenance
    //power maintenance
    var powerDraw = gameStats.lR * 5 + gameStats.mR * 15 + gameStats.dR * 30 + gameStats.lC * 5 + gameStats.mC * 20 + gameStats.dC * 40 + gameStats.lI * 10 + gameStats.hI * 40;
  var powerPercent = powerDraw / gameStats.powerCapacity
    expenditures += (gameStats.powerCapacity * gameStats.powerMaintenance) * powerPercent
    //health Maintenance
   expenditures += gameStats.healthCapacity * gameStats.healthMaintenance
    //education maintenance
    expenditures += gameStats.educationCapacity * gameStats.educationMaintenance
    //civic maintenance
    expenditures += gameStats.govBuildings * gameStats.governmentMaintenance
    
    return expenditures
  // return 4328
}
function getWaterCapacity(){
  return gameStats.waterTowers * (gameStats.waterRange *2 + 1)
}
function calculateDesirabilty(){
  
}
function clamp(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;

  return value;
};
