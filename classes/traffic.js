class Traffic {
  constructor(scene, width, height) {
    this.width = width;
    this.height = height;
    this.main = scene
  }
  sayHello(){
    return 'hello'
  }
 
  tryDriveTo(grid,point, target) {
   // console.log(point)
		var road = this.findRoad(grid,point);
	//	console.log(road)
		if(!road) {
			return -1;
		}
		
		var route = [];
		
		//Maximum steps to try driving to destination
		var maxDist = 30;
		var lastPos = null;
		var currentPos = road;
		var targetFound = false;
    var found = -1;
		for(var distance = 0; distance < maxDist; distance++) {
			var pos = this.findNextRoad(grid, {x: currentPos.x, y: currentPos.y}, lastPos);
			
			//No road found
			if(pos == null) {
				//Go back if possible
				if(lastPos != null) {
					pos = lastPos;
					lastPos = currentPos;
					currentPos = pos;
					distance += 3;
				}
				else {
					return false;
				}
			}
			//Found road so go there
			else {			
				lastPos = currentPos;
				currentPos = pos;
				
				//every other
			//	if(distance & 1) {
					route.push(pos);
			//	}
				found = this.targetFound(grid, pos, target)
				if(found) {
					targetFound = true;
					break;
				}				
			}
		}
		
		if(!targetFound) {
			return false;
		} else {
		 // console.log('route length ' + route.length + ' startX ' + point.x + ',startY ' + point.y)
		// console.log(route)

		  return route.length
		}
		
		for(var i = 0, len = route.length; i < len; i++) {
		/*	var point = route[i];
			var px = point.x >> 1;
			var py = point.y >> 1;
			var traffic = this._trafficMap[py][px];//this._trafficMap.get(point.x, point.y);
			
			if(!traffic) {
				traffic = 0;
			}

			traffic = min(traffic + 50, 240);
						//opera.postError('Mapping: ' + point.x + ' ' + point.y + ' ' + traffic);
			//this._trafficMap.set(point.x, point.y, traffic);
			this._trafficMap[py][px] = traffic;
			
      */
			
		}
		
		//return true;
	}
  ////////////////////
  //helpers
  ///////////////////
  isRoad(grid, point){
    //console.log(grid[point.y][point.x].zone)
    if(grid[point.y][point.x].zone == 11){
      return true
    }
    return false
  }
  targetFound(grid,pos, target) {
		//offsets for up, down, left, right
		var posX = [-1,1,0,0];
		var posY = [0,0,-1,1];
		var tiles = this.getTilesInRange(grid, pos, 1);
		for(var i = 0; i < tiles.length; i++) {
			//var xx = pos.x + posX[i];
			//var yy = pos.y + posY[i];
			for(var j = 0; j < target.length; j++){
        if(this.validPoint(tiles[i].xy.x, tiles[i].xy.y) && grid[tiles[i].xy.y][tiles[i].xy.x].zone == target[j]) {
          return true;
        }
      }
		}
		
		return false;
	}
  findNextRoad(grid, point, prevPos) {
		//offsets for up, down, left, right for moving
		var posX = [-1,1,0,0];
		var posY = [0,0,-1,1];
		
		if(!prevPos) {
			prevPos = { x: -1, y: -1 };
		}
		
		var directions = [];
		for(var i = 0; i < 4; i++) {
			var xx = point.x + posX[i];
			var yy = point.y + posY[i];
			
			if(!(xx == prevPos.x && yy == prevPos.y) && this.isRoad(grid, {x: xx, y: yy})) {
				directions.push({ x: xx, y: yy });
			}
		}
		
		var options = directions.length;
		if(options == 0) {
			return null;
		}
		
		if(options == 1) {
			return directions[0];
		}
		
		return directions[Phaser.Math.Between(0, directions.length -1)];
	}
  findRoad(grid, point){
    var tiles = this.getTilesInRange(grid, point, 3)
    //console.log(tiles[2].xy)
    for(var i = 0; i < tiles.length; i++){
      if(tiles[i].zone == 11){
        return tiles[i].xy
      }
    }
  }
  getTilesInRange(grid,point, range) {
    var tilesInRange = [];
    for (var y = point.y - range; y <= point.y + range; y++) {
      for (var x = point.x - range; x <= point.x + range; x++) {
        if (this.validPoint(x, y)) {
         // console.log(JSON.stringify(this.main.grid[y][x].xy))
          tilesInRange.push(grid[y][x])
        }
  
      }
    }
    return tilesInRange
  }
  validPoint(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
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
