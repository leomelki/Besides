import Game from "../../Game"
import Player from "../../player/Player"
import AABB from "../../utils/AABB"
import Canvas from "../../utils/Canvas"
import World from "../World"
import BrokenPlatformElement from "../elements/BrokenPlatformElement"
import EndElement from "../elements/EndElement"
import FloorElement from "../elements/FloorElement"
import KeyElement from "../elements/KeyElement"
import MovingKillPlatformElement from "../elements/MovingKillPlatformElement"
import SpawnElement from "../elements/SpawnElement"

export default class Level2 extends World {
    constructor(
        game: Game,
        height: number = 18,
        width: number = 32,
    ) { 
        super(game,height,width)
    }


    get name() {
        return "Level 2"
    }   


    init() {
        this.elements.push(new FloorElement(this, new AABB(0, 0, 32, 1)))

        this.elements.push(new FloorElement(this, new AABB(0, 6, 25, 0.5)))
        this.elements.push(new FloorElement(this, new AABB(0, 12, 25, 0.5)))

        this.elements.push(new MovingKillPlatformElement(this, new AABB(6, 12.5, 1, 2), new AABB(6, 15, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(12, 15, 1, 2), new AABB(12, 12.5, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(18, 12.5, 1, 2), new AABB(18, 15, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(24, 15, 1, 2), new AABB(24, 12.5, 1, 2)))

        this.elements.push(new MovingKillPlatformElement(this, new AABB(6, 9.1, 1, 2), new AABB(6, 6.5, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(12, 6.5, 1, 2), new AABB(12, 9.1, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(18, 9.1, 1, 2), new AABB(18, 6.5, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(24, 6.5, 1, 2), new AABB(24, 9.1, 1, 2)))

        this.elements.push(new MovingKillPlatformElement(this, new AABB(6, 1 , 1, 2), new AABB(6, 3.1, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(12, 3.1, 1, 2), new AABB(12, 1, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(18, 1, 1, 2), new AABB(18, 3.1, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(24, 3.1, 1, 2), new AABB(24, 1, 1, 2)))
      
        this.elements.push(new KeyElement(this, new AABB(1, 6.5, 3, 3)))
        this.elements.push(new EndElement(this, new AABB(1, 1, 2, 5), "Level 3"))

        this.elements.push(new BrokenPlatformElement(this, new AABB(25, 5.7, 3.5, 0.75)))
        this.elements.push(new BrokenPlatformElement(this, new AABB(28.5, 5.7, 3.5, 0.75)))

        this.elements.push(new SpawnElement(this, new AABB(1, 13, 3, 1)))

        super.init()
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