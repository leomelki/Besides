import { Application } from 'pixi.js'

export default abstract class World {
    constructor(
        protected app: Application,
    ) { }

    abstract initElements(): void

    abstract draw(): void

    tick() { }

    abstract isFinished(): boolean

    abstract isSolid(x: number, y: number): boolean

    abstract getPlayerToPlay(x: number, y: number): 1 | 2
}