import AABB from "../../utils/AABB";
import Canvas from "../../utils/Canvas";
import World from "../World";

export default abstract class Element {
    constructor(
        protected world: World,
    ) { }

    abstract getAABB(): AABB

    abstract draw(canvas: Canvas): void

    tick() { }

    abstract serialize(): any
}