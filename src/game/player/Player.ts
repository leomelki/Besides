import { DefaultInput } from "netplayjs"
import World from "../world/World"
import AABB from "../utils/AABB"
import Canvas from "../utils/Canvas"
import AnimatedSpriteRenderer from "./render/AnimatedSpriteRenderer"

export default class Player {
    lastX: number = 0
    lastY: number = 0

    x: number = 5
    y: number = 10

    motionX: number = 0
    motionY: number = 0

    onGround: boolean = false
    animation = new AnimatedSpriteRenderer("player/idle")

    walking = false

    flipped = false
    
    constructor(
        protected world: World,
    ) { }

    draw(canvas: Canvas) {
        canvas.ctx.fillStyle = "red"
        canvas.ctx.save()
        if(this.world.getPlayerToPlay(this) == this.world.game.localPlayer?.getID()) {
            canvas.ctx.globalAlpha = 0.4
        }
        if(this.flipped) {
            canvas.ctx.scale(-1, 1)
            const posSize = canvas.convertBothInterpolate(this.lastX - .3, this.lastY - 0.2, this.x - .3, this.y - 0.2, 2, 2)
            const img = canvas.getImage(this.animation.getSprite(canvas.partialTick))
            canvas.ctx.drawImage(img, -posSize[0] - posSize[2]/2, posSize[1], posSize[2], posSize[3])
        }else 
            canvas.ctx.drawImage(canvas.getImage(this.animation.getSprite(canvas.partialTick)), ...canvas.convertBothInterpolate(this.lastX - .3, this.lastY - 0.2, this.x - .3, this.y - 0.2, 2, 2))
        canvas.ctx.restore()
    }

    private _getAnimName() {
        if(!this.onGround)
            return "player/jump"
        return this.walking ? "player/run" : "player/idle"
    }
    
    tick(control: DefaultInput) {
        const vel = control.arrowKeys()

        if(vel.x != 0)
            this.flipped = vel.x < 0

        this.animation.tick()
        
        this.tickPosition(vel.x, vel.y)

        this.walking = !!vel.x

        const anim = this._getAnimName()
        if(anim != this.animation.fileName)
            this.animation = new AnimatedSpriteRenderer(anim, 15, anim == "player/jump" ? 19 : 8)
    }

	/**
	 * Actualise les mouvements du joueur en fonction des touches enfoncées.
	 * Ne doit pas être appelé en dehors de Player#tick
	 */
	private updateMovements(forward: number) {
		forward *= 0.98

		// if (_sneaking) {
		// 	forward *= 0.3
		// 	strafe *= 0.3
		// }

		let f4 = this.onGround ? 0.54600006 : 0.91
		let friction = this.onGround ? 0.09999999 * 0.16277136 / (f4 * f4 * f4) : 0.02
		let distance = forward * forward

		if (distance > 1.0E-4) {
			distance = friction / Math.max(1, Math.sqrt(distance))

			forward *= distance * 1.3

			this.motionX += forward
		}
	}

    private tickPosition(forward: number, jump: number) {
		this.lastX = this.x
		this.lastY = this.y

		if (Math.abs(this.motionX) < 0.003)
            this.motionX = 0.0

        if (Math.abs(this.motionY) < 0.003)
            this.motionY = 0.0

        this.updateMovements(forward)
        
        if(jump > 0)
            this.jump()

        this.move(this.motionX, this.motionY);

		this.motionY -= 0.08;
		this.motionY *= 0.98;
        
		let friction = this.onGround ? 0.546 : 0.91;
		this.motionX *= friction;
    }

    private jump() {
        if (this.onGround) {
            this.motionY = 0.9
            this.onGround = false
        }
    }

    public getAABB() {
        return new AABB(this.x - .3, this.y, .6, 1.6)
    }
	readonly aaCollisionBox = new AABB(-.3, 0, .6, 1.6);
    
	private move(x: number, y: number) {
		let prevX = x, prevY = y;

        let newRealCooBox = this.getAABB().move(x, y);
        let list1 = this.world.getCollisionBoxes(newRealCooBox);
        for (let collisionBox of list1)
            collisionBox.offset(-this.x, -this.y);

        let box = this.aaCollisionBox.copy();

        for (let collisionBox of list1)
            y = collisionBox.computeOffsetY(box, y);

        box.offset(0, y);

        for(let collisionBox of list1)
            x = collisionBox.computeOffsetX(box, x);

        box.offset(x, 0);

        if (y != prevY)
            this.motionY = 0;

        if (x != prevX)
            this.motionX = 0;

		this.x += x;
		this.y += y;

		let finishedFalling = prevY !== y && prevY < 0;

		if (finishedFalling) {
			this.motionY = 0;

            if(!this.onGround)
                this.animation = new AnimatedSpriteRenderer("player/idle")

			this.onGround = true;
		} else if(prevY != 0)
			this.onGround = false;
    }

    serialize(): any {  
        return {
            lastX: this.lastX,
            lastY: this.lastY,
            x: this.x,
            y: this.y,
            motionX: this.motionX,
            motionY: this.motionY,
            onGround: this.onGround
        }
    }

    deserialize(json: any) {
        this.lastX = json.lastX
        this.lastY = json.lastY
        this.x = json.x
        this.y = json.y
        this.motionX = json.motionX
        this.motionY = json.motionY
        this.onGround = json.onGround
    }
}