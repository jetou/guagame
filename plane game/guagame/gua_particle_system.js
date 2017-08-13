class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 10
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life --
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}


class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
        this.name = "particles"
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []

    }
    update() {
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)

            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有小火花
        for (var p of this.particles) {
            p.update()
        }
        //删掉死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        for (var p of this.particles) {
            p.draw()
        }
    }
}
