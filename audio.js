class SF{
	constructor(){
		this.sfxEngine = document.getElementById('sfx-engine')
		this.sfx2 = document.getElementById('sfx2')
		this.sfx3 = document.getElementById('sfx3')
		this.radio = document.getElementById('radio')
	}

	enginePlay(){
		this.sfxEngine.src='media/audio/engine.ogg'
		this.sfxEngine.play()
	}
	engineStop(){
		this.sfxEngine.pause()
	}

	radioPlay(){
		this.radio.volume = 0.4
		let random = Math.ceil( (Math.random() * 4) )
		console.log(random)
		this.radio.src = `media/radio/${random}.mp3`
		this.radio.play()
		this.radio.addEventListener('ended', ()=> {
    		
    		this.radioPlay()
		}, false);
	}

	carnageBegin(){
		this.sfx2.src='media/audio/carnage begin.ogg'
		this.sfx2.play()
	}

	crash(){
		this.sfx2.src='media/audio/explosion.mp3'
		this.sfx2.play()
	}

	victory(){
		let random = Math.ceil( (Math.random() * 3) )
		this.sfx2.src = `media/audio-victory/${random}.mp3`
		this.sfx2.play()
	}
	countdown(){
		this.sfx3.src = 'media/audio/countdown1.mp3'
		this.sfx3.play()
	}

	countdownGo(){
		this.sfx3.src = 'media/audio/countdown2.mp3'
		this.sfx3.play()
	}
}