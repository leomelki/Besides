import { DefaultInput } from "netplayjs"
import World from "../world/World"

export default class Player {
    lastX: number = 0
    lastY: number = 0

    x: number = 0
    y: number = 0

    motionX: number = 0
    motionY: number = 0

    onGround: boolean = false
    
    constructor(
        protected world: World,
    ) { }
    
    tick(control: DefaultInput) {
        const vel = control.arrowKeys()
        
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

			forward *= distance

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
            this.motionY = 0.42
            this.onGround = false
        }
    }
    
	private move(x: number, y: number) {
        //TODO check collision
        if(this.world.isSolid(this.x + x, this.y)) {
            x = 0
            this.motionX = 0
        }
        if(this.world.isSolid(this.x, this.y + y)) {
            y = 0
            this.motionY = 0
        }

        //in case of perfect diagonal
        if(this.world.isSolid(this.x + x, this.y + y)) {
            x = 0
            y = 0
            this.motionX = 0
            this.motionY = 0
        }
        

		this.x += x;
		this.y += y;

        this.onGround = this.world.isSolid(this.x, this.y - 0.05)
    }
}