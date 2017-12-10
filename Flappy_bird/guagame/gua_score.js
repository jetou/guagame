class guaScore {
    constructor(game, score) {
        this.game = game
        this.scores = []
        this.name = 'score'
        for (var i = 0; i < 10; i++) {
            var name = `score${i}`
            var t = game.textureByName(name)
            this.scores[i] = t
        }
        this.k = 1
        this.score = score
        this.weishu = this.score.toString().length - 1;
        this.texture = []
        this.texture.push(this.scores[this.score])
        this.w = this.texture.width
        this.h = this.texture.height
        this.x = 180
        this.y = 50
        var context = this.game.context

    }
    update() {
        for (var i = 0; i <= this.weishu ; i++) {
            if (i < this.weishu) {
                this.texture[i] = this.scores[Math.floor(this.score/(10*this.weishu))]
            } else {
                this.texture[i] = this.scores[this.score%10]
            }
        }
    }
    draw() {
        //log(this.weishu)
        var context = this.game.context
        for (var i = 0; i <= this.weishu; i++) {
            context.drawImage(this.texture[i], this.x + i*20, this.y)
        }
    }
}
