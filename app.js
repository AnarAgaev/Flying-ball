let canvas     = document.getElementById('canvas'),
    ctx        = canvas.getContext('2d'),
    width      = canvas.width = 300,
    height     = canvas.height = 300,
    keyActions = {32: 'stop', 37: 'left', 38: 'up', 39: 'right', 40: 'down'},
    keySpeed   = {49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9};

const MIN_SIZE = 2,
      MAX_SIZE = 70;

canvas.style.backgroundColor = 'gold';
class Ball {
    constructor () {
        this.x      = width / 2;
        this.y      = height / 2;
        this.size = 10;
        this.speed  = 5;
        this.xSpeed = this.speed;
        this.ySpeed = 0;
    }

    /**
     * Draw the ball in its current position
     */
    drow () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fill();
    }

    /**
     * Updating the position of the ball according to its speed
     */
    move () {
        // Rewrite speed. It's need whtn user clickd change speed
        if (this.xSpeed) {
           this.xSpeed = (this.xSpeed > 0) ? this.speed : -this.speed;
        }
        if (this.ySpeed) {
           this.ySpeed = (this.ySpeed > 0) ? this.speed : -this.speed;
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x < this.size) {
            this.setDirection('right');
        } else if (this.x > width - this.size) {
            this.setDirection('left');
        }

        if (this.y < this.size) {
            this.setDirection('down');
        } else if (this.y > height - this.size) {
            this.setDirection('up');
        }
    }

    /**
     * We set a new direction of movement
     * @param {*} direction 
     */
    setDirection (direction) {
        let setCoordinats = (x, y) => {
                this.xSpeed = x;
                this.ySpeed = y;
            };

        switch (direction) {
            case 'up':
                setCoordinats(0, -this.speed);
                break;
            case 'down':
                setCoordinats(0, this.speed);
                break;
            case 'left':
                setCoordinats(-this.speed, 0);
                break;
            case 'right':
                setCoordinats(this.speed, 0);
                break;
            case 'stop':
                setCoordinats(0, 0);
                break;
        }
    }
}

/**
 * Create new object ball
 */
let ball = new Ball();
ctx.fillStyle = 'red'; // paint new ball

/**
 * Animation function
 */
setInterval(() => {
    ctx.clearRect(0, 0, width, height); // clear canvas
    ball.drow();
    ball.move();
}, 30);

/**
 * Event handler keydown, will be called every time a key is pressed
 */
document.body.addEventListener('keydown', event => {
    if (event.keyCode > 36 && event.keyCode < 41 || event.keyCode == 32) {
        // swith direction
        ball.setDirection(keyActions[event.keyCode])
    } else if (event.keyCode > 48 && event.keyCode < 58) {
        // swith speed
        ball.speed = keySpeed[event.keyCode]; 
    } else if (event.keyCode == 90) {
        // make speek slower
        ball.speed = (ball.speed != 1) ? --ball.speed : ball.speed; 
    } else if (event.keyCode == 88) {
        // make speek faster
        ball.speed = (ball.speed != 9) ? ++ball.speed : ball.speed;
    } else if (event.keyCode == 67) {
        // make size smaller
        ball.size = (ball.size > MIN_SIZE) ? --ball.size : ball.size;
    } else if (event.keyCode == 86) {
        // make size biger
        ball.size = (ball.size < MAX_SIZE) ? ++ball.size : ball.size;
    }
});