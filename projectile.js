function Projectile(field, x, y, dx, dy) {
    this.field = field;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.isDead = !field.isInside(x, y);

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
        } else {
            if (field.isInside(nextX, nextY)) {
                this.x = nextX;
                this.y = nextY;
            } else {
                this.isDead = true;
            }
        }
    }
}

module.exports = Projectile;
