import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class FloorElement extends Element {
    constructor(
        world: World,
        private _aabb: AABB = new AABB(0, 0, world.width, 2.3)
    ) {
        super(world)
    }
    getAABB() {
        return this._aabb
    }
    draw(canvas: Canvas) {
        canvas.ctx.drawImage(canvas.getImage('sol.svg'), ...canvas.convertAABB(this.getAABB().copy().newHeight(this.getAABB().height / 2.3 * 3)))
    }
    
    serialize() {
        return {
            type: 'FloorElement',
            aabb: this._aabb.serialize(),
        }
    }
}