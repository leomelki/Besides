import Game from "../../Game"
import Player from "../../player/Player"
import Canvas from "../../utils/Canvas"
import World from "../World"
import FloorElement from "../elements/FloorElement"

export default class Level1 extends World {

    get name() {
        return "Level 1"
    }

    constructor(game: Game) {
        super(game)
    }

    init() {
        this.elements.push(new FloorElement(this))
    }

    draw(canvas: Canvas): void {
        canvas.ctx.drawImage(canvas.getImage('background.jpg'), 0, 0, canvas.canvas.width, canvas.canvas.height)
        super.draw(canvas)
    }

    tick() {
    }

    isFinished() {
        return false
    }

    getPlayerToPlay(player: Player) {
        return player.x < this.width / 2 ? 0 : 1
    }
}