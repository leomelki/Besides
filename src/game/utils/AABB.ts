export default class AABB {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) { }

    intersects(other: AABB) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
    }

    move(x: number, y: number) {
        this.x += x
        this.y += y

        return this
    }

    copy() {
        return new AABB(this.x, this.y, this.width, this.height)
    }

    computeOffsetY(other: AABB, y: number) {
        if (y > 0 && this.y + this.height <= other.y)
            return Math.min(other.y - this.y - this.height, y)
        else if (y < 0 && this.y >= other.y + other.height)
            return Math.max(other.y + other.height - this.y, y)
        return y
    }

    computeOffsetX(other: AABB, x: number) {
        if (x > 0 && this.x + this.width <= other.x)
            return Math.min(other.x - this.x - this.width, x)
        else if (x < 0 && this.x >= other.x + other.width)
            return Math.max(other.x + other.width - this.x, x)
        return x
    }

    offset(x: number, y: number) {
        this.x += x
        this.y += y
    }
}