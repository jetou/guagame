class Pipes {
    constructor(game, x, end) {
        this.end = end || false
        this.game = game
        this.pipes = []
        this.pipeSpace = 123
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            if (x) {
                p1.x =  x[i].x
            } else {
                p1.x = 700 + i * this.管子横向间距
            }
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            if (x) {
                this.resetPipesPosition(p1, p2, x[i].y)
            } else {
                this.resetPipesPosition(p1, p2)
            }
            this.pipes.push(p1)
            this.pipes.push(p2)

        }
        window.paused = false
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2, y) {
        p1.y = y || randomBetween(-350, -100)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
        window.addEventListener('keydown', function(event){
            var k = event.key
            if (k == 'p') {
                    // 暂停功能
                window.paused = !window.paused
                }
        })
    }
    update() {

        if (window.paused || this.end) {
            return
        }
        for (var i = 0; i < this.pipes.length / 2; i+=2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            //log("p1.x=", p1.x)
            p1.x -= 5
            p2.x -= 5
            if(p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipe
            }
            if(p2.x < -100) {
                p2.x += this.管子横向间距 * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {

        var context = this.game.context
        for (var p of this.pipes) {
            context.save();
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2);
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2);
            context.drawImage(p.texture, 0, 0)
            context.restore()

        }
    }
}

class SceneGame extends GuaScene{
    constructor(game) {
        super(game)
        this.death = false
        this.boole
        this.score = 0
        //背景
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 地面
        this.g = GuaImage.new(game, 'ground')
        this.addElement(this.g)

        this.skipCount = 4
        self.birdSpeed = 2

        var b = GuaAnimation.new(game)
        b.x = 150
        b.y = 200
        this.bird = b
        this.addElement(b)
        this.setupInputs()
        //log(this.score)
        var sco = new guaScore(game, this.score)
        this.addElement(sco)
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    Invincible() {
        if (this.boole) {
            this.death = false
        }
    }
    update() {
        var p = this.pipe.pipes
        this.death = Birdcollision(this.bird, this.pipe.pipes) // 判断小鸟是否碰到了水管或地面并加分
        for (var i = 0; i < p.length; i++) { //加分
            if(this.pipe.pipes[i].x < 100 && this.pipe.pipes[i].x > 90) {
                this.score+=0.5 // 管子是一帧移动5个像素这里两帧(100到90)所以加到1
                if(this.score%1 == 0) {
                    this.clearscore()
                    var sco = new guaScore(this.game, this.score)
                    this.addElement(sco)
                }
            }
        }
        //log(this.score)
        super.update()
        this.skipCount --
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        this.g.x += offset
        this.Invincible()
        if (this.death) { //如果已经死亡进入结束界面
            var s = new SceneEnd(this.game, this.pipe.pipes, this.bird.y, this.score)
            this.game.replaceScene(s)
        }
    }

    setupInputs() {
        var self = this
        var b = this.bird
        this.game.registerAction('j', function(keystatus){
            b.jump()
        })
        this.game.registerAction('c', function(keystatus){
            self.boole = !self.boole
        })
    }

}
