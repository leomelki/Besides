import { DefaultInput, Game as NJSGame, NetplayPlayer } from 'netplayjs'

import Player from './player/Player'
import Canvas from './utils/Canvas'
import BrokenPlatformElement from './world/elements/BrokenPlatformElement'
import Level2 from './world/levels/Level2'
import Level3 from './world/levels/Level3'

export default class Game extends NJSGame {

    deterministic = false

    static timestep = 1000 / 20
    static canvasSize = { width: 1920, height: 1080 }
    
    private _partialTick: number = 0
    get partialTick() {
        return this._partialTick
    }

    canvas = new Canvas(undefined!, undefined!, this)

    world = new Level2(this)
    player = new Player(this.world)

    constructor() {
        super()
        this.world.init()
    }

    killPlayer() {
        this.world.hasKey = false
        this.player.x = this.world.start[0]
        this.player.y = this.world.start[1]

        for(let element of this.world.elements)
            if(element instanceof BrokenPlatformElement)
                element.reset()
        //todo
    }

    localPlayer!: NetplayPlayer

    tick(playerInputs: Map<NetplayPlayer, DefaultInput>) {
        this.canvas.tick()
        this.world.tick()
        for (const [player, input] of playerInputs.entries()){
            if(this.world.getPlayerToPlay(this.player) === player.getID())
                this.player.tick(input)
            
            if(player.isLocal)
                this.localPlayer = player
        }
        
    }

    draw(canvas: HTMLCanvasElement) {
        //ON VOIT TOUJOURS SON PERSO, MEME DANS LA PARTIE AU ON CONTROLE, ON VOIT JUSTE PAS LA MAP
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

    win() {
        document.write('You win!')
    }

    deserialize(value: any) {
        if(this.world.name == value.world.name)
            this.world.deserialize(value.world)
        else {
            this.world = Game.createWorld(value.world.name, this)
         
            this.world.deserialize(value.world)   
        }
        
        this.player.deserialize(value.player)
    }
    static createWorld(name: string, game: Game) {
        switch (name) {
            case 'Level 2':
                return new Level2(game)
            case 'Level 3':
                return new Level3(game)
            default:
                throw new Error(`Unknown world name: ${name}`)
        }
    }
}