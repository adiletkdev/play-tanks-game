function Field(width, height) {
    this.width = width;
    this.height = height;

    this.isInside = function(x, y) {
        return x >= 0 && x < this.width &&
               y >= 0 && y < this.height;
    }
}

module.exports = Field;
