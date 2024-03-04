import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class KeyElement extends Element {
    constructor(
        world: World,
        private _aabb: AABB,
    ) {
        super(world)
    }
    getAABB() {
        return AABB.EMPTY
    }
    draw(canvas: Canvas) {
        if(!this.world.hasKey)
            canvas.ctx.drawImage(canvas.getImage('key.svg'), ...canvas.convertAABB(this._aabb))
        else
        canvas.ctx.drawImage(canvas.getImage('key.svg'), canvas.canvas.width - 80, 20, 60, 60)
    }
    tick() {
        if (this._aabb.intersects(this.world.game.player.getAABB()))
            this.world.hasKey = true
    }
    
    serialize() {
        return {
            type: 'KeyElement',
            aabb: this._aabb.serialize(),
        }
    }
}