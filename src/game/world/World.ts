import Game from '../Game';
import Player from '../player/Player';
import AABB from '../utils/AABB';
import Canvas from '../utils/Canvas';
import BrokenPlatformElement from './elements/BrokenPlatformElement';
import Element from './elements/Element';
import FloorElement from './elements/FloorElement';
import MovingKillPlatformElement from './elements/MovingKillPlatformElement';
import MovingPlatformElement from './elements/MovingPlatformElement';
import PlatformElement from './elements/PlatformElement';
import VerticalWallElement from './elements/VerticalWallElement';

export default abstract class World {
    elements: Element[] = []
    constructor(
        public game: Game,
        public height: number = 30,
        public width: number = 60,
    ) { }

    abstract get name(): string

    /**
     * Called when the world is created
     * This is where you should add elements to the world
     */
    abstract init(): void

    /**
     * Called every frame
     * @param canvas The canvas to draw on
     */
    draw(canvas: Canvas) {
        for (const element of this.elements)
            element.draw(canvas)
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
            elements: this.elements.map(e => e.serialize())
        }
    }

    deserialize(json: any) {
        this.elements = json.elements.map((e: any) => {
            switch (e.type) {
                case 'FloorElement':
                    return new FloorElement(this, AABB.from(e.aabb))
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