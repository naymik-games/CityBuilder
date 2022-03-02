class Tile {
  constructor(scene, x, y, ind, count, xOffset, tilesize, yOffset) {
    this.x = x
    this.y = y
    this.id = count
    this.direction = null
    this.size = 1
    this.type = 'dirt'
    this.zone = 10
    this.info = terrain[0]
    
    this.xy = {
      x: x,
      y: y
    }
    this.partOf = null
    this.oldIndex = ind
    this.cursheet = 'terrain'
    this.curIndex = ind
    this.hasWater = false
    this.hasRoad = false
    this.landValue = null
    this.hasRail = false
    this.IQ = 0
    this.pI = 0
    
    var img = scene.add.image(xOffset + (x * tilesize + tilesize / 2), yOffset + (y * tilesize + tilesize / 2), 'terrain', ind).setDepth(0)
    scene.add.existing(img);
    this.tile = img
    
  }
}


class Message {
  constructor(mess, category) {
    this.text = mess;
    this.category = category
    this.viewed = false
  }
  remove(id){
    console.log('removed' + id)
  }
}
