import FloatUtils from "./FloatUtils"

export default class AABB {
    static EMPTY: AABB = new AABB(-100, -100, 0, 0)

    static from(aabb: any): AABB {
        return new AABB(aabb.x, aabb.y, aabb.width, aabb.height)
    }

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) { }

    newHeight(height: number) {
        this.height = height
        return this
    }

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

    get minX() {
        return this.x
    }

    get minY() {
        return this.y
    }

    get maxX() {
        return this.x + this.width
    }

    get maxY() {
        return this.y + this.height
    }

    computeOffsetX(other: AABB, offsetX: number) {
      if (other.maxY > this.minY && other.minY < this.maxY) {
         if (offsetX > 0.0 && FloatUtils.isInferiorOrEquals(other.maxX, this.minX)) {
            offsetX = Math.min(this.minX - other.maxX, offsetX)
         } else if (offsetX < 0.0 && FloatUtils.isSuperiorOrEquals(other.minX, this.maxX)) {
            offsetX = Math.max(this.maxX - other.minX, offsetX)
         }
      }
      return offsetX
    }

   computeOffsetY(other: AABB, offsetY: number) {
    if (other.maxX > this.minX && other.minX < this.maxX) {
       if (offsetY > 0.0 && FloatUtils.isInferiorOrEquals(other.maxY, this.minY)) {
          offsetY = Math.min(this.minY - other.maxY, offsetY)
       } else if (offsetY < 0.0 && FloatUtils.isSuperiorOrEquals(other.minY, this.maxY)) {
          offsetY = Math.max(this.maxY - other.minY, offsetY)
       }
    }
    return offsetY
 }

    offset(x: number, y: number) {
        this.x += x
        this.y += y
        return this
    }

    serialize() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }
}