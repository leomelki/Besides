import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class PlatformElement extends Element {
    constructor(
        world: World,
        protected _aabb: AABB,
    ) {
        super(world)
    }
    
    getAABB(): AABB {
        return this._aabb
    }
    draw(canvas: Canvas) {
        canvas.ctx.drawImage(canvas.getImage('fixedplat.svg'), ...canvas.convertAABB(this._aabb.copy().newHeight(this._aabb.height / .7)))
    }
    
    serialize() {
        return {
            type: 'PlatformElement',
            aabb: this._aabb.serialize()
        }
    }
}