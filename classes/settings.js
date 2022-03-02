let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
//modes
const GM_ROAD = 0
const GM_PAN = 1
const GM_PLACE = 2
const GM_MENU = 3
const GM_SELECT = 4
const GM_ERASE = 5
const GM_INFO = 6
const GM_RAIL = 7
let gameMode = GM_MENU;

let gameStats;
let defaultStats = {
  day: 1,
  funds: 1000,
  resTax: .01,
  comTax: .01,
  indTax: .01,
  resEarning: 1000,
  comEarning: 1000,
  indEarning: 1000,
  birthRate: 0.02,
  labourBaseMax: 1.3,
  internalMarketDenom: 3.7,
  projectedIndPopMin: 5.0,
  population: 1,
  zoneMaintenance: 3,
  roadCost: 5,
  roadMaintenance: 2,
  railCost: 10,
  rrMaintenance: 2,
  inflation: 1.5,
  roadRange: 3,
  depotRange: 8,
  waterRange: 9,
  waterTowers: 0,
  waterMaintenance: 500,
  powerCapacity: 0,
  powerMaintenance: .5,
  policeCapacity: 0,
  policeMaintenance: 3,
  policeRange: 7,
  fireRange: 7,
  fireCapacity: 0,
  fireMaintenance: 2,
  healthCapacity: 0,
  healthMaintenance: 3,
  healthRange: 10,
  educationCapacity: 0,
  educationMaintenance: 3,
  educationRange:3,
  govBuildings: 0,
  governmentMaintenance: 3,
  resRatioDefault: 1.3,
  resRatioMax: 2,
  comRatioMax: 2,
  indRatioMax: 2,
  resValve: 0,
  comValve: 0,
  indValve: 0,
  rT: 0,
  rrT: 0,
  lR: 0,
  mR: 0,
  dR: 0,
  lC: 0,
  mC: 0,
  dC: 0,
  lI: 0,
  hI: 0,
  bQ: [],
  cH: {},
  messages: []
  
}
let censusHistory = {}
let gameSettings;
let gameMap;
let mapConfig = {
  width:30,
  height: 30,
  eastCost: false,
  westCost: false,
  northCost: false,
  southCost: false,
  eWRiver: false,
  nSRiver: false,
  numLakes: 0


}
var defaultSettings = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1,-1,-1,-1,-1,-1,-1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}
/*
//zones:
0 low residential
1 medium residential
2 dense residential
3 low commercial
4 medium commercial
5 dense commercial
6 low industrial
7 heavy industrial
8 --
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
22 passenger depot
23 ind depot
24 airport

*/

let terrain = [
  {
    name: 'grass',
    id: 0,
    sheet: 'terrain',
    zone: 10,
    size: 1
    
  }
]
let roads = [
  {
    name: 'road',
    id: 0,
    sheet: 'roads',
    size: 1
  }
]
let transportation = 
[
  {
    name: 'road',
    id: 0,
    index: 6,
    sheet: 'roads',
    size: 1,
    cost: 50
    
  },
  {
    name: 'rr',
    id: 2,
    index: 6,
    sheet: 'rail',
    size: 1,
    cost: 100,
  },
  {
    name: 'h crossing',
    id: 3,
    index: 0,
    sheet: 'crossing',
    cost: 100,
    size: 1
  },
  {
    name: 'v crossing',
    id: 4,
    index: 1,
    sheet: 'crossing',
    cost: 100,
    size: 1
  },
  {
    name: 'h Passenger Depot',
    id: 5,
    index: 0,
    sheet: 'depot',
    cost: 100,
    size: 1,
    zone: 22
  },
  {
    name: 'v Passenger Depot',
    id: 6,
    index: 1,
    sheet: 'depot',
    cost: 100,
    size: 1,
    zone: 22
  },
  {
    name: 'h Industry Depot',
    id: 7,
    index: 2,
    sheet: 'depot',
    cost: 100,
    size: 1,
    zone: 23
  },
  {
    name: 'v Industry Depot',
    id: 8,
    index: 3,
    sheet: 'depot',
    cost: 100,
    size: 1,
    zone: 23
  }
]
let zones = 
[
  {
    name: 'Light Residential',
    id: 0,
    sheet: 'zones',
    zone: 0,
    index: 0,
    cost: 20,
    zoneArray: 'residential',
    zoneMin: 0,
    zoneMax: 5
  },
  {
    name: 'Medium Residential',
    id: 1,
    sheet: 'zones',
    zone: 1,
    index: 1,
    cost: 75,
    zoneArray: 'residential',
    zoneMin: 6,
    zoneMax: 12
  },
  {
    name: 'Dense Residential',
    id: 2,
    sheet: 'zones',
    zone: 2,
    index: 2,
    cost: 200,
    zoneArray: 'residential',
    zoneMin: 13,
    zoneMax: 19
  },
  {
    name: 'Light Commercial',
    id: 3,
    sheet: 'zones',
    index: 3,
    zone: 3,
    cost: 20,
    zoneArray: 'commercial',
    zoneMin: 0,
    zoneMax: 2
  },
  {
    name: 'Medium Commercial',
    id: 4,
    sheet: 'zones',
    index: 4,
    zone: 4,
    cost: 80,
    zoneArray: 'commercial',
    zoneMin: 10,
    zoneMax: 12
  },
  {
    name: 'Dense Commercial',
    id: 5,
    sheet: 'zones',
    index: 5,
    zone: 5,
    cost: 500,
    zoneArray: 'commercial',
    zoneMin: 20,
    zoneMax: 22
  },
  {
    name: 'Light Industrial',
    id: 6,
    sheet: 'zones',
    index: 6,
    zone: 6,
    cost: 10,
    zoneArray: 'industrial',
    zoneMin: 0,
    zoneMax: 7
  },
  {
    name: 'Heavy Industrial',
    id: 7,
    sheet: 'zones',
    index: 7,
    zone: 7,
    cost: 150,
    zoneArray: 'industrial',
    zoneMin: 8,
    zoneMax: 14
  }
]

let utilities = 
[
  {
    name: 'Nuclear Power Plant',
    id: 0,
    sheet: 'all_2',
    index: 6,
    cost: 100,
    zone: 12,
    capacity: 5000,
    size: 2,
    pollution: 20,
  },
  {
    name: 'Coal Power Plant',
    id: 1,
    sheet: 'utilities',
    index: 1,
    zone: 12,
    cost: 500,
    capacity: 2000,
    size: 1,
    pollution: 40
  },
  {
    name: 'Wind Turbine',
    id: 2,
    sheet: 'utilities',
    index: 2,
    zone: 12,
    cost: 50,
    capacity: 50,
    size: 1,
    pollution: 0,
  },
  {
    name: 'Wind Farm',
    id: 3,
    sheet: 'all_2',
    index: 5,
    zone: 12,
    cost: 2000,
    capacity: 1500,
    size: 2,
    pollution: 0,
  },
  {
    name: 'Pumping Station',
    id: 4,
    sheet: 'utilities',
    index: 3,
    zone: 16,
    cost: 100,
    size: 1
  },
  {
    name: 'Water Tower',
    id: 5,
    sheet: 'utilities',
    index: 4,
    zone: 16,
    cost: 100,
    size: 1
  }
]
let civic = 
[
  {
    name: 'Park',
    id: 0,
    sheet: 'civic',
    index: 0,
    zone: 13,
    cost: 50,
    size: 1,
    pollution: -10,
  },
  {
    name: 'Picnic Park',
    id: 1,
    sheet: 'civic',
    index: 1,
    zone: 13,
    cost: 100,
    size: 1,
    pollution: -5,
  },
  
  
  
  
  {
    name: 'City Hall',
    id: 2,
    sheet: 'civic',
    index: 8,
    zone: 20,
    cost: 100,
    size: 1
  },
  {
    name: 'Sports Park',
    id: 3,
    sheet: 'civic',
    index: 9,
    zone: 20,
    cost: 100,
    size: 1,
    pollution: -5
  },
  
  {
    name: 'Large Park',////////////////////
    id: 4,
    sheet: 'all_2',
    index: 7,
    zone: 13,
    cost: 300,
    size: 2,
    pollution: -25
  },
  {
    name: 'Garbage/Recycling',
    id: 5,
    sheet: 'civic',
    index: 12,
    zone: 20,
    cost: 150,
    size: 1
  },
  {
    name: 'Large Plaza',/////////////////////////
    id: 6,
    sheet: 'all_2',
    index: 2,
    zone: 13,
    cost: 300,
    size: 2,
    pollution: 0
  },
  {
    name: 'Small Plaza',
    id: 7,
    sheet: 'civic',
    index: 14,
    zone: 13,
    cost: 200,
    size: 1,
    pollution: 0
  },
  
];
let education = [
  {
    name: 'Elementary School',
    id: 0,
    sheet: 'civic',
    index: 7,
    zone: 19,
    cost: 90,
    capacity: 125,
    size: 1,
    range: 3,
    addIQ: 5
  },
  {
    name: 'High School',
    id: 1,
    sheet: 'civic',
    index: 6,
    zone: 19,
    cost: 100,
    capacity: 421,
    size: 1,
    range: 4,
    addIQ: 10
  },
  {
    name: 'Private School',
    id: 2,
    sheet: 'civic',
    index: 5,
    zone: 19,
    cost: 500,
    capacity: 40,
    size: 1,
    range: 2,
    addIQ: 15
  },
  {
    name: 'Community College',
    id: 3,
    sheet: 'civic',
    index: 10,
    zone: 19,
    cost: 500,
    size: 1,
    range: 5,
    addIQ: 20
  },
  {
    name: 'University',
    id: 4,
    sheet: 'all_3',
    index: 5,
    zone: 19,
    cost: 10000,
    size: 3,
    range: 15,
    addIQ: 30
  }
  
]
let safety = [
  {
    name: 'Police Station',
    id: 0,
    sheet: 'civic',
    index: 2,
    zone: 21,
    cost: 100,
    capacity: 100,
    range: 5,
    size: 1
  },
  { 
    name: 'Fire Station',
    id: 1,
    sheet: 'civic',
    index: 3,
    zone: 17,
    cost: 100,
    capacity: 100,
    size: 1
  },
  {
    name: 'Hospital',
    id: 2,
    sheet: 'civic',
    index: 4,
    zone: 18,
    cost: 100,
    capacity: 100,
    size: 1
  },
  {
    name: 'Prison',
    id: 3,
    sheet: 'all_3',
    index: 3,
    zone: 21,
    cost: 1000,
    size: 3,
    capacity: 0
  }
]
let special = 
[
  {
    name: 'Church',
    id: 0,
    sheet: 'special',
    index: 0,
    zone: 14,
    cost: 100,
    size: 1
  },
  {
    name: 'Small Stadium',
    id: 1,
    sheet: 'special',
    index: 1,
    zone: 14,
    cost: 500,
    size: 1
  },
  {
    name: 'Art Museum',
    id: 2,
    sheet: 'special',
    index: 2,
    zone: 19,
    cost: 1000,
    size: 1,
    capacity: 1,
    addIQ: 5
  },
  {
    name: 'Zoo',
    id: 3,
    sheet: 'all_2',
    index: 8,
    zone: 14,
    cost: 100,
    size: 2
  },
  {
    name: 'Library',
    id: 4,
    sheet: 'special',
    index: 4,
    zone: 19,
    cost: 100,
    size: 1,
    capacity: 1,
    addIQ: 7
  },
  {
    name: 'Bank',
    id: 5,
    sheet: 'special',
    index: 5,
    zone: 14,
    cost: 100,
    size: 1
  },
  {
    name: 'Science Museum',
    id: 6,
    sheet: 'special',
    index: 6,
    zone: 19,
    cost: 100,
    size: 1,
    capacity: 1,
    addIQ: 8
  },
  {
    name: 'Airport Large',
    id: 7,
    sheet: 'all_3',
    index: 0,
    zone: 14,
    cost: 10000,
    size: 3
  },
  {
    name: 'Stadium Large',
    id: 8,
    sheet: 'all_3',
    index: 1,
    zone: 14,
    cost: 100,
    size: 3
  },
  {
    name: 'Building Large',
    id: 9,
    sheet: 'all_3',
    index: 2,
    zone: 14,
    cost: 100,
    size: 3
  },
  {
    name: 'Seaport',
    id: 10,
    sheet: 'all_2',
    index: 9,
    zone: 14,
    cost: 500,
    size: 2
  }, 
  {
    name: 'Regional Airport',
    id: 11,
    sheet: 'all_2',
    index: 10,
    zone: 14,
    cost: 1000,
    size: 2
  }
]
//console.log('special' + special.length)

let residential = 
[
  {
    name: 'light 1',
    id: 0,
    sheet: 'residential',
    index: 0,
    cost: 100,
    zone: 0,
    size: 1
  },
  {
    name: 'light 2',
    id: 1,
    sheet: 'residential',
    index: 1,
    cost: 100,
    zone: 0,
    size: 1
  },
  {
    name: 'light 3',
    id: 20,
    sheet: 'residential',
    index: 2,
    cost: 100,
    zone: 0,
    size: 1
  },
  {
    name: 'light 4',
    id: 3,
    sheet: 'residential',
    index: 3,
    cost: 100,
    zone: 0,
    size: 1
  },
  {
    name: 'light 5',
    id: 4,
    sheet: 'residential',
    index: 4,
    cost: 100,
    zone: 0,
    size: 1
  },
  {
    name: 'light 6',
    id: 5,
    sheet: 'residential',
    index: 5,
    cost: 100,
    zone: 0,
    size: 1
  },
  {
    name: 'medium 1',
    id: 6,
    sheet: 'residential',
    index: 6,
    cost: 100,
    zone: 1,
    size: 1
  },
  {
    name: 'medium 2',
    id: 7,
    sheet: 'residential',
    index: 7,
    cost: 100,
    zone: 1,
    size: 1
  },
  {
    name: 'medium 3',
    id: 8,
    sheet: 'residential',
    index: 8,
    cost: 100,
    zone: 1,
    size: 1
  },
  {
    name: 'medium 4',
    id: 9,
    sheet: 'residential',
    index: 9,
    cost: 100,
    zone: 1,
    size: 1
  },
  {
    name: 'medium 5',
    id: 10,
    sheet: 'residential',
    index: 10,
    cost: 100,
    zone: 1,
    size: 1
  },
   {
    name: 'medium 6',
    id: 11,
    sheet: 'residential',
    index: 11,
    cost: 100,
    zone: 1,
    size: 1
  },
  {
    name: 'dense 1',
    id: 12,
    sheet: 'residential',
    index: 12,
    cost: 100,
    zone: 2,
    size: 1
  },
  {
    name: 'dense 2',
    id: 13,
    sheet: 'residential',
    index: 13,
    cost: 100,
    zone: 2,
    size: 1
  },
  {
    name: 'dense 3',
    id: 14,
    sheet: 'residential',
    index: 14,
    cost: 100,
    zone: 2,
    size: 1
  },
  {
    name: 'dense 4',
    id: 15,
    sheet: 'residential',
    index: 15,
    cost: 100,
    zone: 2,
    size: 1
  },
  {
    name: 'dense 5',
    id: 16,
    sheet: 'residential',
    index: 16,
    cost: 100,
    zone: 2,
    size: 1
  },
  {
    name: 'dense 6',
    id: 17,
    sheet: 'residential',
    index: 17,
    cost: 100,
    zone: 2,
    size: 1
  },
   {
    name: 'dense 7',
    id: 18,
    sheet: 'residential',
    index: 18,
    cost: 100,
    zone: 2,
    size: 1
  },
   {
    name: 'dense 8',
    id: 19,
    sheet: 'residential',
    index: 19,
    cost: 100,
    zone: 2,
    size: 1
  }
]

let commercial = 
[
  {
    name: 'light 1',
    id: 0,
    sheet: 'commercial',
    index: 0,
    cost: 100,
    zone: 3,
    size: 1
  },
  {
    name: 'light 2',
    id: 1,
    sheet: 'commercial',
    index: 1,
    cost: 100,
    zone: 3,
    size: 1
  },
  {
    name: 'light 3',
    id: 2,
    sheet: 'commercial',
    index: 2,
    cost: 100,
    zone: 3,
    size: 1
  },
  {
    name: 'light 4',
    id: 3,
    sheet: 'commercial',
    index: 3,
    cost: 100,
    zone: 3,
    size: 1
  },
  {
    name: 'light 5',
    id: 4,
    sheet: 'commercial',
    index: 4,
    cost: 100,
    zone: 3,
    size: 1
  },
  {
    name: 'light 6',
    id: 5,
    sheet: 'commercial',
    index: 5,
    cost: 100,
    zone: 3,
    size: 1
  },
  {
    name: 'medium 1',
    id: 6,
    sheet: 'commercial',
    index: 6,
    cost: 100,
    zone: 4,
    size: 1
  },
  {
    name: 'medium 2',
    id: 7,
    sheet: 'commercial',
    index: 7,
    cost: 100,
    zone: 4,
    size: 1
  },
  {
    name: 'medium 3',
    id: 8,
    sheet: 'commercial',
    index: 8,
    cost: 100,
    zone: 4,
    size: 1
  },
  {
    name: 'medium 4',
    id: 9,
    sheet: 'commercial',
    index: 9,
    cost: 100,
    zone: 4,
    size: 1
  },
  {
    name: 'medium 5',
    id: 10,
    sheet: 'commercial',
    index: 10,
    cost: 100,
    zone: 4,
    size: 1
  },
  {
    name: 'medium 6',
    id: 11,
    sheet: 'commercial',
    index: 11,
    cost: 100,
    zone: 4,
    size: 1
  },
  {
    name: 'Dense 1',
    id: 12,
    sheet: 'commercial',
    index: 12,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 2',
    id: 13,
    sheet: 'commercial',
    index: 13,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 3',
    id: 14,
    sheet: 'commercial',
    index: 14,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 4',
    id: 15,
    sheet: 'commercial',
    index: 15,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 5',
    id: 16,
    sheet: 'commercial',
    index: 16,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 6',
    id: 17,
    sheet: 'commercial',
    index: 17,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 7',
    id: 18,
    sheet: 'commercial',
    index: 18,
    cost: 100,
    zone: 5,
    size: 1
  },
  {
    name: 'Dense 8',
    id: 19,
    sheet: 'commercial',
    index: 19,
    cost: 100,
    zone: 5,
    size: 1
  }
];

let industrial = 
[
  {
    name: 'light 1',
    id: 0,
    sheet: 'industrial',
    index: 0,
    cost: 100,
    zone: 6,
    size: 1
    
  },
  {
    name: 'Light 2',
    id: 1,
    sheet: 'industrial',
    index: 1,
    cost: 100,
    zone: 6,
    size: 1
    
  },
  {
    name: 'Light 3',
    id: 2,
    sheet: 'industrial',
    index: 2,
    cost: 100,
    zone: 6,
    size: 1
    
  },
  {
    name: 'Light 4',
    id: 3,
    sheet: 'industrial',
    index: 3,
    cost: 100,
    zone: 6,
    size: 1
    
  },
  {
    name: 'Light 5',
    id: 4,
    sheet: 'industrial',
    index: 4,
    cost: 100,
    zone: 6,
    size: 1
    
  },
  {
    name: 'light 6',
    id: 5,
    sheet: 'industrial',
    index: 5,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Light 7',
    id: 6,
    sheet: 'industrial',
    index: 6,
    cost: 100,
    zone: 6,
    size: 1
    
  },
  {
    name: 'Heavy 1',
    id: 7,
    sheet: 'industrial',
    index: 7,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 2',
    id: 8,
    sheet: 'industrial',
    index: 8,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 3',
    id: 9,
    sheet: 'industrial',
    index: 9,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 4',
    id: 10,
    sheet: 'industrial',
    index: 10,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 5',
    id: 11,
    sheet: 'industrial',
    index: 11,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 6',
    id: 12,
    sheet: 'industrial',
    index: 12,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 7',
    id: 13,
    sheet: 'industrial',
    index: 13,
    cost: 100,
    zone: 7,
    size: 1
    
  },
  {
    name: 'Heavy 8',
    id: 14,
    sheet: 'industrial',
    index: 14,
    cost: 100,
    zone: 7,
    size: 1
    
  }
]
