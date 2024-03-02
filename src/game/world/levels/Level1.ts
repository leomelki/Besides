import Game from "../../Game"
import Player from "../../player/Player"
import AABB from "../../utils/AABB"
import Canvas from "../../utils/Canvas"
import World from "../World"
import BrokenPlatformElement from "../elements/BrokenPlatformElement"
import FloorElement from "../elements/FloorElement"
import MovingPlatformElement from "../elements/MovingPlatformElement"
import PlatformElement from "../elements/PlatformElement"

export default class Level1 extends World {

    get name() {
        return "Level 1"
    }

    constructor(game: Game) {
        super(game)
    }

    init() {
        this.elements.push(new FloorElement(this))
        this.elements.push(new PlatformElement(this, new AABB(20, 2.3, 10, 1)))
        this.elements.push(new BrokenPlatformElement(this, new AABB(30, 2.6, 10, 1)))
        this.elements.push(new MovingPlatformElement(this, new AABB(10, 2, 10, 1), new AABB(19, 2, 10, 1)))
    }

    draw(canvas: Canvas): void {
        canvas.ctx.drawImage(canvas.getImage('background.jpg'), 0, 0, canvas.canvas.width, canvas.canvas.height)
        super.draw(canvas)
    }

    isFinished() {
        return false
    }

    getPlayerToPlay(player: Player) {
        return player.x < this.width / 2 ? 0 : 1
    }
}