import Game from "../../Game";
import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class EndElement extends Element {
    constructor(
        world: World,
        private _aabb: AABB,
        private _nextWorld: string,
    ) {
        super(world)
    }
    getAABB() {
        return AABB.EMPTY
    }
    draw(canvas: Canvas) {
        canvas.ctx.drawImage(canvas.getImage('finishplat.svg'), ...canvas.convertAABB(this._aabb))
    }
    tick() {
        if (this.world.hasKey &&this._aabb.intersects(this.world.game.player.getAABB())) {
            if(this._nextWorld === 'end') {
                this.world.game.win()
                return
            }
            this.world.game.world = Game.createWorld(this._nextWorld, this.world.game)
            this.world.game.world.init()
        }
    }
    
    serialize() {
        return {
            type: 'EndElement',
            aabb: this._aabb.serialize(),
            world: this._nextWorld,
        }
    }
}