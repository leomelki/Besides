import Game from '../Game';
import Player from '../player/Player';
import AABB from '../utils/AABB';
import Canvas from '../utils/Canvas';
import BrokenPlatformElement from './elements/BrokenPlatformElement';
import Element from './elements/Element';
import EndElement from './elements/EndElement';
import FloorElement from './elements/FloorElement';
import KeyElement from './elements/KeyElement';
import MovingKillPlatformElement from './elements/MovingKillPlatformElement';
import MovingPlatformElement from './elements/MovingPlatformElement';
import PlatformElement from './elements/PlatformElement';
import SpawnElement from './elements/SpawnElement';
import VerticalWallElement from './elements/VerticalWallElement';

export default abstract class World {
    elements: Element[] = []
    hasKey: boolean = false;
    constructor(
        public game: Game,
        public height: number = 30,
        public width: number = 60,
    ) { }

    abstract get name(): string

    get start(): [number, number] {
        const spawn = this.elements.find(e => e instanceof SpawnElement)
        if (!spawn)
            throw new Error('No spawn found')
        const aabb = (spawn as SpawnElement).aabb
        return [aabb.x + aabb.width / 2, aabb.y]
    }

    /**
     * Called when the world is created
     * This is where you should add elements to the world
     */
    init() {
        this.game.player.x = this.start[0]
        this.game.player.y = this.start[1]

        this.elements.push(new VerticalWallElement(this, new AABB(-1, 0, 1, this.height)))
        this.elements.push(new VerticalWallElement(this, new AABB(this.width, 0, 1, this.height)))
    }

    /**
     * Called every frame
     * @param canvas The canvas to draw on
     */
    draw(canvas: Canvas) {
        for (const element of this.elements)
            element.draw(canvas)

        canvas.ctx.fillStyle = 'black'
        if(this.game.localPlayer){
            canvas.ctx.fillRect(canvas.canvas.width/2 * this.game.localPlayer.getID(), 0, canvas.canvas.width/2, canvas.canvas.height)
        }
    }

    /**
     * Called every frame
     */
    tick() {
        for (const element of this.elements)
            element.tick()
    }

    /**
     * @returns Whether the player reached the end of the level
     */
    abstract isFinished(): boolean

    /**
     * @param aabb The bounding box to check for collisions
     * @returns The bounding boxes of the elements that collide with the given bounding box
     */
    getCollisionBoxes(aabb: AABB): AABB[] {
        return this.elements.map(e => e.getAABB()).filter(e => e.intersects(aabb)).map(e => e.copy())
    }

    /**
     * @param player The player to check
     * @returns The player that should play
     */
    abstract getPlayerToPlay(player: Player): 0 | 1

    serialize() {
        return {
            name: this.name,
            elements: this.elements.map(e => e.serialize()),
            hasKey: this.hasKey,
        }
    }

    /**
     * Deserialize the world
     * 
     * Note: This is used to sync the game state with the other player
     *       All elements should be deserialized here
     * 
     * @param json The json to deserialize 
     */
    deserialize(json: any) {
        this.hasKey = json.hasKey
        this.elements = json.elements.map((e: any) => {
            switch (e.type) {
                case 'FloorElement':
                    return new FloorElement(this, AABB.from(e.aabb))
                case 'EndElement':
                    return new EndElement(this, AABB.from(e.aabb), e.world)
                case 'SpawnElement':
                    return new SpawnElement(this, AABB.from(e.aabb))
                case 'KeyElement':
                    return new KeyElement(this, AABB.from(e.aabb))
                case 'VerticalWallElement':
                    return new VerticalWallElement(this, AABB.from(e.aabb))
                case 'PlatformElement':
                    return new PlatformElement(this, AABB.from(e.aabb))
                case 'BrokenPlatformElement':
                    return new BrokenPlatformElement(this, AABB.from(e.aabb), e.breakDelay, e.lastWalk, e.broken)
                case 'MovingPlatformElement':
                    return new MovingPlatformElement(this, AABB.from(e.from), AABB.from(e.to), e.transitionDuration, e.creationTime)
                case 'MovingKillPlatformElement':
                    return new MovingKillPlatformElement(this, AABB.from(e.from), AABB.from(e.to), e.transitionDuration, e.creationTime)
                default:
                    throw new Error(`Unknown element type: ${e.type}`)
            }
        })
    }
}

