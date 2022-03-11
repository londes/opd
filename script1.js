const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position, and create a circle around it
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

// add event listener to track the location of the mouse
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// create particle object
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        console.log('we\'re building a particle and x and y values are ' + x + ' ' + y);
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // method to draw individual particles
    // note: a full circle is 360 degrees, which is 2 * pi radians.
    // using the arc method, a circle is an arc which has the starting angle
    // of 0 and the ending angle of 2 * pi, or 360 degrees
    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }

    // check particle position, check mouse position, move the particle,
    // draw the particle
    update () {
        // check the particle positon: this reverses the particle if it hits
        // edge of the screen
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.width || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // collision detection: mouse position & particle position. if the 
        // distance between the mouse and a particle is less than 
        // mouse.radius (circle around the mouse) and the size of the particle
        // then we have a collision and have to move the particle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.width - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.x -= 10;
            }
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // draw particle
        this.draw();
    }
}

// create particle array. We first calculate a size between 1-5,
// then use that number to create a random location on the canvas 
// and a random direction
function init () {
    particlesArray = [];
    // want number of particles to scale with canvas size
    // size * 2 creates a buffer around particle so we don't end up stuck
    // in the edge
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2) + size * 2));
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2) + size * 2));
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        console.log('checking all Particle values passed as params x: ' + x + ' y: ' + y + ' directionX: ' + directionX + ' directionY: ' + directionY + ' size: ' + size + ' color: ' + color);
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
    }
}

//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init(); // this looks good
console.log(particlesArray[22]);
animate();