import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class SpawnElement extends Element {
    constructor(
        world: World,
        public aabb: AABB,
    ) {
        super(world)
    }
    getAABB() {
        return AABB.EMPTY
    }
    draw(canvas: Canvas) {
        canvas.ctx.drawImage(canvas.getImage('startplat.svg'), ...canvas.convertAABB(this.aabb.copy().offset(0, -0.7)))
    }

    tick() { }
    
    serialize() {
        return {
            type: 'SpawnElement',
            aabb: this.aabb.serialize(),
        }
    }
}