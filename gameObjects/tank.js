function Tank(field, x, y, dx, dy, color) {
    this.field = field;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
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

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(screenX, screenY, cellSize - 1, cellSize - 1);
        ctx.fill();
    };
}