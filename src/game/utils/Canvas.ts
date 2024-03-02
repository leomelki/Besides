import AABB from "./AABB"

export default class Canvas {
    constructor(
        public canvas: HTMLCanvasElement,
        public ctx: CanvasRenderingContext2D,
        public width: number,
        public height: number
    ) { }

    public updateCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx
    }

    public convert(x: number, y: number): [number, number] {
        return [
            x * this.canvas.width / this.width,
            y * this.canvas.height / this.height
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

}