// if this is not working then calculate time before jump by yourself copy paste the following script in console
// at the end you will get the value average time in console 
// set timeBeforeJump in hack.js to the average time you got 

Runner.prototype.onKeyDown = function (e) {
            // Prevent native page scrolling whilst tapping on mobile.
            if (IS_MOBILE && this.playing) {
                e.preventDefault();
            }

            if (e.target != this.detailsButton) {
                if (!this.crashed && (Runner.keycodes.JUMP[e.keyCode] ||
                    e.type == Runner.events.TOUCHSTART)) {
                    if (!this.playing) {
                        this.loadSounds();
                        this.playing = true;
                        this.update();
                        if (window.errorPageController) {
                            errorPageController.trackEasterEgg();
                        }
                    }
                    //  Play sound effect and jump on starting the game for the first time.
                    if (!this.tRex.jumping && !this.tRex.ducking) {
                        this.playSound(this.soundFx.BUTTON_PRESS);
                        

                        // how to call jump
                        this.tRex.startJump(this.currentSpeed);

                        // callculation
                        if(this.horizon && this.horizon.obstacles.length > 0){
	                        if(!this.n){
	                        	this.n = 0
	                        	this.total_time = 0
	                        }

	                        let diff = this.horizon.obstacles[0].xPos - this.tRex.xPos

	                        

	                        var time = diff/this.currentSpeed
	                        // time_arr.push(time)
	                        this.total_time += time
	                        this.n++

	                        if(time >= 7.5)
	                        	this.tRex.startJump(this.currentSpeed)

	                        console.log(time)
						}
                    }
                }

                if (this.crashed && e.type == Runner.events.TOUCHSTART &&
                    e.currentTarget == this.containerEl) {
                    this.restart();
                }
            }

            if (this.playing && !this.crashed && Runner.keycodes.DUCK[e.keyCode]) {
                e.preventDefault();
                if (this.tRex.jumping) {
                    // Speed drop, activated only when jump key is not pressed.
                    this.tRex.setSpeedDrop();
                } else if (!this.tRex.jumping && !this.tRex.ducking) {
                    // Duck.
                    this.tRex.setDuck(true);
                }
            }
        }

Runner.prototype.gameOver = function () {
        	console.log('average time = '+this.total_time/this.n)

        	// for(let speed in map) {

        	// 	let arr = map[speed]
        	// 	let sum = 0

        	// 	arr.forEach((s) => {sum += s})

        	// 	console.log('for speed = '+speed+', average = '+sum/arr.length)
        	// }

            this.playSound(this.soundFx.HIT);
            vibrate(200);

            this.stop();
            this.crashed = true;
            this.distanceMeter.acheivement = false;

            this.tRex.update(100, Trex.status.CRASHED);

            // Game over panel.
            if (!this.gameOverPanel) {
                this.gameOverPanel = new GameOverPanel(this.canvas,
                    this.spriteDef.TEXT_SPRITE, this.spriteDef.RESTART,
                    this.dimensions);
            } else {
                this.gameOverPanel.draw();
            }

            // Update the high score.
            if (this.distanceRan > this.highestScore) {
                this.highestScore = Math.ceil(this.distanceRan);
                this.distanceMeter.setHighScore(this.highestScore);
            }

            // Reset the time clock.
            this.time = getTimeStamp();
        }