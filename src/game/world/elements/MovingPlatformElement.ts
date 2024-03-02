import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class MovingPlatformElement extends Element {
    constructor(
        world: World,
        protected _from: AABB,
        protected _to: AABB,
        protected _transitionDuration: number = 6,
        protected _creationTime = Date.now(),
    ) {
        super(world)
    }

    tick() {
    }
    
    getAABB(): AABB {
        const percent = ((Date.now() - this._creationTime) / this._transitionDuration) / 1000 % 1
        const halfedPercent = Math.abs(percent - 0.5) * 2

        return new AABB(
            this._from.x + (this._to.x - this._from.x) * halfedPercent,
            this._from.y + (this._to.y - this._from.y) * halfedPercent,
            this._from.width + (this._to.width - this._from.width) * halfedPercent,
            this._from.height + (this._to.height - this._from.height) * halfedPercent,
        )
    }
    draw(canvas: Canvas) {
        const aabb = this.getAABB()
        canvas.ctx.drawImage(canvas.getImage('movingplat.svg'), ...canvas.convertAABB(aabb.copy().newHeight(aabb.height / .7)))
    }
    
    serialize() {
        return {
            type: 'MovingPlatformElement',
            from: this._from.serialize(),
            to: this._to.serialize(),
            transitionDuration: this._transitionDuration,
            creationTime: this._creationTime,
        }
    }
}