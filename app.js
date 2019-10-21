let canvas     = document.getElementById('canvas'),
    ctx        = canvas.getContext('2d'),
    width      = canvas.width = 300,
    height     = canvas.height = 300,
    ballRadius = 10,
    keyActions = {32: 'stop', 37: 'left', 38: 'up', 39: 'right', 40: 'down'},
    keySpeed   = {49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9},
    circle = function (x, y, radius, fillCirle) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        fillCirle ? ctx.fill() : ctx.stroke();
    };

canvas.style.backgroundColor = 'greenyellow';
class Ball {
    constructor () {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = this.speed = 5;
        this.ySpeed = 0;
    }

    printSpeed () {
        console.log(this.speed);
    }

    /**
     * Updating the position of the ball according to its speed
     */
    move () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x < ballRadius * 2) {
            this.setDirection('right');
        } else if (this.x > width - ballRadius * 2) {
            this.setDirection('left');
        }

        if (this.y < ballRadius * 2) {
            this.setDirection('down');
        } else if (this.y > height - ballRadius * 2) {
            this.setDirection('up');
        }
    }

    /**
     * Draw the ball in its current position
     */
    drow () {
        circle(this.x, this.y, ballRadius, true);
    }

    /**
     * We set a new direction of movement
     * @param {*} direction 
     */
    setDirection (direction) {
        switch (direction) {
            case 'up':
                this.setCoordinats(0, -this.speed);
                break;
            case 'down':
                this.setCoordinats(0, this.speed);
                break;
            case 'left':
                this.setCoordinats(-this.speed, 0);
                break;
            case 'right':
                this.setCoordinats(this.speed, 0);
                break;
            case 'stop':
                this.setCoordinats(0, 0);
                break;
        }
    }

    changeSpeed (newSpeed) {
        this.speed = newSpeed;
    }

    setCoordinats (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
}

/**
 * Create new object ball
 */
let ball = new Ball();
ctx.fillStyle = 'hotpink';

/**
 * Event handler keydown, will be called every time a key is pressed
 */
document.body.addEventListener('keydown', event => {
    let direction = keyActions[event.keyCode],
        newSpeed = keySpeed[event.keyCode];
    
    (event.keyCode > 48 && event.keyCode < 58) 
        ? ball.changeSpeed(newSpeed)
        : ball.setDirection(direction);
});

/**
 * Animation function
 */
setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    ball.drow();
    ball.move();


    ball.printSpeed();
}, 30);