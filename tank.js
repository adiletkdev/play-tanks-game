const Projectile = require('./projectile.js');

function Tank(socket, field, x, y, dx, dy) {
    this.field = field;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.isDead = false;
    this.socket = socket;
    this.projectiles = [];

    this.turnUp = function() {
        this.dx = 0;
        this.dy = -1;
    }

    this.turnDown = function() {
        this.dx = 0;
        this.dy = 1;
    }

    this.turnLeft = function() {
        this.dx = -1;
        this.dy = 0;
    }

    this.turnRight = function() {
        this.dx = 1;
        this.dy = 0;
    }

    this.fire = function() {
        this.projectiles.push(
            new Projectile(
                this.field,
                this.x + this.dx,
                this.y + this.dy,
                this.dx,
                this.dy
            )
        );
    }

    this.collides = function(x, y, objects) {
        let collidingObject = undefined;

        for (const obj of Object.values(objects)) {
            if (obj === this) continue;

            if (x === obj.x && y === obj.y) {
                return obj;
            }

            for (const proj of obj.projectiles) {
                if (x === proj.x && y === proj.y) {
                    return proj;
                }
            }
        }

        return collidingObject;
    }

    this.move = function(tanks) {
        const nextX = this.x + this.dx;
        const nextY = this.y + this.dy;

        const collidingObject = this.collides(nextX, nextY, tanks);
        if (collidingObject) {
            this.isDead = true;
            collidingObject.isDead = true;
        } else if (field.isInside(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    this.update = function(tanks) {
        for (const projectile of this.projectiles) {
            console.log(`The projectile of player's tank ${this.socket.id} moved to ${projectile.x} ${projectile.y}.`);

            projectile.move(tanks);
        }
        this.projectiles = this.projectiles.filter(obj => {
            console.log(`The projectile of player's tank ${this.socket.id} was destroyed.`);

            return !obj.isDead
        });
    }
}

module.exports = Tank;
