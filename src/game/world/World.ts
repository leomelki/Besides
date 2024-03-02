import Game from '../Game';
import Player from '../player/Player';
import AABB from '../utils/AABB';
import Canvas from '../utils/Canvas';
import Element from './elements/Element';
import FloorElement from './elements/FloorElement';

export default abstract class World {
    elements: Element[] = []
    constructor(
        protected game: Game,
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
    tick() { }

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
                    return new FloorElement(this)
                default:
                    throw new Error(`Unknown element type: ${e.type}`)
            }
        })
    }
}