class SceneGame extends GuaScene{
    constructor(game) {
        super(game)
        //背景
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 地面
        this.g = GuaImage.new(game, 'ground')
        this.addElement(this.g)

        this.skipCount = 4
        // mario
        let mario = GuaNesSprite.new(game)
        this.addElement(mario)
        mario.x = 100
        mario.y = 50
        this.mario = mario

        this.setupInputs()

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
        // var p = this.pipe.pipes
        // this.death = Birdcollision(this.bird, this.pipe.pipes) // 判断小鸟是否碰到了水管或地面并加分
        // for (var i = 0; i < p.length; i++) { //加分
        //     if(this.pipe.pipes[i].x < 100 && this.pipe.pipes[i].x > 90) {
        //         this.score+=0.5 // 管子是一帧移动5个像素这里两帧(100到90)所以加到1
        //         if(this.score%1 == 0) {
        //             this.clearscore()
        //             var sco = new guaScore(this.game, this.score)
        //             this.addElement(sco)
        //         }
        //     }
        // }
        //log(this.score)
        // super.update()
        // this.skipCount --
        // var offset = -5
        // if (this.skipCount == 0) {
        //     this.skipCount = 4
        //     offset = 15
        // }
        // this.g.x += offset
        // this.Invincible()
        // if (this.death) { //如果已经死亡进入结束界面
        //     var s = new SceneEnd(this.game, this.pipe.pipes, this.bird.y, this.score)
        //     this.game.replaceScene(s)
        // }
    }

    setupInputs() {
        var self = this
        var b = this.mario
        let playerSpeed = 5
        this.game.registerAction('j', function(keystatus){
            b.jump()
        })
        this.game.registerAction('a', function(keystatus){
            b.move(-playerSpeed, keystatus)
        })
        this.game.registerAction('d', function(keystatus){
            b.move(playerSpeed, keystatus)
        })
        // this.game.registerAction('c', function(keystatus){
        //     self.boole = !self.boole
        // })
    }

}
