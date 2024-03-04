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
import MovingPlatformElement from "../elements/MovingPlatformElement"
import PlatformElement from "../elements/PlatformElement"
import SpawnElement from "../elements/SpawnElement"
import VerticalWallElement from "../elements/VerticalWallElement"

export default class Level3 extends World {
    constructor(
        game: Game,
        height: number = 18,
        width: number = 32,
    ) { 
        super(game,height,width)
    }


    get name() {
        return "Level 3"
    }   


    init() {
        this.elements.push(new FloorElement(this, new AABB(0, 0, 32, 1)))

        this.elements.push(new VerticalWallElement(this, new AABB(10, 1, 1, 13)))
        this.elements.push(new VerticalWallElement(this, new AABB(21, 1, 1, 13)))
     
        this.elements.push(new FloorElement(this, new AABB(13.5, 12, 7.5, 0.5)))
        this.elements.push(new FloorElement(this, new AABB(13.5, 6, 7.5, 0.5)))
        this.elements.push(new FloorElement(this, new AABB(11, 9, 7.5, 0.5)))
        this.elements.push(new FloorElement(this, new AABB(11, 3, 7.5, 0.5)))

        this.elements.push(new MovingKillPlatformElement(this, new AABB(12.5, 3.5, 1, 2), new AABB(12.5, 6.1, 1, 2)))
        this.elements.push(new MovingKillPlatformElement(this, new AABB(18.5, 9.1, 1, 2), new AABB(18.5, 6.5, 1, 2)))

        this.elements.push(new PlatformElement(this, new AABB(22, 4, 3.5, 0.6)))

        this.elements.push(new BrokenPlatformElement(this, new AABB(28.5, 8, 3.5, 0.75)))

        this.elements.push(new MovingPlatformElement(this, new AABB(22, 12, 3.5, 0.6), new AABB(28.5, 12, 3.5, 0.6)))

        this.elements.push(new PlatformElement(this, new AABB(0, 4, 3.5, 0.6)))

        this.elements.push(new BrokenPlatformElement(this, new AABB(6.5, 8, 3.5, 0.75)))

        this.elements.push(new MovingPlatformElement(this, new AABB(6.5, 12, 3.5, 0.6), new AABB(0, 12, 3.5, 0.6)))

        this.elements.push(new EndElement(this, new AABB(5, 1,  2, 5), "end")) 
        this.elements.push(new KeyElement(this, new AABB(11, 1, 2, 2)))
        this.elements.push(new SpawnElement(this, new AABB(28, 3, 3, 1)))

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