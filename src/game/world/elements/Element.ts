import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";

export default abstract class Element {
    constructor(
        protected world: World,
    ) { }

    /**
     * Get the axis-aligned bounding box of the solid part of the element 
     * 
     * @returns The axis-aligned bounding box
    */
    abstract getAABB(): AABB

    /**
     * Draw the element on the canvas
     * Note: is called every frame
     * 
     * @param canvas The canvas to draw on
     */
    abstract draw(canvas: Canvas): void

    /**
     * Is called 20 times per second (game loop)
     * Note: All logic affecting gameplay or using game data should be done here
     */
    tick() { }

    /**
     * Serialize the element to a JSON object
     * Note: Used for syncing the game state with the other player
     * 
     * @returns The serialized element
     */
    abstract serialize(): any
}