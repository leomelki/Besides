import World from "../World"
import { Application } from 'pixi.js'

export default class Level1 extends World {
    constructor(app: Application) {
        super(app)
    }

    initElements() {

    }

    tick() {
    }

    draw() {
    }

    isFinished() {
        return false
    }

    isSolid(x: number, y: number) {
        return true
    }

    getPlayerToPlay(x: number, y: number): 1 | 2 {
        return 1
    }

}