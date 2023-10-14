class GenerateMap{
	constructor(){
		this.div = {left:0, top:700*Math.random(), width:0, height:0, goingUp:false}
		this.mapDone = false
		this.worldMapArray = []
		this.player = document.getElementById('player')
		this.carStartTop
	}

	carPlacement(){   	//left right top bottom
		let top = this.worldMapArray[0][2] + (this.worldMapArray[0][3] - this.worldMapArray[0][2])/2 - 25
		player.style.top = top;
		player.style.left = 0;
		this.carStartTop = top
	}

	restart() {
		let roads = document.getElementsByClassName('road')
		for (let i=roads.length - 1; i >= 0; i--){
    		roads[i].remove()
		}
		this.mapDone = false;
		this.worldMapArray = []
		this.div = {left:0, top:700*Math.random(), width:0, height:0, goingUp:false}
		this.generateMap()

	}

		generateHorizontal(){
		let x = this.div //previous roadBlock
		let left = x.left + x.width - 50
		let width = 100 + Math.random() * 300
		let top, height
		if (x.goingUp) {
			top = x.top
			height = 88 + 250 * Math.random()

		}else {
			top = (x.top + x.height - 88) - 150 * Math.random()
			height = x.top + x.height - top
		}
		this.div = {left:left, top:top, width:width, height:height}
		return this.div
	}

	generateVertical(prev_L, prev_T, prev_W, prev_H){
		let x = this.div //previous roadBlock
		let goingUp = x.top + x.height / 2 > 400

		let left = x.left + x.width - 50
		let width = 80 + Math.random() * 120
		let top, height
		console.log(goingUp)

		if (goingUp){
			top =  (x.top + x.height - 300) * Math.random()
			height = x.top + x.height - top
		} else {
			console.log('going down')
			top = x.top
			height = 300 + (500 - x.top) * Math.random() 
		}			
		this.div = {left:left, top:top, width:width, height:height, goingUp:goingUp}
		return this.div

	}

	generateMap(){
		let world = document.getElementById('world')

		while (!this.mapDone){
			let boxHor = this.generateHorizontal()
			let boxVer = this.generateVertical()

			let divHor = this.makeDiv(boxHor.top, boxHor.left, boxHor.width, boxHor.height)
			let divVer = this.makeDiv(boxVer.top, boxVer.left, boxVer.width, boxVer.height)

			world.prepend(divHor)
			world.prepend(divVer)
			
			console.log(divHor)
			//left right top bottom
			this.worldMapArray.push([boxHor.left, boxHor.left + boxHor.width, boxHor.top, boxHor.top + boxHor.height])
			this.worldMapArray.push([boxVer.left, boxVer.left + boxVer.width, boxVer.top, boxVer.top + boxVer.height])

			if (this.div.left + this.div.width > 1270) this.mapDone = true
			console.log(this.div.right)
		}
		this.carPlacement()
}

	makeDiv(top, left, width, height){
		let el = document.createElement('div')
		el.className = 'road'
		el.style.cssText = `left: ${left}px;top: ${top}px;
							width: ${width}px;height: ${height}px;`
		return el
	}
}