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

    tick() {
    }

    isFinished() {
        return false
    }

    getPlayerToPlay(player: Player): 1 | 2 {
        return 1
    }
}