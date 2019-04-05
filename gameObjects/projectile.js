function Projectile(field, x, y, dx, dy, color) {
    this.field = field;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.isDead = false;

    this.collides = function(x, y, objects) {
        let collidingObject = undefined;

        for (const obj of objects) {
            if (obj === this) continue;

            if (x === obj.x && y === obj.y) {
                return obj;
            }
        }

        return collidingObject;
    }

    this.move = function() {
        const nextX = this.x + this.dx;
        const nextY = this.y + this.dy;

        const collidingObject = this.collides(nextX, nextY, arguments);
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

    this.draw = function(ctx, screenWidth, screenHeight) {
        const scale = 0.3;
        const cellSize = this.field.calcCellSize(screenWidth, screenHeight);
        const size = cellSize * scale;
        const shift = (cellSize - size) * 0.5;

        const screenX = shift + this.field.calcScreenX(cellSize, screenWidth, this.x);
        const screenY = shift + this.field.calcScreenY(cellSize, screenHeight, this.y);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(screenX, screenY, size, size);
        ctx.fill();
    };
}