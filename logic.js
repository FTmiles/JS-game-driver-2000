class game{
	constructor(world){
		this.player = document.getElementById('player')
		this.textbox = document.getElementById('text-box')
		this.carLe = 0
		this.carTo = map.carStartTop
		
		//left right top bottom
		//this.roadsArr = [[0,100,0,150],[50,300,0,700],[250,700,500,700],[650,850,200,700],[800,1300,200,400]]
		this.roadsArr = world

		//driving states
		this.isDriving = true;
		this.direction = 'right'
		this.dirBefore = 'right'
		this.curRotation = 0;
		this.levelCount = 1;
	}

	get carRi(){
		return this.carLe + 50
	}
	get carBo(){
		return this.carTo + 50
	}
	get carImg(){
		return this.player.querySelector('img');
	}



	set dirSet(dir) {
		console.log(dir)
		this.dirBefore = this.direction
		this.direction = dir
		if (this.isDriving) this.changeDir()
	}

	start(){
		//player.style.top = this.roadsArr[0][2] + (this.roadsArr[0][3] - this.roadsArr[0][2]) - 25
		this.showTextbox(`Get Ready!<br><span style='font-size:20px;color:blue;font-weight:bold'> Level ${this.levelCount}</span><br>3`, 'orange')
		sf.countdown()
		setTimeout(()=>{
			this.showTextbox(`Get Ready!<br><span style='font-size:20px;color:blue;font-weight:bold'> Level ${this.levelCount}</span><br>2`, 'orange')
			sf.countdown()
		},800)
		setTimeout(()=>{
			this.showTextbox(`Get Ready!<br><span style='font-size:20px;color:blue;font-weight:bold'> Level ${this.levelCount}</span><br>1`, 'orange')
			sf.countdown()
			sf.carnageBegin()
		},1600)
		setTimeout(()=>{
			this.showTextbox('<br>GO!', '#2a9e26')
			sf.countdownGo()
		},2400)
		setTimeout(()=>{
			this.hideTextbox();
			this.drive()
			sf.enginePlay()
			},3200)	

		sf.radioPlay()


	}

	drive(){
		switch (this.direction){
		case 'right':
			this.driveRight();
			break;
		case 'down':
			this.driveDown()
			break;
		case 'left':
			this.driveLeft()
			break;
		case 'up':
			this.driveUp()
			break;						
		}
		
		this.hideTextbox()	
		let checkWon = this.hasWon()
		if (!checkWon) this.hasCrashed()
	
		setTimeout(()=>{if (this.isDriving) this.drive()}, 100);
	}

	hasWon(){
		let won = this.carLe > 1200;
		if(won){
			this.levelCount++
			this.isDriving = false
			console.log('viccc')
			this.showTextbox("GG<br> you won!<br><span style='font-size:25px;color:black'>press any key to continue</span>", 'green')
			sf.engineStop()
			sf.victory()

			document.addEventListener("keydown", ()=>{
				this.nextStage()
			}, { once: true });
			return true
		}
	}

	nextStage(){
		map.restart()
		this.carLe = 0
		this.carTo = map.carStartTop
		this.roadsArr = map.worldMapArray
		this.isDriving = true;
		this.direction = 'right'
		this.dirBefore = 'right'
		this.curRotation = 0;
		this.start()

	}

	showTextbox(text, bgColor){
		this.textbox.style.display = 'block'
		this.textbox.innerHTML = text
		this.textbox.style.background = bgColor
	}
	hideTextbox(){
		this.textbox.style.display = 'none'
	}

	hasCrashed(){
		let crashed = !this.isOverlaping()
		if (crashed){
		this.showTextbox('Game over<br>Wasted!', 'black')
		this.isDriving = false;
		this.explosion()
		sf.crash()
		sf.engineStop()
		}
	}

	explosion(){
		let pic = document.createElement('img')
		pic.src= 'media/ex.gif'
		pic.style.cssText = `width: 200%;height:200%;
							 left:-50%;top:-50%;
							 position: absolute;
							 bottom: 50%`
		this.player.appendChild(pic)
		
		setTimeout(()=>{
			pic.remove()
		},1000)

	}

	isOverlaping(){
		for(let road of this.roadsArr){
			let overlap = this.carLe >= road[0] && this.carRi <= road[1] && this.carTo >= road[2] && this.carBo <= road[3]
			if (overlap) return true
		}
		return false
	}

	driveRight(){
		this.player.style.left = `${this.carLe+=15}px`
	}
		driveDown(){
		this.player.style.top = `${this.carTo+=15}px`
	}
	driveLeft(){
		this.player.style.left = `${this.carLe-=15}px`
	}
	driveUp(){
		this.player.style.top = `${this.carTo-=15}px`
	}	

	changeDir(){
			switch(this.direction)	{
				case 'up':
						if (this.dirBefore === 'down') this.curRotation+=180
						else if (this.dirBefore === 'right') this.curRotation-=90
						else if (this.dirBefore === 'left') this.curRotation+=90
					break;
				case 'down':
						if (this.dirBefore === 'up') this.curRotation+=180
						else if (this.dirBefore === 'right') this.curRotation+=90
						else if (this.dirBefore === 'left') this.curRotation-=90
					break;
				case 'left':
						if (this.dirBefore === 'up') this.curRotation-=90
						else if (this.dirBefore === 'down') this.curRotation+=90
						else if (this.dirBefore === 'right') this.curRotation+=180
					break;

				case 'right':
						if (this.dirBefore === 'up') this.curRotation+=90
						else if (this.dirBefore === 'down') this.curRotation-=90
						else if (this.dirBefore === 'left') this.curRotation+=180
					break;

			}
			
		this.player.style.transform = `rotate(${this.curRotation}deg)`
	}

}