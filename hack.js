const hacks = () =>{
	let fxn = String(Runner.prototype.update)
	let index = 0
	let timeBeforeJump = 10

	let hack = ` // hack start here

                let obstacle = null;
                let tRex = this.tRex;
                if(this.horizon && this.horizon.obstacles.length > 0){
                    obstacle = this.horizon.obstacles[0];                   
                }
                    
                if(tRex && obstacle) {
                    let prevObstacle = null

                    if(this.prevObstacle === undefined){
                        this.defaultPos = this.tRex.yPos
                        this.prevObstacle = null
                        this.jumpingFromCollision = false
                    }
                    else 
                        prevObstacle = this.prevObstacle


                    if(this.horizon.obstacles.length > 0){
                        obstacle = this.horizon.obstacles[0];                   
                    }
                    
                    if(tRex && obstacle && !checkForCollision(obstacle, tRex) && checkForCollision(obstacle, {xPos: tRex.xPos, yPos: this.defaultPos, config: tRex.config}))
                        this.jumpingFromCollision = true             

                    if(prevObstacle !== null && this.jumpingFromCollision && !checkForCollision(obstacle, {xPos: tRex.xPos, yPos: this.defaultPos, config: tRex.config})) {
                        this.prevObstacle = null;
                        this.tRex.setSpeedDrop();
                        this.jumpingFromCollision = false
                    }
                    else {
                        if(tRex.ducking){
                            this.tRex.setDuck(false);                       
                        }
                    }

                    if(this.horizon.obstacles.length > 0 && checkForCollision(this.horizon.obstacles[0], {xPos: this.horizon.obstacles[0].xPos, yPos: this.tRex.yPos, config: {WIDTH: this.tRex.config.WIDTH, HEIGHT: this.tRex.config.HEIGHT}})) {

                        this.prevObstacle = obstacle;
                        let diff = obstacle.xPos  - this.tRex.xPos;
                        var time = diff/this.currentSpeed;
                        
                        if(time <= ${timeBeforeJump}){
                            this.tRex.startJump(this.currentSpeed)
                        }
                    }
                    
                }
            	    // hack end here
                `

	
	index = fxn.indexOf(')')

// 	fxn = fxn.substr(0, index) + ' update ' + fxn.substr(index)
	fxn =   'function update()' + fxn.substr(index+1)
	
	index = fxn.indexOf('// Check for collisions.')
	console.log(index)

	fxn = fxn.substr(0, index) + hack + fxn.substr(index)
	
	eval(fxn)
	Runner.prototype.update = update
}

hacks()
