import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";
import Element from "./Element";

export default class BrokenPlatformElement extends Element {
    constructor(
        world: World,
        protected _aabb: AABB,
        protected _breakDelay: number = 4,
        protected _lastWalk = 0,
        protected _broken = false,
    ) {
        super(world)
    }
    
    getAABB(): AABB {
        return this._broken ? AABB.EMPTY : this._aabb
    }

    getStade() {
        if(!this._lastWalk)
            return 0

        const stades = 4
        const time = (Date.now() - this._lastWalk) / 1000
        //stade 4 = break
        return Math.min(stades, Math.floor(time / (this._breakDelay / stades)))
    }

    tick() {
        console.log('ticking ', this._broken)
        if (this._broken) return

        console.log('tick')

        const player = this.world.game.player
        if (player && this.getAABB().intersects(player.getAABB().offset(0, -0.1))) {
            if(!this._lastWalk)
                this._lastWalk = Date.now()
            console.log('intersect', this.getStade())
        } else
            this._lastWalk = 0

        if(this.getStade() == 4)
            this._broken = true
    }

    draw(canvas: Canvas) {
        if(this.getStade() != 4)
            canvas.ctx.drawImage(canvas.getImage(`brokenplat${this.getStade()}.svg`), ...canvas.convertAABB(this._aabb.copy().newHeight(this._aabb.height / .7)))
    }
    
    serialize() {
        return {
            type: 'BrokenPlatformElement',
            aabb: this._aabb.serialize(),
            breakDelay: this._breakDelay,
            lastWalk: this._lastWalk,
            broken: this._broken,
        }
    }
}