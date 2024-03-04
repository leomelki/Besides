export default class AnimatedSpriteRenderer {
    constructor(
        public fileName: string,
        private _animSize = 15,
        private _animTickDuration = 15,
    ) { }

    private _currTick: number = 0

    public tick() {
        this._currTick++;
    }

    public getSprite(partial: number): string {
        const sprite = Math.floor((this._currTick + partial) / this._animTickDuration * this._animSize) % this._animSize
        return `${this.fileName}/${sprite}.png`
    }
}