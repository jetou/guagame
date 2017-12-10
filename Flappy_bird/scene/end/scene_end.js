class SceneEnd extends GuaScene{
    constructor(game, pipes, birdy, score) {
        super(game)
        game.registerAction('r',function(){
            var s = SceneStart.new(game)
            game.replaceScene(s)
        })
        //背景
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        this.score = score
        //管子
        this.pipe = new Pipes(game, pipes, true)
        this.addElement(this.pipe)
        //地面
        this.g = GuaImage.new(game, 'ground')
        this.addElement(this.g)
        //鸟
        var b =  new GuaAnimation(game, 90)
        b.x = 150
        b.y = birdy
        this.bird = b
        this.addElement(b)
        //gameover
        var gameOver = GuaImage.new(game, 'gameover')
        gameOver.x = 95
        gameOver.y = 130
        this.addElement(gameOver)
        //最终分数
        var sco = new guaScore(this.game, this.score)
        this.addElement(sco)
    }
    update() {
        if(this.bird.y < 385) {
            this.bird.y += 20
        } else {
            this.bird.y = 385
        }

    }
}
