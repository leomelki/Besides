import Game from "../Game"
import AABB from "./AABB"

export default class Canvas {
    constructor(
        public canvas: HTMLCanvasElement,
        public ctx: CanvasRenderingContext2D,
        protected game: Game,
        protected tickDuration: number = 1000 / 20
    ) {
        for(let i = 0; i < 15;i++) {
            this.getImage(`player/run/${i}.png`)
            this.getImage(`player/jump/${i}.png`)
            this.getImage(`player/idle/${i}.png`)
        }
        this.getImage(`brokenplat0.svg`)
        this.getImage(`brokenplat1.svg`)
        this.getImage(`brokenplat2.svg`)
        this.getImage(`brokenplat3.svg`)
    }

    lastTick = 0

    public tick() {
        this.lastTick = performance.now()
    }

    get partialTick() {
        return (performance.now() - this.lastTick) / this.tickDuration
    }

    public updateCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx
    }

    private _imageCache: { [key: string]: HTMLImageElement } = {}

    public getImage(str: string): HTMLImageElement {
        if (!this._imageCache[str]) {
            this._imageCache[str] = new Image()
            this._imageCache[str].src = `/${str}`
        }
        return this._imageCache[str]
    }

    public convert(x: number, y: number): [number, number] {
        return [
            x * this.canvas.width / this.game.world.width,
            y * this.canvas.height / this.game.world.height
        ]
    }

    public convertBoth(x: number, y: number, width: number, height: number): [number, number, number, number] {
        let [x1, y1] = this.convert(x, y)
        const [w, h] = this.convert(width, height)

        //haut gauche
        //to bas gauche

        y1 = this.canvas.height - y1 - h
        
        return [x1, y1, w, h]
    }

    public convertAABB(aabb: AABB): [number, number, number, number] {
        return [...this.convertBoth(aabb.x, aabb.y, aabb.width, aabb.height)]
    }

    public interpolate(pos: [number, number], lastPos: [number, number]): [number, number] {
        return [
            lastPos[0] + (pos[0] - lastPos[0]) * this.partialTick,
            lastPos[1] + (pos[1] - lastPos[1]) * this.partialTick
        ]
    }
    public convertBothInterpolate(lastX: number, lastY: number, toX: number, toY: number, width: number, height: number): [number, number, number, number] {
        const [x, y] = this.interpolate([toX, toY], [lastX, lastY])
        return this.convertBoth(x, y, width, height)
    }

}