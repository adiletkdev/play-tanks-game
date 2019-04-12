function Tank(field, x, y, dx, dy, image) {
    this.field = field;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image = image;
    this.isDead = false;

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
        } else if (field.isInside(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    this.draw = function(ctx, screenWidth, screenHeight) {
        const cellSize = this.field.calcCellSize(screenWidth, screenHeight);
        const screenX = this.field.calcScreenX(cellSize, screenWidth, this.x);
        const screenY = this.field.calcScreenY(cellSize, screenHeight, this.y);

        ctx.save();
        ctx.translate(screenX + cellSize * 0.5, screenY + cellSize * 0.5);
        if (this.dx === 0 && this.dy === -1) {
            ctx.rotate(2 * Math.PI);
        } else if (this.dx === 0 && this.dy === 1) {
            ctx.rotate(Math.PI);
        } else if (this.dx === -1 && this.dy === 0) {
            ctx.rotate(-Math.PI * 0.5);
        } else if (this.dx === 1 && this.dy === 0) {
            ctx.rotate(Math.PI * 0.5);
        }
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image, -cellSize * 0.5, -cellSize * 0.5, cellSize, cellSize);
        ctx.restore();
    };
}
