import { DefaultInput, Game as NJSGame, NetplayPlayer } from 'netplayjs'

import Player from './player/Player'
import Canvas from './utils/Canvas'
import Level1 from './world/levels/Level1'

export default class Game extends NJSGame {

    deterministic = false

    static timestep = 1000 / 20
    static canvasSize = { width: 600, height: 300 }
    
    private _partialTick: number = 0
    get partialTick() {
        return this._partialTick
    }

    canvas = new Canvas(undefined!, undefined!, this)

    world = new Level1(this)
    player = new Player(this.world)

    constructor() {
        super()
        this.world.init()
    }

    tick(playerInputs: Map<NetplayPlayer, DefaultInput>) {
        this.canvas.tick()
        for (const [player, input] of playerInputs.entries())
            if(this.world.getPlayerToPlay(this.player) === player.getID())
                this.player.tick(input)
    }

    draw(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d")!
        this.canvas.updateCanvas(canvas, ctx)

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        this.world.draw(this.canvas)
        this.player.draw(this.canvas)
    }

    serialize() {
        return {
            world: this.world.serialize(),
            player: this.player.serialize()
        }
    }

    deserialize(value: any) {
        if(this.world.name == value.world.name)
            this.world.deserialize(value.world)
        else
            console.log("World name mismatch")
        
        this.player.deserialize(value.player)
    }
}