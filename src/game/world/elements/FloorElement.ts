import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import Element from "./Element";

export default class FloorElement extends Element {
    private _aabb: AABB = new AABB(0, 3, 10000, 100)
    getAABB() {
        return this._aabb
    }
    draw(canvas: Canvas) {
        canvas.ctx.fillStyle = 'black'
        canvas.ctx.fillRect(...canvas.convertAABB(this.getAABB()))
    }
    
    serialize() {
        return {
            type: 'FloorElement',
        }
    }
}