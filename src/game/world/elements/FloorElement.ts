import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import Element from "./Element";

export default class FloorElement extends Element {
    private _aabb: AABB = new AABB(0, 0, this.world.width, 2.3)
    getAABB() {
        return this._aabb
    }
    draw(canvas: Canvas) {
        canvas.ctx.drawImage(canvas.getImage('sol.svg'), ...canvas.convertAABB(this.getAABB().copy().newHeight(3)))
    }
    
    serialize() {
        return {
            type: 'FloorElement',
        }
    }
}