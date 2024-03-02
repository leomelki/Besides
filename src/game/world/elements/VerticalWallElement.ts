import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class VerticalWallElement extends Element {
    constructor(
        world: World,
        private _aabb: AABB,
    ) {
        super(world)
    }
    getAABB() {
        return this._aabb
    }
    draw(canvas: Canvas) {
        canvas.ctx.drawImage(canvas.getImage('verticalwall.svg'), ...canvas.convertAABB(this.getAABB()))
    }
    
    serialize() {
        return {
            type: 'VerticalWallElement',
            aabb: this._aabb.serialize(),
        }
    }
}