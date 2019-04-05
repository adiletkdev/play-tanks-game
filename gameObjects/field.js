function Field(width, height, image) {
    this.width = width;
    this.height = height;
    this.image = image;

    this.calcCellSize = function(screenWidth, screenHeight) {
        return Math.min(screenWidth / this.width, screenHeight / this.height);
    }

    this.calcScreenX = function(cellSize, screenWidth, x) {
        const shiftX = (screenWidth - this.width * cellSize) * 0.5;
        return shiftX + x * cellSize;
    }

    this.calcScreenY = function(cellSize, screenHeight, y) {
        const shiftY = (screenHeight - this.height * cellSize) * 0.5;
        return shiftY + y * cellSize;
    }

    this.isInside = function(x, y) {
        return x >= 0 && x < this.width &&
               y >= 0 && y < this.height;
    }

    this.draw = function(ctx, screenWidth, screenHeight) {
        const cellSize = this.calcCellSize(screenWidth, screenHeight);
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const screenX = this.calcScreenX(cellSize, screenWidth, x);
                const screenY = this.calcScreenY(cellSize, screenHeight, y);

                ctx.drawImage(this.image, screenX, screenY, cellSize - 1, cellSize - 1);
            }
        }
    };
}