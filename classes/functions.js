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
    expenditures += gameStats.powerCapacity * gameStats.powerMaintenance
    //health Maintenance
   expenditures += gameStats.healthCapacity * gameStats.healthMaintenance
    //education maintenance
    expenditures += gameStats.educationCapacity * gameStats.educationMaintenance
    //civic maintenance
    expenditures += gameStats.govBuildings * gameStats.governmentMaintenance
    
    return expenditures
  // return 4328
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
