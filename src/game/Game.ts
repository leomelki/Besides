import {NetplayPlayer, DefaultInput, Game as NJSGame} from 'netplayjs'

import { Application } from 'pixi.js'

export default class Game extends NJSGame {

    app = new Application()

    static timestep = 1000 / 60

    static canvasSize = { width: 600, height: 300 }

    aPos: { x: number, y: number }
    bPos: { x: number, y: number }

    constructor() {
        super()
        this.aPos = { x: 100, y: 150 }
        this.bPos = { x: 500, y: 150 }
    }

    tick(playerInputs: Map<NetplayPlayer, DefaultInput>) {
        for (const [player, input] of playerInputs.entries()) {
            const vel = input.arrowKeys()

            console.log(vel)

            if (player.getID() == 0) {
                this.aPos.x += vel.x * 5
                this.aPos.y -= vel.y * 5
            } else if (player.getID() == 1) {
                this.bPos.x += vel.x * 5
                this.bPos.y -= vel.y * 5
            }
        }
    }

    draw(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d")!

        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "red"
        ctx.fillRect(this.aPos.x - 5, this.aPos.y - 5, 10, 10)
        ctx.fillStyle = "blue"
        ctx.fillRect(this.bPos.x - 5, this.bPos.y - 5, 10, 10)
    }
}